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
			player.fireSpell();
		}
		if(magicToggle === false && itemToggle === false){
			$($update).prepend('<p>You attack the enemy</p>');
			// attack function
		}
	});

	//Command description when hovering over upper left button
	$($upperLeftButton).hover(function(){
		if(magicToggle === false && itemToggle === false){
			//console.log('attackhover');
			$($commandDescription).text('Attack the enemy');
		}
		if(magicToggle === true && itemToggle === false){
			//console.log('fire');
			$($commandDescription).text('Use fire to attack the enemy - 25% chance for burn (-1hp per turn for 2-5 turns)');
		}
		}, function(){
			$($commandDescription).text('');
		}
	);


//Commands for the upper right button 
	//to magic menu
	$($upperRightButton).on('click', () => {
		//console.log('magic');
		if(magicToggle === false && itemToggle === false){
			//console.log('<p>open spell selection</p>');
			magicToggle = true;
			$upperLeftButton.text('Fire');
			$upperRightButton.text('Return');
			$lowerLeftButton.text('Ice');
			$lowerRightButton.text('Lightning');
		}
		if(magicToggle === false && itemToggle === true){
			player.healthPotion();
		}
	});

	//Command description when hovering over upper right button
	$($upperRightButton).hover(function(){
		if(magicToggle === false && itemToggle === false){
			$($commandDescription).text('Choose a spell to cast');
		}
		if(magicToggle === true && itemToggle === false){
			$($commandDescription).text('Double click to return to main command screen');
		}
		if(magicToggle === false && itemToggle === true){
			$($commandDescription).text(`Restore 50% of max health (${Math.ceil(player.maxHP/2)} points)`);
		}
		}, function(){
			$($commandDescription).text('');
		}
	);

	//Commands to return to main command screen from magic menu
	$($upperRightButton).on('dblclick', () => {
		//console.log('magic');
		if(magicToggle === true && itemToggle === false){
			//console.log('switch to full command list');
			magicToggle = false;
			$upperLeftButton.text('Attack');
			$upperRightButton.text('Magic');
			$lowerLeftButton.text('Item');
			$lowerRightButton.text('Escape');
		}
	});


//Commands for lower left button
	//to item menu
	$($lowerLeftButton).on('click', () => {
		//console.log('item');
		if(magicToggle === false && itemToggle === false){
			//console.log('open item selection');
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

	//Hover over the lower left button
	$($lowerLeftButton).hover(function(){
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
			$($commandDescription).text('');
		}
	);

	//Commands to return to main command screen from item menu
	$($lowerLeftButton).on('dblclick', () => {
		//console.log('item');
		if(itemToggle === true){
			//console.log('switch to full command list');
			itemToggle = false;
			$upperLeftButton.text('Attack');
			$upperRightButton.text('Magic');
			$lowerLeftButton.text('Item');
			$lowerRightButton.text('Escape');
		}
	});

//Commands for lower right button
	//click functions for lower right
	$lowerRightButton.click(function() {
		if(magicToggle === false && itemToggle === false){
			$($update).prepend('<p>You attempt to run from the battle</p>');
		}
		if(magicToggle === true && itemToggle === false){
			$($update).prepend('<p>You used the lightning spell</p>');
		}
		if(magicToggle === false && itemToggle === true){
			player.manaPotion();
		}
	}
	);

	//Hover for lower right button
	$($lowerRightButton).hover(function(){
		if(magicToggle === false && itemToggle === false){
			$($commandDescription).text('Run from battle');
		}
		if(magicToggle === true && itemToggle === false){
			$($commandDescription).text('Use lightning spell - 10% chance of shock (enemy cannot attack next turn)');
		}
		if(magicToggle === false && itemToggle === true){
			$($commandDescription).text(`Restore 50% of max MP (${Math.ceil(player.maxMP/2)} points)`);
		}
		}, function(){
			$($commandDescription).text('');
		}
	);


//Enemies
	class enemies{
		constructor(name, strength, attack, hp, defense, fireWeakness, iceWeakness, lightningWeakness, imageURL, exp){
			this.name = name;
			this.strength = strength;
			this.attack = attack;
			this.HP = hp;
			this.defense = defense
			this.fireWeakness = fireWeakness;
			this.iceWeakness = iceWeakness;
			this.lightningWeakness = lightningWeakness;
			this.burn = false;
			this.frostbite = false;
			this.shock = false;
			this.imageURL = imageURL;
			this.expPts = exp;
		}
		attack(){
			$($update).prepend(`<p>The enemy attacks you!</p>`);
		}
	}

	const bat = new enemies('Bat', 2, "bite", 15, 2, false, false, true, 'url(images/enemies/bat.gif)', 2);
	const snake = new enemies('Snake', 3, "bite", 10, 2, true, true, false, 'url(images/enemies/snake.gif)', 2);

	const cave = [bat];
	const field = [snake];


//Potions
	const healthPotion = {
		name: 'Health Potion',
		recovery: 0.5,
	};

	const manaPotion = {
		name: 'Mana Potion',
		recovery: 0.5,
	}

//Player
	const player = {
		maxHP: 20,
		maxMP: 8,
		currentHP: 20,
		currentMP: 8,
		level: 1,
		strength: 6,
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
		fireSpell(){
			let dmg = 5;
			const burnChance = .25;
			game.currentEnemy.HP -= dmg;
			if(Math.random() < burnChance){
				game.currentEnemy.burn = true;
				$($update).prepend(`${game.currentEnemy.name} has been burned.`);
			}
			$('#attack-animation').css('background-image', 'url(../images/attacks/fireball.gif)');
		},
		iceSpell(){
			let dmg = 5;
			const frostbiteChance = .25;
			game.currentEnemy.HP -= dmg;
			if(Math.random() < frostbiteChance){
				game.currentEnemy.frostbite = true;
				$($update).prepend(`${game.currentEnemy.name} has been frostbitten.`);
			}
			$('#attack-animation').css('background-image', 'url(../images/attacks/ice.gif)');
		},
		lightningSpell(){
			let dmg = 5;
			const shockChance = .1;
			game.currentEnemy.HP -= dmg;
			if(Math.random() < shockChance){
				game.currentEnemy.shock = true;
				$($update).prepend(`${game.currentEnemy.name} is in shock.`);
			}
			$('#attack-animation').css('background-image', 'url(../images/attacks/lightning.gif)');
		},
		healthPotion(){
			if(this.healthPotions > 0 && this.currentHP < this.maxHP){
				if(Math.ceil(healthPotion.recovery * this.maxHP) + this.currentHP >= this.maxHP){
					this.currentHP = this.maxHP;
				} else{
					this.currentHP += Math.ceil(healthPotion.recovery * this.maxHP);
				}
				console.log(player.currentHP);
				$('#currentHP').text(player.currentHP);
				$('#hpBar').css('width', `${(this.currentHP/this.maxHP)*100}%`);
				this.healthPotions--;
			} else{
				if(this.healthPotions = 0){
					$($update).prepend('<p>You have no health potions left</p>')
				} else{
					$($update).prepend('<p>Health is already at max</p>');
				}
			}
		},
		manaPotion(){
			if(this.manaPotions > 0 && this.currentMP < this.maxMP){
				if(Math.ceil(manaPotion.recovery * this.maxMP) + this.currentMP >= this.maxMP){
					this.currentMP = this.maxMP;
				} else{
					this.currentMP += Math.ceil(healthPotion.recovery * this.maxMP);
				}
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				this.manaPotions--;
			} else if(this.manaPotions = 0){
					$($update).prepend('<p>You have no mana potions left</p>')
			} else{
				$($update).prepend('<p>Mana is already at max</p>');
			}
		}
	}

$($clearLogButton).on('click', (e) => {
	console.log('clear');
	$($update).empty();
});

const game = {
	currentEnemy: {
		name: null,
		strength: null,
		HP: null,
		fireWeakness: null,
		iceWeakness: null,
		lightningWeakness: null,
		burn: null,
		frostbite: null,
		shock: null,
		imageURL: null,
		exp: null
	},
	battleRound: 1,
	zone: "fields",
	selectEnemy(){
		if(game.zone === 'fields'){
			const randomIndex = Math.floor(Math.random()*field.length);
			game.currentEnemy.name = field[randomIndex].name;
			game.currentEnemy.strength = field[randomIndex].strength;
			game.currentEnemy.HP = field[randomIndex].HP;
			game.currentEnemy.fireWeakness = field[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = field[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = field[randomIndex].lightningWeakness;
			game.currentEnemy.burn = field[randomIndex].burn;
			game.currentEnemy.frostbite = field[randomIndex].frostbite;
			game.currentEnemy.shock = field[randomIndex].shock;
			game.currentEnemy.imageURL = field[randomIndex].imageURL;
			game.currentEnemy.exp = field[randomIndex].expPts;
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyHealth').append(`<h6>${game.currentEnemy.HP}`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<p style="color: orange">Fire</p>');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<p style="color: teal">Ice</p>');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<p style="color: Purple">Lightning</p>');
			}
		}
	}
}