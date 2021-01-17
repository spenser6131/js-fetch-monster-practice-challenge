const monsterForm = document.getElementById('create-monster');
const monsterContainer = document.getElementById('monster-container');
const back = document.getElementById('back');
const forward = document.getElementById('forward');
const urlBase = "http://localhost:3000/";
let pageNum = 1;

monsterForm.addEventListener('submit', submitMonster);
back.addEventListener('click', goBack);
forward.addEventListener('click', goForward);

fetchMonsterData();

function fetchMonsterData() {
  monsterContainer.innerHTML = "";
  fetch(urlBase + "monsters/?_limit=50&_page=" + pageNum)
    .then(resp => resp.json())
    .then(function(json) {
      json.map(populateMonsterList);  
    })
}

function populateMonsterList(monsterData) {
  let monsterCard = document.createElement('div');
  let name = monsterData.name;
  let age = monsterData.age;
  let description = monsterData.description;
  //CONTINUE BUILDING SINGLE MONSTER CARD HERE TO BE MAPPED FROM LINE 18
  let cardName = document.createElement('h2');
  let cardAge = document.createElement('h4');
  let cardBio = document.createElement('p');
  cardName.innerText = name;
  cardAge.innerText = age;
  cardBio.innerText = description;
  monsterCard.appendChild(cardName);
  monsterCard.appendChild(cardAge);
  monsterCard.appendChild(cardBio);
  monsterContainer.appendChild(monsterCard);
}

function submitMonster(event) {
  event.preventDefault();
  let name = document.getElementById("name-input").value
  let age = document.getElementById("age-input").value
  let description = document.getElementById("description-input").value
  let newMonsterData = JSON.stringify({name: name, age: parseFloat(age), description: description})
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: newMonsterData
  }
  fetch(urlBase + "monsters", configObj)
    .then(resp => resp.json())
    .then(() => fetchMonsterData())
}

function goBack() {
  if (pageNum > 1) {
    pageNum -= 1; 
    fetchMonsterData();
    console.log("page is now", pageNum)
  } else {
    pageNum = 1;
    console.log("can't go lower")
  }
}

function goForward() {
  pageNum += 1;
  fetchMonsterData();
  console.log("page is now", pageNum)
}
