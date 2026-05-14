let playerHp = 100;
let gems = 0;
let damage = 10;
let petName = "None";

let monster = {
  name: "Slime Monster",
  hp: 50
};

function updateScreen() {
  document.getElementById("playerHp").innerText = playerHp;
  document.getElementById("gems").innerText = gems;
  document.getElementById("damage").innerText = damage;
  document.getElementById("petName").innerText = petName;

  document.getElementById("monsterName").innerText = monster.name;
  document.getElementById("monsterHp").innerText = monster.hp;
}

function attackMonster() {
  monster.hp -= damage;

  if (monster.hp <= 0) {
    let reward = Math.floor(Math.random() * 10) + 5;
    gems += reward;

    document.getElementById("message").innerText =
      "You defeated the monster and got " + reward + " gems!";

    spawnMonster();
    saveGame();
  } else {
    document.getElementById("message").innerText =
      "You attacked the monster!";
  }

  updateScreen();
}

function spawnMonster() {
  const monsters = [
    { name: "Slime Monster", hp: 50 },
    { name: "Skeleton", hp: 70 },
    { name: "Goblin", hp: 90 },
    { name: "Dark Wolf", hp: 120 }
  ];

  monster = {
    ...monsters[Math.floor(Math.random() * monsters.length)]
  };
}

function buyPet(name, cost, bonusDamage) {
  if (gems >= cost) {
    gems -= cost;
    damage += bonusDamage;
    petName = name;

    document.getElementById("message").innerText =
      "You bought the " + name + " pet!";

    saveGame();
  } else {
    document.getElementById("message").innerText =
      "Not enough gems!";
  }

  updateScreen();
}

function saveGame() {
  const gameData = {
    playerHp,
    gems,
    damage,
    petName,
    monster
  };

  localStorage.setItem("bearGameSave", JSON.stringify(gameData));
}

function loadGame() {
  const savedGame = localStorage.getItem("bearGameSave");

  if (savedGame) {
    const data = JSON.parse(savedGame);

    playerHp = data.playerHp;
    gems = data.gems;
    damage = data.damage;
    petName = data.petName;
    monster = data.monster || monster;

    document.getElementById("message").innerText =
      "Game Loaded!";
    updateScreen();
  }
}

function resetGame() {
  localStorage.removeItem("bearGameSave");

  playerHp = 100;
  gems = 0;
  damage = 10;
  petName = "None";

  spawnMonster();
  updateScreen();

  document.getElementById("message").innerText =
    "Game Reset!";
}

loadGame();
updateScreen();