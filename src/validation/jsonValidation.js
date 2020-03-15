const { isEmpty, isString, isNumber } = require('./dataValidation');

function metaExistCheck(metaJSON) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(metaJSON)) return 1;

  // Check for empty/null values in db rows marked as "not null"
  if (isEmpty(metaJSON.set_id)) errorArray.push ({"Error": "Missing set ID"});
  if (isEmpty(metaJSON.set_name)) errorArray.push ({"Error": "Missing set name"});
  if (isEmpty(metaJSON.total_cards)) errorArray.push ({"Error": "Missing total number of cards"});
  if (isEmpty(metaJSON.release_date)) errorArray.push ({"Error": "Missing release date"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return 2;
  return 0;
}

function metaValueCheck(metaJSON) {
  const errorArray = [];

  // If the JSON isn't valid, stop processing.
  if (metaExistCheck(metaJSON) == 1) return 1;

  if (!isString(metaJSON.set_id)) errorArray.push ({"Error": "Set ID requires a string"});
  if (!isString(metaJSON.set_name)) errorArray.push ({"Error": "Set Name requires a string"});
  if (!isString(metaJSON.series_set)) errorArray.push({"Error": "Missing series set name"});
  if (!isNumber(metaJSON.total_cards)) errorArray.push ({"Error": "Total number of Cards requires an integer"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return 2;
  return 0;
}

// Simple check for general shared rows
function generalCheck(json) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(json)) return 1;
  
  // Check for empty/null values in db rows marked as "not null"
  if (isEmpty(json.card_type)) errorArray.push ({"Error": "Missing card type data"});
  if (isEmpty(json.card_id)) errorArray.push({"Error": "Missing card ID"});
  if (isEmpty(json.en_name)) errorArray.push({"Error": "Missing English card name"});
  if (isEmpty(json.set_id)) errorArray.push({"Error": "Missing set ID"});
  if (isEmpty(json.set_name)) errorArray.push({"Error": "Missing set name"});
  if (isEmpty(json.total_cards)) errorArray.push({"Error": "Missing total number of cards"});
  if (isEmpty(json.release_date)) errorArray.push({"Error": "Missing release date"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return 2;
  return 0;
}

// Simple check for characters
function characterCheck(json) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(json)) return 1;
  
  // Check for empty/null values in db rows marked as "not null"
  if (!isString(json.card_id)) errorArray.push({"Error": "Missing card ID"});
  if (isEmpty(json.card_level)) errorArray.push({"Error": "Missing card's level"});
  if (isEmpty(json.card_cost)) errorArray.push({"Error": "Missing card's cost"});
  if (isEmpty(json.card_power)) errorArray.push({"Error": "Missing card's power"});
  if (isEmpty(json.card_soul)) errorArray.push({"Error": "Missing card's soul count"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return 2;
  return 0;
}

// Simple check for event cards
function eventCheck(json) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(json)) return 1;
  
  // Check for empty/null values in db rows marked as "not null"
  if (!isString(json.card_id)) errorArray.push({"Error": "Missing card ID"});
  if (!isNumber(json.card_level)) errorArray.push({"Error": "Missing card's level"});
  if (!isNumber(json.card_cost)) errorArray.push({"Error": "Missing card's cost"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return 2;
  return 0;
}

function climaxCheck(json) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(json)) return 1;
  
  // Check for empty/null values in db rows marked as "not null"
  if (isEmpty(json.card_id)) errorArray.push({"Error": "Missing card ID"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return 2;
  return 0;
}

function cardValidation(cardData) {
  generalCheck(cardData.general);
  console.log(`Checking the validity of ${cardData.general.en_name} (${cardData.general.card_id})`)

  const cardType = cardData.general.card_type;
  console.log(`Determined ${cardData.general.card_id} as a(n) ${cardType} card`);

  switch(cardType){
    case 'character':
      console.log(characterCheck(cardData.character));
      break;
    case 'event':
      console.log(eventCheck(cardData.event));
      break;
    case 'climax':
      console.log(climaxCheck(cardData.climax));
      break;
    default:
      console.log("This isn't a valid card");
  }

  return 0;
}

exports.metaCheck = metaExistCheck;
exports.metaValues = metaValueCheck;
exports.cardValidation = cardValidation;