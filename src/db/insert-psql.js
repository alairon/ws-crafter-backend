require('dotenv').config();
const { Pool } = require('pg');
const { readFile } = require('fs');
const { importMeta, importCardList } = require('../files/getContents');
const util = require('util');
const jsonValidation = require('../validation/jsonValidation');

const readFileAsync = util.promisify(readFile);

/* Gather the credentials with write permissions */
const connection = new Pool({
  host: process.env.DB_WRITE_HOST,
  user: process.env.DB_WRITE_USER,
  password: process.env.DB_WRITE_PASSWORD,
  database: process.env.DB_WRITE_DATABASE,
});

/* Escapes apostrophe characters */
/* Returns the original string if it doesn't have an apostrophe */
function sqlEscape(string){
  if (string === undefined) return;
  const apoRegex = /['']/gmi;
  return (string.replace(apoRegex, "''"));
}

/* A function that displays psql error codes */
function sqlError(err, key){
  switch (err.code){
    case('08P01'):
      console.error(`Protocol Violation at ${key}: ${err.message}`);
      break;
    case('22P02'):
      // Invalid data type
      console.error(`Invalid data type while processing '${key}'\n\t${err.message}`)
      break;
    case('23505'):
      // An entry already exists
      // Normally this isn't an error worth worrying about.
      console.error(`There is already an entry at ${key}`);
      break;
    case('25P01'):
      // Transaction-specific operation occured outside of a transaction
      console.log('A transaction-specific operation occured outside of a transaction');
      break;
    default:
      console.error(`[${err.code}] Error at ${err.table}: ${err.message}`);
  }
}

/* Constructs a query for the Character table */
function characterQuery(meta, data){
  const sqlQuery = 'INSERT INTO characters VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)';
  const sqlParams = [  
    `${sqlEscape(meta.meta.set_id)}`,
    `${sqlEscape(meta.meta.set_name)}`,
    meta.meta.set_number,
    meta.set_side,
    meta.set_type,
    `${sqlEscape(meta.meta.series_name)}`,
    meta.meta.total_cards,
    meta.meta.release_date,
    `${sqlEscape(data.general.card_id)}`,
    `${sqlEscape(data.general.en_name)}`,
    `${sqlEscape(data.general.jp_name)}`,
    `${sqlEscape(data.general.card_number)}`,
    data.general.card_rarity,
    data.general.card_type,
    data.general.card_color,
    `${sqlEscape(data.general.card_flavor)}`,
    `${sqlEscape(data.general.card_ability)}`,
    data.general.card_img,
    data.character.card_level,
    data.character.card_cost,
    data.character.card_icon,
    data.character.card_power,
    data.character.card_soul,
    data.character.card_trigger,
    `${sqlEscape(data.character.card_trait1)}`,
    `${sqlEscape(data.character.card_trait2)}`,
    `${sqlEscape(data.character.card_trait3)}`
  ];

  return [sqlQuery, sqlParams];
}

/* Constructs a query for the Event table */
function eventQuery(meta, data){
  const sqlQuery = 'INSERT INTO events VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)';
  const sqlParams = [
    `${sqlEscape(meta.meta.set_id)}`,
    `${sqlEscape(meta.meta.set_name)}`,
    meta.meta.set_number,
    meta.set_side,
    meta.set_type,
    `${sqlEscape(meta.meta.series_name)}`,
    meta.meta.total_cards,
    meta.meta.release_date,
    `${sqlEscape(data.general.card_id)}`,
    `${sqlEscape(data.general.en_name)}`,
    `${sqlEscape(data.general.jp_name)}`,
    `${sqlEscape(data.general.card_number)}`,
    data.general.card_rarity,
    data.general.card_type,
    data.general.card_color,
    `${sqlEscape(data.general.card_flavor)}`,
    `${sqlEscape(data.general.card_ability)}`,
    data.general.card_img,
    data.event.card_level,
    data.event.card_cost
  ];

  return [sqlQuery, sqlParams];
}

/* Constructs a query for the Climax table */
function climaxQuery(meta, data){
  const sqlQuery = 'INSERT INTO climaxes VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)';
  const sqlParams = [
    `${sqlEscape(meta.meta.set_id)}`,
    `${sqlEscape(meta.meta.set_name)}`,
    meta.meta.set_number,
    meta.meta.set_side,
    meta.meta.set_type,
    `${sqlEscape(meta.meta.series_name)}`,
    meta.meta.total_cards,
    meta.meta.release_date,
    `${sqlEscape(data.general.card_id)}`,
    `${sqlEscape(data.general.en_name)}`,
    `${sqlEscape(data.general.jp_name)}`,
    `${sqlEscape(data.general.card_number)}`,
    data.general.card_rarity,
    data.general.card_type,
    data.general.card_color,
    `${sqlEscape(data.general.card_flavor)}`,
    `${sqlEscape(data.general.card_ability)}`,
    data.general.card_img,
    data.climax.card_trigger
  ];

  return [sqlQuery, sqlParams];
}

/* Entry point - Enhanced version */
async function insert(rootDir){
  const metaList = importMeta(rootDir);
  const fileList = importCardList(rootDir);

  if (metaList[0] == 10 || fileList[0] == 11){
    console.log('There were issues with the folder structure.');
    console.log('No actions have been performed.');
    return;
  }
  
  // Create a persistent meta file
  const fileContents = await readFileAsync((rootDir + '/' + metaList), 'utf8');
  const meta = JSON.parse(fileContents);

  // Go through the list of cards in the directory
  const dir = rootDir + '/cards/';
  let sql;

  // Connect to the server
  const client = await connection.connect();

  // Start the process of inserting data
  try {
    await client.query('BEGIN');

    // Go through the files from fileList
    for (let i in fileList){
      let contents = await readFileAsync((dir + fileList[i]), 'utf8');
      const data = JSON.parse(contents);
      const returnCode = jsonValidation.cardValidation(data);

      // Insert the data based on the card type IF there were no errors
      if (returnCode == 0){
        switch(data.general.card_type){
          // Character Query
          case(0):
            sql = characterQuery(meta, data);
            break;
          // Event Query
          case(1):
            sql = eventQuery(meta, data);
            break;
          // Climax Query
          case(2):
            sql = climaxQuery(meta, data);
            break;
          // Safety net if the check failed to catch an invalid card type
          default:
            console.log(`${data.general.card_id} has an unexpected card type.`);
        }

        //Perform the actual query
        try {
          // Create a savepoint, then attempt to execute the query
          await client.query('SAVEPOINT insert_savepoint');
          await client.query(sql[0], sql[1]);
        } catch (err) {
          // Rollback to before query happened.
          await client.query('ROLLBACK TO insert_savepoint');
          sqlError(err, data.general.card_id);
        } finally {
          // Remove the savepoint since the query successfully went through
          await client.query('RELEASE SAVEPOINT insert_savepoint');
        }
      }
    }
  } catch (err) {
    // If there was an error in the transaction, rollback everything
    await client.query('ROLLBACK');
    throw sqlError(err);
  } finally {
    // Commit the transaction
    await client.query('COMMIT');
    console.log('Database transaction complete.');
    client.release();
  }
}

exports.insert = insert;