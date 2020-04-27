const { isEmpty, isString, isTinyInt, isSmallInt } = require('./dataValidation');

/* Checks the contents marked as "NOT NULL" in Meta based on the DB spec */
function metaCheck(metaJSON) {
  const errorArray = [];

  // If the JSON isn't valid, stop processing.
  if (isEmpty(metaJSON)) {
    errorArray.push({"Error": "This isn't a valid meta JSON file"});
    return errorArray;
  }

  // Check validity of data with columns marked as NN in the DB spec.
  if (!isString(metaJSON.set_id)) errorArray.push ({"Error": "Set ID requires a string"});
  if (!isString(metaJSON.set_name)) errorArray.push ({"Error": "Set Name requires a string"});
  if (!isString(metaJSON.series_name)) errorArray.push({"Error": "Missing series set name"});
  if (!isSmallInt(metaJSON.total_cards)) errorArray.push ({"Error": "Total number of Cards requires an integer"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return errorArray;
  return 0;
}

/* Checks the contents marked as "NOT NULL" in General based on the DB spec */
function generalCheck(json) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(json)){
    errorArray.push({"Error": "This isn't a valid JSON file"});
    return errorArray;
  }

  // Check validity of data with columns marked as NN in the DB spec.
  if (!isString(json.card_id)) errorArray.push({"Error": "Missing card ID"});
  if (!isString(json.en_name)) errorArray.push({"Error": "Missing English card name"});
  if (!isString(json.set_id)) errorArray.push({"Error": "Missing set ID"});
  if (!isString(json.card_number)) errorArray.push({"Error": "Missing card number"});
  if (!isSmallInt(json.card_rarity)) errorArray.push({"Error": "Missing card rarity"});
  if (!isTinyInt(json.card_type)) errorArray.push({"Error": "Missing card type"});
  if (!isTinyInt(json.card_color)) errorArray.push({"Error": "Missing card color"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return errorArray;
  return 0;
}

// Simple check for characters
function characterCheck(json) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(json)){
    errorArray.push({"Error": "This doesn't contain valid data for a character card"});
    return errorArray;
  }
  
  // Check validity of data with columns marked as NN in the DB spec.
  if (!isString(json.card_id)) errorArray.push({"Error": "Missing card ID"});
  if (!isTinyInt(json.card_level)) errorArray.push({"Error": "Missing card's level"});
  if (!isTinyInt(json.card_cost)) errorArray.push({"Error": "Missing card's cost"});
  if (!isTinyInt(json.card_icon)) errorArray.push({"Error": "Missing card's icon"})
  if (!isSmallInt(json.card_power)) errorArray.push({"Error": "Missing card's power"});
  if (!isTinyInt(json.card_soul)) errorArray.push({"Error": "Missing card's soul count"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return errorArray;
  return 0;
}

// Simple check for event cards
function eventCheck(json) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(json)){
    errorArray.push({"Error": "This doesn't contain valid data for an event card"});
    return errorArray;
  }
  
  // Check validity of data with columns marked as NN in the DB spec.
  if (!isString(json.card_id)) errorArray.push({"Error": "Missing card ID"});
  if (!isTinyInt(json.card_level)) errorArray.push({"Error": "Missing card's level"});
  if (!isTinyInt(json.card_cost)) errorArray.push({"Error": "Missing card's cost"});
  if (!isTinyInt(json.card_icon)) errorArray.push({"Error": "Missing card's icon"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return errorArray;
  return 0;
}

function climaxCheck(json) {
  const errorArray = [];

  // Fatal errors. Do not continue if any of these requirements fail.
  if (isEmpty(json)){
    errorArray.push({"Error": "This doesn't contain valid data for a climax card"});
    return errorArray;
  }
  
  // Check validity of data with columns marked as NN in the DB spec.
  if (!isString(json.card_id)) errorArray.push({"Error": "Missing card ID"});

  // Return the array of errors, if any. Return 0 otherwise.
  if (errorArray.length !== 0) return errorArray;
  return 0;
}

function cardValidation(cardData) {
  let generalRes, typeRes = [];
  
  if (isEmpty(cardData)) return [{"Error": "Empty data"}];
  
  generalRes = generalCheck(cardData.general);
  // console.log(`Analyzing: ${cardData.general.en_name} (${cardData.general.card_id})`)
  const cardType = cardData.general.card_type;
  
  switch(cardType){
    case 0:
      typeRes = characterCheck(cardData.character);
      break;
    case 1:
      typeRes = eventCheck(cardData.event);
      break;
    case 2:
      typeRes = climaxCheck(cardData.climax);
      break;
    default:
      // This line shouldn't trigger at all.
      console.log("This isn't a valid card");
  }

  /* Determine what to return to the caller */
  if (generalRes !== 0 && typeRes !== 0){
    // Return both arrays from the general and type checks
    return (generalRes.concat(typeRes));
  }
  else if (generalRes != 0 && typeRes === 0){
    // Return only the result from the general check
    return (generalRes);
  }
  else if (generalRes === 0 && typeRes !== 0){
    // Return only the result from the type check
    return (typeRes);
  }
  // Return an empty array
  else return 0;
}

exports.metaValidation = metaCheck;
exports.cardValidation = cardValidation;