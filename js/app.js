const $clearLogButton = $('#clearlog');
const $update = $('#updates'); 
const $upperLeftButton = $('#upperleft-button');
const $upperRightButton = $('#upperright-button');
const $lowerLeftButton = $('#lowerleft-button');
const $lowerRightButton = $('#lowerright-button');
const $commandDescription = $('#commandDescription');
let magicToggle = false;

$($upperLeftButton).on('click', () => {
	console.log('player attacks');
	player.attack();
})

$($upperRightButton).on('click', () => {
	console.log('magic');
	if(magicToggle === false){
		console.log('open spell selection');
		magicToggle = true;
		$upperLeftButton.text('Fire');
		$upperRightButton.text('Return');
		$lowerLeftButton.text('Ice');
		$lowerRightButton.text('Lightning');
	}
})

$($upperRightButton).on('dblclick', () => {
	console.log('magic');
	if(magicToggle === true){
		console.log('switch to full command list');
		magicToggle = false;
		$upperLeftButton.text('Attack');
		$upperRightButton.text('Magic');
		$lowerLeftButton.text('Item');
		$lowerRightButton.text('Escape');
	}
})

$($upperLeftButton).hover(function(){
	console.log('attackhover');
	$($commandDescription).text('Attack the enemy');
	}, function(){
		$($commandDescription).text('-');
  }
);

$($upperRightButton).hover(function(){
	console.log('magichover');
	if(magicToggle === false){
		$($commandDescription).text('Choose a spell to cast');
	}
	if(magicToggle === true){
		$($commandDescription).text('Double click to return to main command screen');
	}
		}, function(){
			$($commandDescription).text('-');
		}
);

  $($lowerLeftButton).hover(function(){
	console.log('itemhover');
	$($commandDescription).text('Use an item');
	}, function(){
		$($commandDescription).text('-');
  });

  $($lowerRightButton).hover(function(){
	console.log('escapehover');
	$($commandDescription).text('Run from battle');
	}, function(){
		$($commandDescription).text('-');
  });

class enemies{
	constructor(name, HP, attack, defense){
		this.name = name;
		this.health = HP;
		this.attack = attack;
		this.defense = defense;
		this.weakness = [];
		this.attacks = [];
	}
	attack(){
		$($update).prepend(`<p>The enemy attacks you!</p>`);
	}
}

class potion{
	constructor(name, health, mana){
		this.name = name;
		this.health = health;
		this.mana = mana; 
	}
}

const player = {
	maxHP: 20,
	maxMP: 8,
	currentHP: 20,
	currentMP: 8,
	level: 1,
	strength: 3,
	defense: 3,
	currentEXP: 0,
	levelUpEXP: 5,
	playerTurn(){
		$($update).prepend('<p>You attack the enemy!</p>');
	},
	levelUp(){
		$($update).prepend('<p>You have leveled up!</p>');
		player.level++;
		player.maxHP +=3;
		player.maxMP +=2;
		player.currentHP = player.maxHP;
		player.currentMP = player.maxMP;
		player.strength++;
		player.defense++;
		player.levelUpEXP += Math.floor(5*0.75*player.level);
		$($update).prepend(`<p>Max HP = ${player.maxHP}</p>`);
		$($update).prepend(`<p>Max MP = ${player.maxMP}</p>`);
		$($update).prepend(`<p>Strength = ${player.strength}</p>`);
		$($update).prepend(`<p>Defense = ${player.defense}</p>`);
		$($update).prepend(`<p>EXP to next level: ${player.levelUpEXP - player.currentEXP}</p>`);
	},
	magic(){

	}
}

$($clearLogButton).on('click', (e) => {
	console.log('clear');
	$($update).empty();
});