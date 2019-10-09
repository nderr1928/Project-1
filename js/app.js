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
	let battleToggle = false;
	let playerToggle = false;
	let gameOverToggle = false;
	let startingZone = true;
	
//Hover functions for all buttons
	//Top left
	$($upperLeftButton).hover(function(){
		if(magicToggle === false && itemToggle === false){
			$($commandDescription).text('Attack the enemy');
		}
		if(magicToggle === true && itemToggle === false){
			$($commandDescription).text('Use fire to attack the enemy - 25% chance for burn (-1hp per turn for 2-5 turns)');
		}
		}, function(){
			$($commandDescription).text('');
		}
	);
	
	//Top right
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

	//Bottom left
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

	//Bottom right
	$($lowerRightButton).hover(function(){
		if(magicToggle === false && itemToggle === false && battleToggle === false && playerToggle === false){
			$($commandDescription).text('Begin the battle');
		}
		if(magicToggle === true && itemToggle === false){
			$($commandDescription).text('Use lightning spell - 10% chance of shock (enemy cannot attack next turn)');
		}
		if(magicToggle === false && itemToggle === true){
			$($commandDescription).text(`Restore 50% of max MP (${Math.ceil(player.maxMP/2)} points)`);
		}
		if(gameOverToggle === true){
			$($commandDescription).text(`Start over with current stats`);
		}
		}, function(){
			$($commandDescription).text('');
		}
	);

//All click commands
	//Top left - Attack or fire
	$($upperLeftButton).click( () => {
		if(magicToggle === true && itemToggle === false && battleToggle === true && playerToggle === true){
			player.fireSpell();
		}
		if(magicToggle === false && itemToggle === false && battleToggle === true && playerToggle === true){
			player.attack();
		}
	});

	//Top right - Magic menu or health potion
	$($upperRightButton).click( () => {
		if(magicToggle === false && itemToggle === false && battleToggle === true && playerToggle === true){
			magicToggle = true;
			$upperLeftButton.text('Fire (MP: 5)');
			$upperRightButton.text('Return');
			$lowerLeftButton.text('Ice (MP: 3)');
			$lowerRightButton.css('visibility', 'visible');
			$lowerRightButton.text('Lightning (MP: 4)');
		}
		if(magicToggle === false && itemToggle === true && battleToggle === true && playerToggle === true){
			player.healthPotion();
			game.enemyAttack();
		}
	});

	//Bottom left - to item menu or ice
	$($lowerLeftButton).click( () => {
		if(magicToggle === false && itemToggle === false && battleToggle === true && playerToggle === true){
			itemToggle = true;
			$upperRightButton.text(`Health Potion (x${player.healthPotions})`);
			$lowerLeftButton.text('Return');
			$lowerRightButton.css('visibility', 'visible');
			$upperLeftButton.css('visibility', 'hidden');
			$lowerRightButton.text(`Mana Potion (x${player.manaPotions})`);
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true && playerToggle === true){
			player.iceSpell();
		}
	});

	//Bottom right - start battle or lightning or mana potion
	$lowerRightButton.click(function() {
		if(magicToggle === false && itemToggle === false && battleToggle === false && playerToggle === false){
			game.gameStart();
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true && playerToggle === true){
			player.lightningSpell();
		}
		if(magicToggle === false && itemToggle === true && battleToggle === true && playerToggle === true){
			player.manaPotion();
			game.enemyAttack();
		}
		if(gameOverToggle === true){
			game.startOver();
		}
	});

//dblclcik return commands
	//Commands to return to main command screen from magic menu
	$($upperRightButton).on('dblclick', () => {
		if(magicToggle === true && itemToggle === false ){
			magicToggle = false;
			$upperLeftButton.text('Attack');
			$upperRightButton.text('Magic');
			$lowerLeftButton.text('Item');
			$lowerRightButton.css('visibility', 'hidden');
			$lowerRightButton.text('');
		}
	});

	//Commands to return to main command screen from item menu
	$($lowerLeftButton).on('dblclick', () => {
		if(magicToggle === false && itemToggle === true){
			itemToggle = false;
			$upperLeftButton.css('visibility', 'visible');
			$upperRightButton.text('Magic');
			$lowerLeftButton.text('Item');
			$lowerRightButton.css('visibility', 'hidden');
			$lowerRightButton.text('');
		}
	});

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
	}

	const bat = new enemies('Bat', 2, "bite", 15, 2, false, false, true, 'url(images/enemies/bat_fast.gif)', 2);
	const snake = new enemies('Snake', 3, "bite", 10, 2, true, true, false, 'url(images/enemies/snake.gif)', 2);
	const rat = new enemies('Rat', 2, "bite", 8, 1, true, true, true, 'url(images/enemies/rat.gif)',1);

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
		manaRegen: 1,
		level: 1,
		weaponAtk: 3,
		strength: 2,
		defense: 1,
		currentEXP: 0,
		levelUpEXP: 5,
		healthPotions: 3,
		manaPotions: 3,
		playerTurn(){
			$($update).prepend('<p>You attack the enemy!</p>');
		},
		levelUp(){
			$($update).prepend('<p style="border-top: 1px black solid">You have leveled up!</p>');
			player.level++;
			player.maxHP +=3;
			player.maxMP +=2;
			player.currentHP = player.maxHP;
			player.currentMP = player.maxMP;
			player.strength++;
			player.defense++;
			player.levelUpEXP += Math.floor(5*0.75*player.level);
			$('#currentHP').text(player.currentHP);
			$('#hpBar').css('width', `${(this.currentHP/this.maxHP)*100}%`);
			$('#currentMP').text(player.currentMP);
			$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
			$($update).prepend(`<p>Max HP = ${player.maxHP}</p>`);
			$($update).prepend(`<p>Max MP = ${player.maxMP}</p>`);
			$($update).prepend(`<p>Strength = ${player.strength}</p>`);
			$($update).prepend(`<p>Defense = ${player.defense}</p>`);
			$($update).prepend(`<p style="border-bottom: 1px black solid">EXP to next level: ${player.levelUpEXP - player.currentEXP}</p>`);
		},
		attack(){
			$($update).prepend(`<p>You attack the enemy</p>`)
			const dmg = Math.ceil(player.strength + player.weaponAtk - Math.floor(game.currentEnemy.defense/2));
			game.battleAnimation('url(images/attacks/slash_slow.gif)')
			if(dmg <= 1){
				game.currentEnemy.HP--;
				$('#enemyHealth').text(game.currentEnemy.HP);
				$($update).prepend(`<p>You deal 1 point of damage.</p>`);
			} else if(game.currentEnemy.HP - dmg <= 0){
				game.currentEnemy.HP = 0;
				$('#enemyHealth').text(game.currentEnemy.HP);
				$($update).prepend(`<p>You deal ${dmg} points of damage.</p>`)
			} 
			else{
				game.currentEnemy.HP -= dmg;
				$('#enemyHealth').text(game.currentEnemy.HP);
				$($update).prepend(`<p>You deal ${dmg} points of damage.</p>`);
			}
			playerToggle = false;
			//this.textPause(1);
			if(game.currentEnemy.HP > 0){
				game.enemyAttack();
			}
			game.checkDeath();
		},
		fireSpell(){
			const spellCost = 5;
			if(player.currentMP < spellCost){
				$($update).prepend(`<p>Not enough MP to cast</p>`);
			} else{
				$($update).prepend('<p>You used the fire spell</p>');
				game.battleAnimation('url(images/attacks/fireball.gif)');
				player.currentMP -= spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				let dmg = 4;
				if(game.currentEnemy.fireWeakness === true){
					dmg = Math.floor(dmg * 1.5);
				}
				if(game.currentEnemy.HP - dmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p>You deal ${dmg} points of damage.</p>`);
				} else{
					game.currentEnemy.HP -= dmg;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p>You deal ${dmg} points of damage.</p>`);
				}
				const burnChance = .25;
				game.currentEnemy.HP -= dmg;
				if(Math.random() < burnChance){
					game.currentEnemy.burn = true;
					$($update).prepend(`<p>${game.currentEnemy.name} has been burned.</p>`);
				}
				playerToggle = false;
				// this.textPause(1);
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerRightButton.text('');
				if(game.currentEnemy.HP > 0){
					game.enemyAttack();
				}
				game.checkDeath();
			}
		},
		iceSpell(){
			const spellCost = 3;
			if(player.currentMP < spellCost){
				$($update).prepend(`<p>Not enough MP to cast</p>`);
			} else{
				$($update).prepend('<p>You used the ice spell</p>');
				game.battleAnimation('url(images/attacks/ice.gif)');
				player.currentMP -= spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				let dmg = 4;
				if(game.currentEnemy.iceWeakness === true){
					dmg = Math.floor(dmg * 1.5);
				}
				if(game.currentEnemy.HP - dmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p>You deal ${dmg} points of damage.</p>`);
				} else{
					game.currentEnemy.HP -= dmg;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p>You deal ${dmg} points of damage.</p>`);
				}
				const frostbiteChance = .25;
				if(Math.random() < frostbiteChance){
					game.currentEnemy.frostbite = true;
					$($update).prepend(`<p>${game.currentEnemy.name} has been frostbitten.</p>`);
				}
				playerToggle = false;
				// this.textPause(1);
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerRightButton.text('');
				if(game.currentEnemy.HP > 0){
					game.enemyAttack();
				}
				game.checkDeath();
			}
		},
		lightningSpell(){
			const spellCost = 4;
			if(player.currentMP < spellCost){
				$($update).prepend(`<p>Not enough MP to cast</p>`);
			} else{
				$($update).prepend('<p>You used the lightning spell</p>');
				game.battleAnimation('url(images/attacks/lightning.gif)');
				player.currentMP -= spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				let dmg = 4;
				if(game.currentEnemy.lightningWeakness === true){
					dmg = Math.floor(dmg * 1.5);
				}
				if(game.currentEnemy.HP - dmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p>You deal ${dmg} points of damage.</p>`);
				} else{
					game.currentEnemy.HP -= dmg;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p>You deal ${dmg} points of damage.</p>`);
				}
				const shockChance = .1;
				if(Math.random() < shockChance){
					game.currentEnemy.shock = true;
					$($update).prepend(`<p>${game.currentEnemy.name} is in shock.</p>`);
				}
				playerToggle = false;
				// this.textPause(1);
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerRightButton.text('');
				if(game.currentEnemy.HP > 0){
					game.enemyAttack();
				}
				game.checkDeath();
			}
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
				playerToggle = false;
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('display', 'none');
				$lowerRightButton.text('');
			} else{
				if(this.healthPotions = 0){
					$($update).prepend('<p>You have no health potions left</p>')
				} else{
					$($update).prepend('<p>Health is already at max</p>');
				}
			}
			game.checkDeath();
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
				playerToggle = false;
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('display', 'none');
				$lowerRightButton.text('');
			} else if(this.manaPotions = 0){
					$($update).prepend('<p>You have no mana potions left</p>')
			} else{
				$($update).prepend('<p>Mana is already at max</p>');
			}
			game.checkDeath();
		}
	}

$($clearLogButton).on('click', (e) => {
	console.log('clear');
	$($update).empty();
});

const zones = {
	fields: {
		name: 'Open Fields',
		numBattles: 4,
		enemies: [snake],
		imageURL: 'url(image/backgrounds/fieldBackground.jpeg)'
	},
	caveEntrance: {
		name: 'Archway Cave Entrance',
		numBattles: 1,
		enemies: [],
		imageURL: 'url(image/backgrounds/caveEntranceBackground.jpg)'
	},
	cave: {
		name: 'Archway Cave',
		numBattles: 4,
		enemies: [rat, bat],
		imageURL: 'url(image/backgrounds/caveBackground.jpg)'
	},
	caveExit: {
		name: 'Archway Cave Exit',
		numBattles: 1,
		enemies: [],
		imageURL: 'url(image/backgrounds/caveExitBackground.jpg)'
	},
	graveyard: {
		name: 'Weeping Bones Necrofield',
		numBattles: 4,
		enemies: [],
		imageURL: 'url(images/backgrounds/graveyardBackground)'
	},
	castleEntrance: {
		name: 'Castle to Hell Entrance',
		numBattles: 1,
		enemies: [],
		imageURL: 'url(image/backgrounds/castleEntranceBackground.jpeg)'
	},
	castleInterior: {
		name: 'Castle to Hell',
		numBattles: 4,
		enemies: [],
		imageURL: 'url(image/backgrounds/castleBackground.jpeg)'
	},
	castleThroneRoom: {
		name: 'Castle to Hell Throne Room',
		numBattles: 1,
		enemies: [],
		imageURL: 'url(image/backgrounds/throneBackground2.jpg)'
	},
	changeZones(){
		if(startingZone === true){
			startingZone = false;
			$('main').css('background-image', this.fields.imageURL);
			$('#zone-info').text(`Zone: ${this.fields.name}`);
			game.totalNumBattleRounds = this.fields.numBattles;
		}
		if(game.zone === this.fields.name && startingZone === false){
			alert('You have made it to the entrnace of Archway Cave. A guard stands near. You approach the entrance but the guard says that you must defeat them in battle before they can allow you to pass. The only way forward is through them!');
			$('main').css('background-image', this.caveEntrance.imageURL);
			$('#zone-info').text(`Zone: ${this.caveEntrance.name}`);
			game.totalNumBattleRounds = this.caveEntrance.numBattles;
		}
		if(game.zone === this.caveEntrance.name && startingZone === false){
			alert('You have defeated the guard and he allows you to pass. The journey through Archway Cave has begun.');
			$('main').css('background-image', this.cave.imageURL);
			$('#zone-info').text(`Zone: ${this.cave.name}`);
			game.totalNumBattleRounds = this.cave.numBattles;
		}
		if(game.zone === this.cave.name && startingZone === false){
			alert('You see the light of the moon shine through as you approach stairs. ')
			$('main').css('background-image', this.caveExit.imageURL);
			$('#zone-info').text(`Zone: ${this.caveExit.name}`);
			game.totalNumBattleRounds = this.caveExit.numBattles;
		}
		if(game.zone === this.caveExit.name && startingZone === false){
			$('main').css('background-image', this.graveyard.imageURL);
			$('#zone-info').text(`Zone: ${this.graveyard.name}`);
			game.totalNumBattleRounds = this.graveyard.numBattles;
		}
		if(game.zone === this.graveyard.name && startingZone === false){
			$('main').css('background-image', this.castleEntrance.imageURL);
			$('#zone-info').text(`Zone: ${this.castleEntrance.name}`);
			game.totalNumBattleRounds = this.castleEntrance.numBattles;
		}
		if(game.zone === this.castleEntrance.name && startingZone === false){
			$('main').css('background-image', this.castleInterior.imageURL);
			$('#zone-info').text(`Zone: ${this.castleInterior.name}`);
			game.totalNumBattleRounds = this.castleInterior.numBattles;
		}
		if(game.zone === this.castleInterior.name && startingZone === false){
			$('main').css('background-image', this.castleThroneRoom.imageURL);
			$('#zone-info').text(`Zone: ${this.castleThroneRoom.name}`);
			game.totalNumBattleRounds = this.castleThroneRoom.numBattles;
		}
	}
}

const game = {
	currentEnemy: {
		name: null,
		strength: null,
		attack: null,
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
	totalNumBattleRounds: null,
	zone: 'Archway Cave',
	selectEnemy(){
		if(game.zone === zones.fields.name){
			const randomIndex = Math.floor(Math.random()*zones.fields.enemies.length);
			game.currentEnemy.name = zones.fields.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.fields.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.fields.enemies[randomIndex].attack;
			game.currentEnemy.HP = zones.fields.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.fields.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.fields.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.fields.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.fields.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.fields.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.fields.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.fields.enemies[randomIndex].shock;
			game.currentEnemy.imageURL = zones.fields.enemies[randomIndex].imageURL;
			game.currentEnemy.exp = zones.fields.enemies[randomIndex].expPts;
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
			$($update).prepend(`<p>An enemy ${fields[randomIndex].name} has appeared!`);
		}
		if(game.zone === zones.cave.name){
			const randomIndex = Math.floor(Math.random()*zones.cave.enemies.length);
			game.currentEnemy.name = zones.cave.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.cave.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.cave.enemies[randomIndex].attack;
			game.currentEnemy.HP = zones.cave.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.cave.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.cave.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.cave.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.cave.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.cave.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.cave.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.cave.enemies[randomIndex].shock;
			game.currentEnemy.imageURL = zones.cave.enemies[randomIndex].imageURL;
			game.currentEnemy.exp = zones.cave.enemies[randomIndex].expPts;
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
	},
	enemyAttack(){
		$($update).prepend(`<p>The enemy attacks you with a ${game.currentEnemy.attack}!</p>`);
		const dmg = Math.ceil(game.currentEnemy.strength - Math.floor(player.defense/2));
		if(dmg <= 1){
			player.currentHP--;
			$('#currentHP').text(player.currentHP);
			$('#hpBar').css('width', `${(player.currentHP/player.maxHP)*100}%`);
			$($update).prepend(`<p>You take 1 point of damage.</p>`);
		} else if(player.currentHP - dmg <= 0){
			player.currentHP = 0;
			$('#currentHP').text(player.currentHP);
			$('#hpBar').css('width', `${(player.currentHP/player.maxHP)*100}%`);
			$($update).prepend(`<p>You take ${dmg} points of damage.</p>`);
			$($update).prepend(`<p style:"border-bottom:1px black solid">You have been defeated by the enemy!</p>`);
		} 
		else{
			player.currentHP -= dmg;
			$('#currentHP').text(player.currentHP);
			$('#hpBar').css('width', `${(player.currentHP/player.maxHP)*100}%`);
			$($update).prepend(`<p>You take ${dmg} points of damage.</p>`);
		}
		if(player.currentMP < player.maxMP){
			player.currentMP += player.manaRegen;
			$('#currentMP').text(player.currentMP);
			$('#manaBar').css('width', `${(player.currentMP/player.maxMP)*100}%`);
		}
		playerToggle = true;
	},
	textPause(timeDelay){
		let timer = 0;
		const pause = setInterval(function(){
			if(timer >= timeDelay){
				clearInterval(pause);
			}
			timer++;
		}, 1000);
	},
	battleAnimation(imageURL){
		let timer = 0;
		$('#attack-animation').css('background-image', imageURL);
		const pause = setInterval(function(){
			if(timer = 1){
				$('#attack-animation').css('background-image', '');
				clearInterval(pause);
			}
			timer++;
		}, 1500);
	},
	gameStart(){
		$('#enemyHealth').empty();
		$('#enemyWeakness').empty();
		this.selectEnemy();
		$lowerRightButton.css('visibility', 'hidden');
		$lowerRightButton.text('');
		battleToggle = true;
		playerToggle = true;
		$($update).prepend(`<p style="border-top: 1px black solid">An enemy ${game.currentEnemy.name} has appeared!`)
	},
	checkDeath(){
		if(game.currentEnemy.HP <= 0){
			$lowerRightButton.text('Start');
			$lowerRightButton.css('visibility', 'visible');
			$('#enemy-image').css('background-image', 'url(images/enemies/defeated.png)');
			battleToggle = false;
			playerToggle = false;
			player.currentEXP += game.currentEnemy.exp;
			if(player.currentEXP >= player.levelUpEXP){
				$($update).prepend(`<p style="border-bottom: 1px black solid">You have defeated the enemy and gained ${game.currentEnemy.exp} experience points.</p>`);
				player.levelUp();
			} else{
				$($update).prepend(`<p>You have defeated the enemy and gained ${game.currentEnemy.exp} experience points.</p>`);
				$($update).prepend(`<p style="border-bottom: 1px black solid"> ${player.levelUpEXP - player.currentEXP} point(s) until level up.</p>`);
			}
		}
		if(player.currentHP <= 0){
			$($update).prepend(`<p style="border-bottom: 1px black solid">You have been slain.</p>`);
			$('#enemy-image').css('background-image', 'url(images/gameover.gif)');
			$('#enemy-image').css('height', '300px');
			$('#enemy-image').css('width', '300px');
			gameOverToggle = true;
			battleToggle = false;
			playerToggle = false;
			$lowerRightButton.css('visibility', 'visible');
			$lowerRightButton.text('Start Over');
			$lowerLeftButton.css('visibility', 'hidden');
			$upperLeftButton.css('visibility', 'hidden');
			$upperRightButton.css('visibility', 'hidden');
		}
	},
	startOver(){
		gameOverToggle = false;
		player.currentHP = player.maxHP;
		$('#hpBar').css('width', `${(player.currentHP/player.maxHP)*100}%`);
		player.currentMP = player.maxMP;
		$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
		$lowerRightButton.text('');
		$lowerRightButton.css('visibility', 'hidden');
		$lowerLeftButton.css('visibility', 'visible');
		$upperLeftButton.css('visibility', 'visible');
		$upperRightButton.css('visibility', 'visible');
		game.gameStart();
	}
}

