onload = init;

//Elements
let $game;
let $characters;

let $charSelection;
let $menu;
let $weaponSelection;
let $gameResult;

//Char selection config
const baseDelay = 150;
const waitDelay = 100;
const animSpeed = "fast"; //fast - slow

const characters = [
    {
        name: "Stan",
        id: 1,
        img: "imgs/southpark.webp"
    },
    {
        name: "Kenny",
        id: 2,
        img: "imgs/southpark1.webp"
    },
    {
        name: "Eric",
        id: 3,
        img: "imgs/southpark3.webp"
    },
];
const botPlayer = {
    name: "Computer guy",
    id: 999999,
    img: "imgs/computer.gif"
};

let challengeChance = .5;

//Weapons
const weapons = [
    new Weapon("?????", "imgs/hidden.png", true),
    new Weapon("Rock", "imgs/rock.png"),
    new Weapon("Paper", "imgs/paper.png"),
    new Weapon("Scissors", "imgs/scissors.png"),
];

const hiddenWeapon = weapons[0];

let player = undefined;
let computer = undefined;

function registerWeapons() {
    //Hidden weapon is vulnerable to any weapon, even itself
    for (let weapon of weapons) {
        hiddenWeapon.addWeakness(weapon);
    }

    weapons[1].addWeakness(weapons[2]);
    weapons[2].addWeakness(weapons[3]);
    weapons[3].addWeakness(weapons[1]);
}

function init() {
    registerWeapons();

    $game = $("#game");
    $characters = $("#character-selection");

    $charSelection = $("#character-selection #selection");
    $menu = $("#menu");
    $gameResult = $("#game-result");
    $weaponSelection = $("#weapon-selection");

    player = new Player(undefined, $("#player-portrait"), $("#player-weapon"));
    computer = new Player(botPlayer, $("#computer-portrait"), $("#computer-weapon"));

    player.selectedWeapon = hiddenWeapon;
    computer.selectedWeapon = hiddenWeapon;

    drawCharacterSelection();
}

function hideCharsExcept(id) {
    for (let char of characters) {
        if (id !== undefined && char.id === id) {
            continue;
        }

        $(`#char-${char.id}-avatar`).hide(animSpeed);
        $(`#char-${char.id}-name`).hide(animSpeed);
    }
}

function drawCharacterSelection() {
    $charSelection.empty();

    let index = 0;
    for (let char of characters) {
        let html = `<div class="col" id="char-${char.id}">
                        <img class="text-center" style="display: none" src="${char.img}" id="char-${char.id}-avatar" height="256">
                        <h1 id="char-${char.id}-name" style="display: none">${char.name}</h1>
                    </div>`;

        $charSelection.append(html);

        $(`#char-${char.id}`).click(() => {
            $menu.show(animSpeed);
            selectChar(char);
        });

        setTimeout(() => {
            $(`#char-${char.id}-avatar`).show(animSpeed);
            $(`#char-${char.id}-name`).show(animSpeed);

        }, baseDelay + (waitDelay * index++));
    }
}

function drawWeapons() {
    const $weapons = $("#weapons");

    $weapons.empty();

    for (let weapon of weapons) {
        if (weapon.isHidden) {
            continue;
        }

        const html = `
            <div class="col" id="weapon-${weapon.id}">
                <img class="weapon-avatar" src="${weapon.avatar}">
                <p class="weapon-name">${weapon.name}</p>
            </div>`;

        $weapons.append(html);

        $(`#weapon-${weapon.id}`).click(() => {
            selectPlayerWeapon(weapon);
        });
    }
}

function selectDifficulty() {
    $characters.hide(animSpeed);
    $("#difficulty-selection").show(animSpeed);
}

function setDificculty(value) {
    challengeChance = value;
    $("#difficulty-selection").hide(animSpeed);

    start();
}

function selectChar(char) {
    player.character = char;

    hideCharsExcept(char.id);
}

function reChoose() {
    $menu.hide(animSpeed);

    hideCharsExcept(undefined);

    setTimeout(() => drawCharacterSelection(), 150);
}

function start() {
    $game.show(animSpeed);

    drawWeapons();
}

function seletectComputerWeapon() {
    let available = [];

    for (let weapon of weapons) {
        if (weapon.isHidden) {
            continue;
        }

        available.push(weapon);
    }

    let index = Math.floor(Math.random() * available.length);

    return available[index];
}

function selectPlayerWeapon(weapon) {
    player.selectedWeapon = weapon;
    computer.selectedWeapon = seletectComputerWeapon();

    doMatch();
}

/*
* =======[RULES]=======
* 1. A "dice" (a random value ranging from 0 to almost 1) will be thrown to decide if the player will be "challenged" or not.
* 2. If NOT challenged, then the BOT wins
* 3. If challenged, then the rock, paper, scissors rules are applied
* */
function doMatch() {
    $weaponSelection.hide(animSpeed);
    $gameResult.show(animSpeed);

    let challenged = Math.random() <= challengeChance;

    if (challenged) {
        let playerWeak = player.selectedWeapon.isWeak(computer.selectedWeapon);
        let computerWeak = computer.selectedWeapon.isWeak(player.selectedWeapon);

        if (playerWeak && computerWeak) { //Draw
            resultText("Draw!");
        } else if (playerWeak) { //Computer wins
            resultText(`${computer.name}(bot) won!`);
            computer.wins++;
        } else { //Player wins
            resultText(`${player.name}(you) won!`);
            player.wins++;
        }
    } else {
        resultText(`${computer.name}(bot) won!`);
        computer.wins++;
    }
}

function resultText(text) {
    $("#result-text").html(text);
}

function rematch() {
    $weaponSelection.show(animSpeed);
    $gameResult.hide(animSpeed);

    computer.selectedWeapon = hiddenWeapon;
    player.selectedWeapon = hiddenWeapon;
}