const { readdirSync } = require('fs');
const { resolve } = require('path');
const { isEmpty } = require('../validation/dataValidation');

/* Finds files with the .json extension*/
function parseList (fileList){
  // Regex that searches for .json -- case insensitive
  const jsonRegex = /(\.json)$/mi;
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

function getMeta (rootDir){
  let fileList;
  const metaRegex = /^meta\.json$/mi;

  try {
    fileList = readdirSync(rootDir, 'utf8');
  } catch (err) {
    fileList = null;
  }

  for (let i = 0; i < fileList.length; i++) {
    if (metaRegex.test(fileList[i])) {
      return fileList.splice(i, 1);
    }
  }

  return null;
}

function importCardList (rootDir) {
  const dir = rootDir + "/cards";
  const errorArray = [];
  let meta, list;
  let completeList;

  console.log (`Importing metadata from: ${resolve(rootDir)}`);
  meta = getMeta(rootDir);

  // Add error code 10 (meta.json not found) if the file couldn't be found
  if (isEmpty(meta)) {
    console.log('meta.json could not be found in this directory.')
    errorArray.push(10);
  }

  console.log (`Importing list from: ${resolve(dir)}`);
  list = getFiles(dir);
  
  // Add error code 11 (No JSON files) if there weren't any found under %rootDir%/cards/
  if (isEmpty(list)) {
    errorArray.push(11);
  }

  // Return an array of error codes if the program couldn't find the required files
  if (errorArray.length > 0) {
    return errorArray;
  }

  // Merge the two lists together, then return the array of file names
  completeList = meta.concat(list);
  return (completeList);
}

exports.importCardList = importCardList;