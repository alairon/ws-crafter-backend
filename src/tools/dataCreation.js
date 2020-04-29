/* eslint no-unused-vars: 0 */

function postData(data){
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://localhost:4176/api/cards');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
      console.log(`[Operation Complete] ${xhr.responseText}`);
      // Clear most of the form for the next entry
      clearCard();
    }
  };
}

function extractCardNo(cardID){
  const numRegex = /([a-z]{0,2}\d{1,4}[a-z]{0,2})$/gmi;
  const match = cardID.match(numRegex);

  if (match === null) document.getElementById('cardNumber').value = '';
  document.getElementById('cardNumber').value = match;
}

function saveData(){
  let data = [];
  data.push({"meta": {
    "set_id": document.getElementById('setID').value,
    "set_name": document.getElementById('setName').value,
    "set_number": parseInt(document.getElementById('setNumber').value),
    "set_side": document.getElementById('setSide').value,
    "set_type": parseInt(document.getElementById('setType').value),
    "series_name": document.getElementById('seriesName').value,
    "total_cards": parseInt(document.getElementById('totalCards').value),
    "release_date": document.getElementById('releaseDate').value
  },
  "general": {
    "card_id": document.getElementById('cardID').value,
    "en_name": document.getElementById('enName').value,
    "jp_name": document.getElementById('jpName').value,
    "set_id": document.getElementById('setID').value,
    "card_number": document.getElementById('cardNumber').value,
    "card_rarity": parseInt(document.getElementById('cardRarity').value),
    "card_type": parseInt(document.getElementById('cardType').value),
    "card_color": parseInt(document.getElementById('cardColor').value),
    "card_flavor": document.getElementById('flavorText').value,
    "card_ability": document.getElementById('abilityText').value,
    "card_img": null
  },
  "character": {
    "card_id": document.getElementById('cardID').value,
    "card_level": parseInt(document.getElementById('charLevel').value),
    "card_cost": parseInt(document.getElementById('charCost').value),
    "card_icon": parseInt(document.getElementById('charIcon').value),
    "card_power": parseInt(document.getElementById('charPower').value),
    "card_soul": parseInt(document.getElementById('charSoul').value),
    "card_trigger": parseInt(document.getElementById('charTrigger').value),
    "card_trait1": document.getElementById('trait1').value,
    "card_trait2": document.getElementById('trait2').value,
    "card_trait3": document.getElementById('trait3').value
  },
  "event": {
    "card_id": document.getElementById('cardID').value,
    "card_level": parseInt(document.getElementById('eventLevel').value),
    "card_cost": parseInt(document.getElementById('eventCost').value),
    "card_icon": parseInt(document.getElementById('eventIcon').value),
    "card_trigger": parseInt(document.getElementById('eventTrigger').value)
  },
  "climax": {
    "card_id": document.getElementById('cardID').value,
    "card_trigger": parseInt(document.getElementById('cxTrigger').value)
  }});

  // Create a POST request to the API with this
  postData(data);
}

/* Clears the fields necessary for the next card with minimal re-entry of data */
function clearCard(){
  const clearString = ['enName', 'jpName', 'cardType', 'cardRarity', 'cardColor', 'flavorText', 'abilityText', 'charPower', 'trait1', 'trait2', 'trait3'];
  const clearNum = ['charLevel', 'charCost', 'charIcon', 'charSoul', 'eventLevel', 'eventCost', 'eventIcon', ];
  const clearTrigger = ['charTrigger', 'eventTrigger', 'cxTrigger'];

  for (let e in clearString) { document.getElementById(`${clearString[e]}`).value = ''}
  for (let e in clearNum) { document.getElementById(`${clearNum[e]}`).value = 0}
  for (let e in clearTrigger) { document.getElementById(`${clearTrigger[e]}`).value = 'null' }

  typeChange();
}

/* Shows specific sections of the form depending on what the user selected as the card type */
function typeChange(){
  let selectedBox = document.getElementById('cardType');
  let selected = selectedBox.value;
  let char = document.getElementById('character');
  let event = document.getElementById('event');
  let cx = document.getElementById('climax');

  if(selected === '0'){
    char.hidden = false;
    event.hidden = true;
    cx.hidden = true;
  }
  else if (selected === '1'){
    char.hidden = true;
    event.hidden = false;
    cx.hidden = true;
  }
  else if (selected === '2'){
    char.hidden = true;
    event.hidden = true;
    cx.hidden = false;
  }
  else {
    char.hidden = true;
    event.hidden = true;
    cx.hidden = true;
  }
}
