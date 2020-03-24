const { mkdirSync, existsSync, writeFile } = require('fs');
const path = require('path');
const validate = require('../validation/jsonValidation');
const dataLocation = path.join(__dirname, '/../../data');

function createDirectory(code){
  const dir = path.join(dataLocation, code);
  const cardDir = path.join(dir, 'cards');
  const imgDir = path.join(dir, 'img');

  // If the dataLocation folder doesn't exist, attempt to create one
  if (!(existsSync(dataLocation))) {
    mkdirSync(dataLocation, true, (err) => {
      if (err) return;
    });
  }

  // Attempt to create the folder and internal folders if they don't exist
  if (!(existsSync(dir))) mkdirSync(dir, true);
  if (!(existsSync(cardDir))) mkdirSync(cardDir);
  if (!(existsSync(imgDir))) mkdirSync(imgDir);
  return;
}

function generateMeta(data){
  const metaJSON = {};
  metaJSON['meta'] = data.meta;
  return metaJSON;
}

function generateCard(data){
  const cardJSON = {};

  cardJSON['general'] = data.general;
  switch(data.general.card_type){
    case(0):
      cardJSON['character'] = data.character;
      break;
    case(1):
      cardJSON['event'] = data.event;
      break;
    case(2):
      cardJSON['climax'] = data.climax;
      break;
    default:
      console.log('Something got through the checks');
  }

  return cardJSON;
}

function write(data){
  // Replace symbols with an undescore
  const symbolRegex = /[-/]/gmi;
  const cardFileName = (data.general.card_id).replace(symbolRegex, '_') + '.json';

  const metaObject = generateMeta(data);
  const cardObject = generateCard(data);


  writeFile(path.join(dataLocation, data.meta.set_id, 'meta.json'), JSON.stringify(metaObject, null, 2), {'flag': 'wx'}, (err) => {
    if (err) console.error (`[WRITE ERROR]: ${err.code}`)
  });
  writeFile(path.join(dataLocation, data.meta.set_id, 'cards', cardFileName), JSON.stringify(cardObject, null, 2), {'flag': 'wx'}, (err) => {
    if (err) console.error (`[WRITE ERROR]: ${err.code}`)
    console.log('File created');
  });
  return;
}

function createFile(data){
  // Validate the contents
  validate.metaValidation(data.meta);
  validate.cardValidation(data);

  // Create the necessary directories
  createDirectory(data.meta.set_id);
  // Convert the data into a JSON file within the directory
  write(data);

  return 0;
}

exports.createFile = createFile;