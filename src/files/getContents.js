const { readdirSync } = require('fs');
const { resolve } = require('path');
const { isEmpty } = require('../dataValidation');

function parseList (fileList){
  const jsonRegex = /(\.json)$/gmi;
  for (let i = fileList.length-1; i >= 0; i--){
    if (!(jsonRegex.test(fileList[i]))){
      fileList.splice(i, 1);
    }
  }
  return fileList;
}

function getFiles (dir) {
  let fileList, parsedList;
  try {
    fileList = readdirSync(dir, 'utf8');
  } catch (err) {
    fileList = null;
  }
  
  if (!(isEmpty(fileList))){
    parsedList = parseList(fileList);
  }

  return (parsedList);
} 

function importCardList (dir) {
  console.log (`Importing list from: ${resolve(dir)}`);
  let list = getFiles(dir);


  if (isEmpty(list)) {
    console.log('')
  }
  return (list);
}

exports.importCardList = importCardList;