/* eslint-disable */

function saveData(){
  let jsonData = [];
  chain.push({"Meta": {
    "set_id": document.getElementById('setID'),
    "set_name": document.getElementById('setName'),
    "set_number": document.getElementById('setNumber')
  }},
  {"General": {
    "card_id": document.getElementById('cardID')
  }});

  // Create a POST request to the API with this
  console.log(chain[0]);

  //Request a packet showing the areas with an error, highlight them to the user
}

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
  else{
    char.hidden = true;
    event.hidden = true;
    cx.hidden = true;
  }
}