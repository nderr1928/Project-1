//Global varibales being used
const $clearLogButton = $('#clearlog');
const $update = $('#updates'); 
const $upperLeftButton = $('#upperleft-button');
const $upperRightButton = $('#upperright-button');
const $lowerLeftButton = $('#lowerleft-button');
const $lowerRightButton = $('#lowerright-button');
const $commandDescription = $('#commandDescription');
let magicToggle = false;
let itemToggle = false;

//Commands for upper left button 
	//Attack or fire
	$($upperLeftButton).on('click', () => {
		if(magicToggle === true && itemToggle === false){
			$($update).prepend('<p>You used the fire spell</p>');
			//fire function
		}
		if(magicToggle === false && itemToggle === false){
			$($update).prepend('<p>You attack the enemy</p>');
			// attack function
		}
	});

	//Command description when hovering over upper left button
	$($upperLeftButton).hover(function(){
		if(magicToggle === false && itemToggle === false){
			console.log('attackhover');
			$($commandDescription).text('Attack the enemy');
		}
		if(magicToggle === true && itemToggle === false){
			console.log('fire');
			$($commandDescription).text('Use fire to attack the enemy - 25% chance for burn (-1hp per turn for 2-5 turns)');
		}
		}, function(){
			$($commandDescription).text('-');
		}
	);


//Commands for the upper right button 
	//to magic menu
	$($upperRightButton).on('click', () => {
		console.log('magic');
		if(magicToggle === false && itemToggle === false){
			console.log('<p>open spell selection</p>');
			magicToggle = true;
			$upperLeftButton.text('Fire');
			$upperRightButton.text('Return');
			$lowerLeftButton.text('Ice');
			$lowerRightButton.text('Lightning');
		}
		if(magicToggle === false && itemToggle === true){
			$($update).prepend('<p>You used a health potion</p>');
		}
	});

	//Commands to return to main command screen from magic menu
	$($upperRightButton).on('dblclick', () => {
		console.log('magic');
		if(magicToggle === true && itemToggle === false){
			console.log('switch to full command list');
			magicToggle = false;
			$upperLeftButton.text('Attack');
			$upperRightButton.text('Magic');
			$lowerLeftButton.text('Item');
			$lowerRightButton.text('Escape');
		}
	});

	//Command description when hovering over upper right button
	$($upperRightButton).hover(function(){
		console.log('magichover');
		if(magicToggle === false && itemToggle === false){
			$($commandDescription).text('Choose a spell to cast');
		}
		if(magicToggle === true && itemToggle === false){
			$($commandDescription).text('Double click to return to main command screen');
		}
		if(magicToggle === false && itemToggle === true){
			$($commandDescription).text('Use a health potion');
		}
		}, function(){
			$($commandDescription).text('-');
		}
	);

//Commands for lower left button
	//Hover over the lower left button
	$($lowerLeftButton).hover(function(){
		console.log('itemhover');
		if(itemToggle === false && magicToggle === false){
			$($commandDescription).text('Use an item');
		}
		if(magicToggle === false && itemToggle === true){
			$($commandDescription).text('Double click to return to main command screen');
		}
		if(magicToggle === true && itemToggle === false){
			$($commandDescription).text('Use ice attack - 25% chance of frostbite (enemy atk reduced by 10% for 2-5 turns)');
		}
		}, function(){
			$($commandDescription).text('-');
		}
	);

	//to item menu
	$($lowerLeftButton).on('click', () => {
		console.log('item');
		if(magicToggle === false && itemToggle === false){
			console.log('open item selection');
			itemToggle = true;
			$upperLeftButton.text('');
			$upperRightButton.text(`Health Potion (x${player.healthPotions})`);
			$lowerLeftButton.text('Return');
			$lowerRightButton.text(`Mana Potion (x${player.manaPotions})`);
		}
		if(magicToggle === true && itemToggle === false){
			$($update).prepend('<p>You used the ice spell</p>');
		}
	});

	//Commands to return to main command screen from item menu
	$($lowerLeftButton).on('dblclick', () => {
		console.log('item');
		if(itemToggle === true){
			console.log('switch to full command list');
			itemToggle = false;
			$upperLeftButton.text('Attack');
			$upperRightButton.text('Magic');
			$lowerLeftButton.text('Item');
			$lowerRightButton.text('Escape');
		}
	});

//Commands for lower right button
	//Hover for lower right button
	$($lowerRightButton).hover(function(){
		if(magicToggle === false && itemToggle === false){
			console.log('escapehover');
			$($commandDescription).text('Run from battle');
		}
		if(magicToggle === true && itemToggle === false){
			$($commandDescription).text('Use lightning spell - 10% chance of shock (enemy cannot attack next turn)');
		}
		if(magicToggle === false && itemToggle === true){
			$($commandDescription).text('Use mana potion');
		}
		}, function(){
			$($commandDescription).text('-');
		}
	);

	$lowerRightButton.click(function() {
		if(magicToggle === false && itemToggle === false){
			console.log('escapehover');
			$($update).prepend('<p>You attempt to run from the battle</p>');
		}
		if(magicToggle === true && itemToggle === false){
			$($update).prepend('<p>You used the lightning spell</p>');
		}
		if(magicToggle === false && itemToggle === true){
			$($update).prepend('<p>You used a mana potion</p>');
		}
	}

	)

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
	healthPotions: 3,
	manaPotions: 3,
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