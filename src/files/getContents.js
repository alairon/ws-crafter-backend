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

  // Return the meta.json file
  for (let i = 0; i < fileList.length; i++) {
    if (metaRegex.test(fileList[i])) {
      return fileList.splice(i, 1);
    }
  }
  
  // If the file wasn't found
  return null;
}

/* Gets the file location of meta.json and the asssociated card data */
function importCardList (rootDir) {
  const dir = rootDir + "/cards";
  const errorArray = [];
  let meta, list;

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
  return (meta.concat(list));
}

exports.importCardList = importCardList;