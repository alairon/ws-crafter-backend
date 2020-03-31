require('dotenv').config();
const mysql = require('mysql');
const { readFile } = require('fs');
const { importCardList } = require('../files/getContents');
const jsonValidation = require('../validation/jsonValidation');

/* Gather the credentials with write permissions */
const connection = mysql.createConnection({
  host: process.env.DB_WRITE_HOST,
  user: process.env.DB_WRITE_USER,
  password: process.env.DB_WRITE_PASSWORD,
  database: process.env.DB_WRITE_DATABASE,
});

/* Escapes apostrophe characters */
/* Returns the original string if it doesn't have an apostrophe */
function sqlEscape(string){
  const apoRegex = /['']/gmi;
  return (string.replace(apoRegex, "''"));
}

/* Constructs and inserts a query into the Meta table */
function metaQuery(data){
  const sql = `INSERT INTO meta VALUES(
    '${sqlEscape(data.meta.set_id)}',
    '${sqlEscape(data.meta.set_name)}',
    ${data.meta.set_number},
    ${data.meta.set_side},
    '${sqlEscape(data.meta.series_set)}',
    ${data.meta.total_cards},
    '${data.meta.release_date}'
  )`;

  connection.query(sql, (err) => {
    if (err) {
      switch(err.code){
        case('ER_TABLEACCESS_DENIED_ERROR'):
          console.log('This account does not have permissions to write to the database');
          break;
        case('ER_DUP_ENTRY'):
          console.log(`A metadata entry for ${data.meta.set_name} (${data.meta.set_id}) already exists`);
          break;
        default:
          console.log(`You have encountered an usual error. No changes have been applied. [ERR: ${err.code}]`);
      }
    }
    else {
      console.log(`Successfully created an entry for ${data.meta.set_name} (${data.meta.set_id})`);
    }
  });

  return 0;
}

/* Constructs and inserts a query into the General table */
function generalQuery(data){
  const sql = `INSERT INTO cards_general VALUES(\
      '${sqlEscape(data.general.card_id)}',\
      '${sqlEscape(data.general.en_name)}',\
      '${sqlEscape(data.general.jp_name)}',\
      '${sqlEscape(data.general.set_id)}',\
      '${sqlEscape(data.general.card_number)}',\
      ${data.general.card_rarity},\
      ${data.general.card_type},\
      ${data.general.card_color},\
      '${sqlEscape(data.general.card_flavor)}',\
      '${sqlEscape(data.general.card_ability)}',\
      '${data.general.card_img}'\
    )`;

    connection.query(sql, (err) => {
      if (err){
        switch(err.code){
          case('ER_TABLEACCESS_DENIED_ERROR'):
            console.log('This account does not have permissions to write to the database');
            break;
          case('ER_DUP_ENTRY'):
            console.log(`An entry for ${data.general.en_name} (${data.general.card_id}) already exists`);
            break;
          case('ER_PARSE_ERROR'):
            console.log(`${data.general.card_id}: ${err.sqlMessage}`);
            break;
          case('ER_BAD_FIELD_ERROR'):
            console.log(`At least one of the fields has an invalid value. ${err.sqlMessage}`);
            break;
          default:
            console.log(`${data.general.card_id}: You have encountered an unique error. No changes have been applied. [${err.code}]`);
        }
      }
      else {
        console.log(`Successfully inserted general data for ${data.general.card_id}`);

        switch(data.general.card_type){
          case(0):
            characterQuery(data);
            break;
          case(1):
            eventQuery(data);
            break;
          case(2):
            climaxQuery(data);
            break;
          default:
            console.log('The validation tool didn\'t do its job');
        }
      }
    });
}

/* Constructs and inserts a query into the Character table */
function characterQuery(data){
  const sql = `INSERT INTO cards_character VALUES(\
    '${sqlEscape(data.character.card_id)}',\
    ${data.character.card_level},\
    ${data.character.card_cost},\
    ${data.character.card_icon},\
    ${data.character.card_power},\
    ${data.character.card_soul},\
    ${data.character.card_trigger},\
    '${sqlEscape(data.character.card_trait1)}',\
    '${sqlEscape(data.character.card_trait2)}'\
  )`;

  connection.query(sql, (err) => {
    if (err){
      switch(err.code){
        case('ER_TABLEACCESS_DENIED_ERROR'):
          console.log('This account does not have permissions to write to the database');
          break;
        case('ER_DUP_ENTRY'):
          console.log(`An entry for ${data.character.card_id} already exists`);
          break;
        case('ER_PARSE_ERROR'):
          console.log(`${data.character.card_id}: ${err.sqlMessage}`);
          break;
        default:
          console.log(`${data.character.card_id}: You have encountered an unique error. No changes have been applied. [${err.code}]`);
      }
    }
    else {
      console.log(`Successfully inserted character data for ${data.character.card_id}`);
    }
  });
}

/* Constructs and inserts a query into the Event table */
function eventQuery(data){
  const sql = `INSERT INTO cards_event VALUES(\
    '${sqlEscape(data.event.card_id)}',\
    ${data.event.card_level},\
    ${data.event.card_cost},\
    ${data.event.card_icon},\
    ${data.event.card_trigger}\
  )`;

  connection.query(sql, (err) => {
    if (err){
      switch(err.code){
        case('ER_TABLEACCESS_DENIED_ERROR'):
          console.log('This account does not have permissions to write to the database');
          break;
        case('ER_DUP_ENTRY'):
          console.log(`An entry for (${data.event.card_id}) already exists`);
          break;
        case('ER_PARSE_ERROR'):
          console.log(`${data.event.card_id}: ${err.sqlMessage}`);
          break;
        default:
          console.log(`${data.event.card_id}: You have encountered an unique error. No changes have been applied. [${err.code}]`);
      }
    }
    else {
      console.log(`Successfully inserted event data for ${data.event.card_id}`);
    }
  });
}

/* Constructs and inserts a query into the Climax table */
function climaxQuery(data){
  const sql = `INSERT INTO cards_climax VALUES(\
    '${sqlEscape(data.climax.card_id)}',\
    ${data.climax.card_trigger}\
  )`;

  connection.query(sql, (err) => {
    if (err){
      switch(err.code){
        case('ER_TABLEACCESS_DENIED_ERROR'):
          console.log('This account does not have permissions to write to the database');
          break;
        case('ER_DUP_ENTRY'):
          console.log(`An entry for ${data.climax.en_name} (${data.climax.card_id}) already exists`);
          break;
        case('ER_PARSE_ERROR'):
          console.log(`${data.climax.card_id}: ${err.sqlMessage}`);
          break;
        default:
          console.log(`${data.climax.card_id}: You have encountered an unique error. No changes have been applied. [${err.code}]`);
      }
    }
    else {
      console.log(`Successfully inserted climax data for ${data.climax.card_id}`);
    }
  });
}

/* Entry point for inserting data */
function insert(rootDir){
  const fileList = importCardList(rootDir);
  let dir = rootDir;

  connection.beginTransaction((err) => {
    if (err) throw err;

    for (let i in fileList){
      //File being read is meta.json
      if (fileList[i] == 'meta.json'){
        dir = rootDir + '/';
        readFile((dir + fileList[i]), 'utf8', (err, contents) => {
          if (err) throw err.code;
        const meta = JSON.parse(contents);
        
        jsonValidation.metaValidation(meta)
        metaQuery(meta);
      });
      //Anything else that isn't meta.json
      } else {
        dir = rootDir + '/cards/';
        readFile((dir + fileList[i]), 'utf8', (err, contents) => {
          if (err) throw err.code;
          const data = JSON.parse(contents);
          jsonValidation.cardValidation(data);
          generalQuery(data);
        });
      }
    }
    connection.commit((err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
    });
  });
  return;
}

exports.insert = insert;