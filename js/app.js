const $clearLogButton = $('#clearlog');
const $update = $('#updates'); 
const $attackButton = $('#attack-button');
const $magicButton = $('#magicbutton');
const $itemButton = $('#item-button');
const $escapeButton = $('#escape-button');
const $commandDescription = $('#commandDescription');

$($attackButton).on('click', () => {
	console.log('player attacks');
	player.attack();
})

$($attackButton).hover(function(){
	console.log('attackhover');
	$($commandDescription).text('Attack the enemy');
	}, function(){
		$($commandDescription).text('-');
  });

// $($attackButton).on('hover', () => {
// 	console.log('attackhover');
// 	$($commandDescription).text('Attack the enemy');
// 	}, () => {
// 		$($commandDescription).text('-');
// 	}
// )

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
	attack(){
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