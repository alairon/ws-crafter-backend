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

/* Gets the list of files in a directory */
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

/* Gets the meta.json file */
function getMeta (rootDir){
  let fileList;
  // Regex to find 'meta.json' exactly
  const metaRegex = /^meta\.json$/mi;

  try {
    fileList = readdirSync(rootDir, 'utf8');
  } catch (err) {
    fileList = null;
  }

  // Return null if the list was empty
  if (fileList == null) return null;

  // Return the meta.json file
  for (let i = 0; i < fileList.length; i++) {
    if (metaRegex.test(fileList[i])) {
      return fileList.splice(i, 1);
    }
  }
  
  // If the file wasn't found
  return null;
}

/* Gets the file location of meta.json */
function importMeta (rootDir) {
  const dir = rootDir + '/';
  const errorArray = [];

  console.log (`Importing metadata from: ${resolve(dir)}`);
  const meta = getMeta(dir);

  // Add error code 10 (meta.json not found) if the file couldn't be found
  if (isEmpty(meta)) {
    console.log('meta.json could not be found in this directory.')
    errorArray.push(10);
  }

  if (errorArray.length > 0) {
    return errorArray;
  }

  // Return the array containing the location of meta.json
  return meta;
}

/* Gets the file location of card data */
function importCardList (rootDir) {
  const dir = rootDir + "/cards";
  const errorArray = [];
  let list;

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

  // Return the array of file names
  return (list);
}

exports.importMeta = importMeta;
exports.importCardList = importCardList;