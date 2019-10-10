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
	
	let fireDmg;
	let iceDmg;
	let lightningDmg;
	
//Hover functions for all buttons
	//Top left
	$($upperLeftButton).hover(function(){
		if(magicToggle === false && itemToggle === false && battleToggle === true){
			$($commandDescription).text(`Attack the enemy`);
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true){
			$($commandDescription).text(`Use fire to deal damage - 25% chance for burn (-1hp per turn for 2-5 turns)`);
		}
		}, function(){
			$($commandDescription).text('');
		}
	);
	
	//Top right
	$($upperRightButton).hover(function(){
		if(magicToggle === false && itemToggle === false && battleToggle === true){
			$($commandDescription).text('Choose a spell to cast');
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true){
			$($commandDescription).text('Double click to return to main command screen');
		}
		if(magicToggle === false && itemToggle === true && battleToggle === true){
			$($commandDescription).text(`Restore 50% of max health (${Math.ceil(player.maxHP/2)} points)`);
		}
		}, function(){
			$($commandDescription).text('');
		}
	);

	//Bottom left
	$($lowerLeftButton).hover(function(){
		if(itemToggle === false && magicToggle === false && battleToggle === true){
			$($commandDescription).text('Use an item');
		}
		if(magicToggle === false && itemToggle === true && battleToggle === true){
			$($commandDescription).text('Double click to return to main command screen');
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true){
			$($commandDescription).text(`Use ice to deal damage - 25% chance of frostbite (enemy atk reduced by 10% for 2-5 turns)`);
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
		if(magicToggle === true && itemToggle === false && battleToggle === true){
			$($commandDescription).text(`Use lightning to deal damage - 10% chance of shock (enemy cannot attack next turn)`);
		}
		if(magicToggle === false && itemToggle === true && battleToggle === true){
			$($commandDescription).text(`Restore 50% of max MP (${Math.ceil(player.maxMP/2)} points)`);
		}
		if(gameOverToggle === true){
			$($commandDescription).text(`Start over with current level`);
		}
		}, function(){
			$($commandDescription).text('');
		}
	);

	//Log clear button
	$('#clearlog').hover(function(){
		$($commandDescription).text(`Clear log of all text`);
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
		if(gameOverToggle === true){
			game.startOver();
		}
		if(magicToggle === false && itemToggle === false && battleToggle === false && playerToggle === false && gameOverToggle === false){
			game.gameStart();
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true && playerToggle === true){
			player.lightningSpell();
		}
		if(magicToggle === false && itemToggle === true && battleToggle === true && playerToggle === true){
			player.manaPotion();
			game.enemyAttack();
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

	const rat = new enemies('Rat', 2, "bite", 8, 1, true, false, true, 'url(images/enemies/rat.gif)',1);
	const snake = new enemies('Snake', 3, "bite", 10, 2, true, true, false, 'url(images/enemies/snake.gif)', 2);
	const caveGuard = new enemies('Cave Guard', 5, "Slash", 25, 3, false, false, true, 'url(images/enemies/caveGuard.gif)', 5);
	const bat = new enemies('Bat', 2, "bite", 15, 2, false, false, true, 'url(images/enemies/bat_fast.gif)', 2);
	const slime = new enemies('Slime', 2, "goop", 20, 5, true, true, true, 'url(images/enemies/slime.gif)', 4);

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
		levelUp(){
			$($update).prepend('<p style="border-top: 1px white solid; color: green">You have leveled up!</p>');
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
			$($update).prepend(`<p style="color: rgb(135,206,235)">Max HP = ${player.maxHP}</p>`);
			$($update).prepend(`<p style="color: rgb(135,206,235)">Max MP = ${player.maxMP}</p>`);
			$($update).prepend(`<p style="color: rgb(135,206,235)">Strength = ${player.strength}</p>`);
			$($update).prepend(`<p style="color: rgb(135,206,235)">Defense = ${player.defense}</p>`);
			$($update).prepend(`<p style="border-bottom: 1px white solid; color: green">EXP to next level: ${player.levelUpEXP - player.currentEXP}</p>`);
		},
		attack(){
			atkDmg = Math.ceil(player.strength + player.weaponAtk - Math.floor(game.currentEnemy.defense/2));
			game.battleAnimation('url(images/attacks/slash_slow.gif)')
			if(atkDmg <= 1){
				game.currentEnemy.HP--;
				$('#enemyHealth').text(game.currentEnemy.HP);
				$($update).prepend(`<p style="color: rgb(135,206,235)">You attack the enemy and deal 1 point of damage.</p>`);
			} else if(game.currentEnemy.HP - atkDmg <= 0){
				game.currentEnemy.HP = 0;
				$('#enemyHealth').text(game.currentEnemy.HP);
				$($update).prepend(`<p style="color: rgb(135,206,235)">You attack the enemy and deal ${atkDmg} points of damage.</p>`);
				game.checkDeath();
			} 
			else{
				game.currentEnemy.HP -= atkDmg;
				$('#enemyHealth').text(game.currentEnemy.HP);
				$($update).prepend(`<p style="color: rgb(135,206,235)">You attack the enemy and deal ${atkDmg} points of damage.</p>`);
			}
			playerToggle = false;
			if(game.currentEnemy.HP > 0){
				game.enemyAttack();
			}
		},
		fireSpell(){
			const spellCost = 5;
			if(player.currentMP < spellCost){
				$($update).prepend(`<p style="color: white">Not enough MP to cast</p>`);
			} else{
				game.battleAnimation('url(images/attacks/fireball.gif)');
				player.currentMP -= spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				fireDmg = 4;
				if(game.currentEnemy.fireWeakness === true){
					fireDmg = Math.floor(fireDmg * 1.5);
				}
				if(game.currentEnemy.HP - fireDmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: orange">You used the fire spell and deal ${fireDmg} points of damage.</p>`);
					game.checkDeath();
				} else{
					game.currentEnemy.HP -= fireDmg;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: orange">You used the fire spell and deal ${fireDmg} points of damage.</p>`);
				}
				const burnChance = 1;
				if(Math.random() < burnChance && game.currentEnemy.burn === false){
					game.currentEnemy.burn = true;
					$($update).prepend(`<p style="color: gold">The ${game.currentEnemy.name} has been burned.</p>`);
					$("#enemyDebuffs").append(`<p style="color: orange">Burnt</p>`);
				}
				playerToggle = false;
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
			}
		},
		iceSpell(){
			const spellCost = 3;
			if(player.currentMP < spellCost){
				$($update).prepend(`<p style="color: white">Not enough MP to cast</p>`);
			} else{
				game.battleAnimation('url(images/attacks/ice.gif)');
				player.currentMP -= spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				iceDmg = 4;
				if(game.currentEnemy.iceWeakness === true){
					iceDmg = Math.floor(iceDmg * 1.5);
				}
				if(game.currentEnemy.HP - iceDmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: teal">You used the ice spell and deal ${iceDmg} points of damage.</p>`);
					game.checkDeath();
				} else{
					game.currentEnemy.HP -= iceDmg;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: teal">You used the ice spell and deal ${iceDmg} points of damage.</p>`);
				}
				const frostbiteChance = 1;
				if(Math.random() < frostbiteChance && game.currentEnemy.frostbite === false){
					game.currentEnemy.frostbite = true;
					game.currentEnemy.defense = Math.floor(game.currentEnemy.defense * 0.9);
					$($update).prepend(`<p style="color: yellow">The ${game.currentEnemy.name} has been frostbitten.</p>`);
					$("#enemyDebuffs").append(`<p style="color: teal">Frostbiten</p>`);
				}
				playerToggle = false;
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
			}
		},
		lightningSpell(){
			const spellCost = 4;
			if(player.currentMP < spellCost){
				$($update).prepend(`<p style="color: white">Not enough MP to cast</p>`);
			} else{
				game.battleAnimation('url(images/attacks/lightning.gif)');
				player.currentMP -= spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				lightningDmg = 4;
				if(game.currentEnemy.lightningWeakness === true){
					lightningDmg = Math.floor(lightningDmg * 1.5);
				}
				if(game.currentEnemy.HP - lightningDmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: rgb(218,112,214)">You used the lightning spell and deal ${lightningDmg} points of damage.</p>`);
					game.checkDeath();
				} else{
					game.currentEnemy.HP -= lightningDmg;
					$('#enemyHealth').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: rgb(218,112,214)">You used the lightning spell and deal ${lightningDmg} points of damage.</p>`);
				}
				const shockChance = 1;
				if(Math.random() < shockChance){
					game.currentEnemy.shock = true;
					$($update).prepend(`<p style="color: yellow">The ${game.currentEnemy.name} is in shock.</p>`);
					$("#enemyDebuffs").append(`<p style="color: rgb(218,112,214)" id="shockedElement">Shocked</p>`);
				}
				playerToggle = false;
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
			}
		},
		healthPotion(){
			if(this.healthPotions > 0 && this.currentHP < this.maxHP){
				if(Math.ceil(healthPotion.recovery * this.maxHP) + this.currentHP >= this.maxHP){
					this.currentHP = this.maxHP;
				} else{
					this.currentHP += Math.ceil(healthPotion.recovery * this.maxHP);
				}
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
		enemies: [rat, snake],
		imageURL: 'url(images/backgrounds/fieldBackground.jpeg)'
	},
	caveEntrance: {
		name: 'Archway Cave Entrance',
		numBattles: 1,
		enemies: [caveGuard],
		imageURL: 'url(images/backgrounds/caveEntranceBackground.jpg)'
	},
	cave: {
		name: 'Archway Cave',
		numBattles: 4,
		enemies: [bat, slime],
		imageURL: 'url(images/backgrounds/caveBackground.jpg)'
	},
	caveExit: {
		name: 'Archway Cave Exit',
		numBattles: 1,
		enemies: [],
		imageURL: 'url(images/backgrounds/caveExitBackground.jpg)'
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
		imageURL: 'url(images/backgrounds/castleEntranceBackground.jpeg)'
	},
	castleInterior: {
		name: 'Castle to Hell',
		numBattles: 4,
		enemies: [],
		imageURL: 'url(images/backgrounds/castleBackground.jpeg)'
	},
	castleThroneRoom: {
		name: 'Castle to Hell Throne Room',
		numBattles: 1,
		enemies: [],
		imageURL: 'url(images/backgrounds/throneBackground2.jpg)'
	},
	changeZones(){
		if(startingZone === true){
			startingZone = false;
			$('main').css('background-image', this.fields.imageURL);
			$('#zone-info').text(`Zone: ${this.fields.name}`);
			game.totalNumBattleRounds = this.fields.numBattles;
			game.zone = this.fields.name;
		} else if(game.zone === this.fields.name && startingZone === false){
			alert('You have made it to the entrnace of Archway Cave. A guard stands near. You approach the entrance but the guard says that you must defeat them in battle before they can allow you to pass. The only way forward is through them!');
			$('main').css('background-image', this.caveEntrance.imageURL);
			$('#zone-info').text(`Zone: ${this.caveEntrance.name}`);
			game.totalNumBattleRounds = this.caveEntrance.numBattles;
			game.zone = this.caveEntrance.name;
		}else if(game.zone === this.caveEntrance.name && startingZone === false){
			alert('You have defeated the guard and he allows you to pass. The journey through Archway Cave has begun.');
			$('main').css('background-image', this.cave.imageURL);
			$('#zone-info').text(`Zone: ${this.cave.name}`);
			game.totalNumBattleRounds = this.cave.numBattles;
			game.zone = this.cave.name;
		}else if(game.zone === this.cave.name && startingZone === false){
			alert('You see the light of the moon shine through as you approach stairs. ')
			$('main').css('background-image', this.caveExit.imageURL);
			$('#zone-info').text(`Zone: ${this.caveExit.name}`);
			game.totalNumBattleRounds = this.caveExit.numBattles;
			game.zone = this.caveExit.name;
		}else if(game.zone === this.caveExit.name && startingZone === false){
			$('main').css('background-image', this.graveyard.imageURL);
			$('#zone-info').text(`Zone: ${this.graveyard.name}`);
			game.totalNumBattleRounds = this.graveyard.numBattles;
			game.zone = this.graveyard.name;
		}else if(game.zone === this.graveyard.name && startingZone === false){
			$('main').css('background-image', this.castleEntrance.imageURL);
			$('#zone-info').text(`Zone: ${this.castleEntrance.name}`);
			game.totalNumBattleRounds = this.castleEntrance.numBattles;
			game.zone = this.castleEntrance.name;
		}else if(game.zone === this.castleEntrance.name && startingZone === false){
			$('main').css('background-image', this.castleInterior.imageURL);
			$('#zone-info').text(`Zone: ${this.castleInterior.name}`);
			game.totalNumBattleRounds = this.castleInterior.numBattles;
			game.zone = this.castleInterior.name;
		}else if(game.zone === this.castleInterior.name && startingZone === false){
			$('main').css('background-image', this.castleThroneRoom.imageURL);
			$('#zone-info').text(`Zone: ${this.castleThroneRoom.name}`);
			game.totalNumBattleRounds = this.castleThroneRoom.numBattles;
			game.zone = this.castleThroneRoom.name;
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
	zone: null,
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
		}
		if(game.zone === zones.caveEntrance.name){
			const randomIndex = Math.floor(Math.random()*zones.caveEntrance.enemies.length);
			game.currentEnemy.name = zones.caveEntrance.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.caveEntrance.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.caveEntrance.enemies[randomIndex].attack;
			game.currentEnemy.HP = zones.caveEntrance.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.caveEntrance.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.caveEntrance.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.caveEntrance.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.caveEntrance.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.caveEntrance.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.caveEntrance.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.caveEntrance.enemies[randomIndex].shock;
			game.currentEnemy.imageURL = zones.caveEntrance.enemies[randomIndex].imageURL;
			game.currentEnemy.exp = zones.caveEntrance.enemies[randomIndex].expPts;
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
		if(game.zone === zones.caveExit.name){
			const randomIndex = Math.floor(Math.random()*zones.caveExit.enemies.length);
			game.currentEnemy.name = zones.caveExit.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.caveExit.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.caveExit.enemies[randomIndex].attack;
			game.currentEnemy.HP = zones.caveExit.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.caveExit.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.caveExit.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.caveExit.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.caveExit.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.caveExit.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.caveExit.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.caveExit.enemies[randomIndex].shock;
			game.currentEnemy.imageURL = zones.caveExit.enemies[randomIndex].imageURL;
			game.currentEnemy.exp = zones.caveExit.enemies[randomIndex].expPts;
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
		if(game.zone === zones.graveyard.name){
			const randomIndex = Math.floor(Math.random()*zones.graveyard.enemies.length);
			game.currentEnemy.name = zones.graveyard.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.graveyard.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.graveyard.enemies[randomIndex].attack;
			game.currentEnemy.HP = zones.graveyard.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.graveyard.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.graveyard.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.graveyard.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.graveyard.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.graveyard.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.graveyard.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.graveyard.enemies[randomIndex].shock;
			game.currentEnemy.imageURL = zones.graveyard.enemies[randomIndex].imageURL;
			game.currentEnemy.exp = zones.graveyard.enemies[randomIndex].expPts;
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
		if(game.zone === zones.castleEntrance.name){
			const randomIndex = Math.floor(Math.random()*zones.castleEntrance.enemies.length);
			game.currentEnemy.name = zones.castleEntrance.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.castleEntrance.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.castleEntrance.enemies[randomIndex].attack;
			game.currentEnemy.HP = zones.castleEntrance.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.castleEntrance.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.castleEntrance.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.castleEntrance.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.castleEntrance.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.castleEntrance.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.castleEntrance.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.castleEntrance.enemies[randomIndex].shock;
			game.currentEnemy.imageURL = zones.castleEntrance.enemies[randomIndex].imageURL;
			game.currentEnemy.exp = zones.castleEntrance.enemies[randomIndex].expPts;
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
		if(game.zone === zones.castleInterior.name){
			const randomIndex = Math.floor(Math.random()*zones.castleInterior.enemies.length);
			game.currentEnemy.name = zones.castleInterior.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.castleInterior.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.castleInterior.enemies[randomIndex].attack;
			game.currentEnemy.HP = zones.castleInterior.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.castleInterior.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.castleInterior.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.castleInterior.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.castleInterior.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.castleInterior.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.castleInterior.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.castleInterior.enemies[randomIndex].shock;
			game.currentEnemy.imageURL = zones.castleInterior.enemies[randomIndex].imageURL;
			game.currentEnemy.exp = zones.castleInterior.enemies[randomIndex].expPts;
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
		if(game.zone === zones.castleThroneRoom.name){
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
		}
	},
	enemyAttack(){
		let timer = 0;
		const pause = setInterval(function(){
			if(timer >= 1){
				clearInterval(pause);
				if(game.currentEnemy.burn === true){
					$($update).prepend(`<p style="color: orange">The enemy feels the burn and takes 1 point of damage.`);
					game.currentEnemy.HP--;
					$('#enemyHealth').text(game.currentEnemy.HP);
				}
				if(game.currentEnemy.HP <= 0){
					game.checkDeath();
				} else if(game.currentEnemy.shock === false){
					const dmg = Math.ceil(game.currentEnemy.strength - Math.floor(player.defense/2));
					if(dmg <= 1){
						player.currentHP--;
						$('#currentHP').text(player.currentHP);
						$('#hpBar').css('width', `${(player.currentHP/player.maxHP)*100}%`);
						$($update).prepend(`<p style="color: rgb(240,128,128)">The enemy attacks you with a ${game.currentEnemy.attack}! You take 1 point of damage.</p>`);
					} else if(player.currentHP - dmg <= 0){
						player.currentHP = 0;
						$('#currentHP').text(player.currentHP);
						$('#hpBar').css('width', `${(player.currentHP/player.maxHP)*100}%`);
						$($update).prepend(`<p style="color: rgb(240,128,128)">The enemy attacks you with a ${game.currentEnemy.attack}! You take ${dmg} points of damage.</p>`);
						game.checkDeath();
					} 
					else{
						player.currentHP -= dmg;
						$('#currentHP').text(player.currentHP);
						$('#hpBar').css('width', `${(player.currentHP/player.maxHP)*100}%`);
						$($update).prepend(`<p style="color: rgb(240,128,128)">The enemy attacks you with a ${game.currentEnemy.attack}! You take ${dmg} points of damage.</p>`);
					}
					if(player.currentMP < player.maxMP && player.currentHP > 0){
						player.currentMP += player.manaRegen;
						$('#currentMP').text(player.currentMP);
						$('#manaBar').css('width', `${(player.currentMP/player.maxMP)*100}%`);
					}
				} else{
					$($update).prepend(`<p style="color: rgb(218,112,214)">The enemy is in shock and can't attack this turn.</p>`);
					game.currentEnemy.shock = false;
					$('#shockedElement').remove();
				}
				playerToggle = true;
			}
			timer++;
		}, 800);
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
		}, 1200);
	},
	gameStart(){
		$('#enemyHealth').empty();
		$('#enemyWeakness').empty();
		$('#enemyDebuffs').empty();
		$($upperLeftButton).css('visibility', 'visible');
		$($upperRightButton).css('visibility', 'visible');
		$($lowerLeftButton).css('visibility', 'visible');
		if(startingZone === true || game.battleRound > game.totalNumBattleRounds){
			zones.changeZones();
			game.battleRound = 1
		}
		this.selectEnemy();
		$lowerRightButton.css('visibility', 'hidden');
		$lowerRightButton.text('');
		battleToggle = true;
		playerToggle = true;
		$('#battle-round').text(`Battle Round: ${game.battleRound}/${game.totalNumBattleRounds}`);
		$($update).prepend(`<p style="border-top: 1px white solid; color: white">An enemy ${game.currentEnemy.name} has appeared!`)
	},
	checkDeath(){
		let timer = 0;
		const pause = setInterval(function(){
			if(timer >= 1){
				clearInterval(pause);
				if(game.currentEnemy.HP <= 0){
					$lowerRightButton.text('Start');
					$lowerRightButton.css('visibility', 'visible');
					$('#enemy-image').css('background-image', 'url(images/enemies/defeated.png)');
					battleToggle = false;
					playerToggle = false;
					player.currentEXP += game.currentEnemy.exp;
					if(player.currentEXP >= player.levelUpEXP){
						$($update).prepend(`<p style="border-bottom: 1px black solid; color: green">You have defeated the enemy and gained ${game.currentEnemy.exp} experience points.</p>`);
						player.levelUp();
					} else{
						$($update).prepend(`<p style="color: green">You have defeated the enemy and gained ${game.currentEnemy.exp} experience points.</p>`);
						$($update).prepend(`<p style="border-bottom: 1px black solid; color: green"> ${player.levelUpEXP - player.currentEXP} point(s) until level up.</p>`);
					}
					if(player.currentMP < player.maxMP && player.currentHP > 0){
						player.currentMP += player.manaRegen;
						$('#currentMP').text(player.currentMP);
						$('#manaBar').css('width', `${(player.currentMP/player.maxMP)*100}%`);
					}
					$($upperLeftButton).css('visibility', 'hidden');
					$($upperRightButton).css('visibility', 'hidden');
					$($lowerLeftButton).css('visibility', 'hidden');
					game.battleRound++;
				}
				if(player.currentHP <= 0){
					$($update).prepend(`<p style="border-bottom:1px white solid; color: red">You have been slain.</p>`);
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
			}
			timer++;
		}, 800);
	},
	startOver(){
		let timer = 0;
		const pause = setInterval(function(){
			if(timer >= 1){
				gameOverToggle = false;
				clearInterval(pause);
				player.currentHP = player.maxHP;
				$('#currentHP').text(player.currentHP);
				$('#hpBar').css('width', `${(player.currentHP/player.maxHP)*100}%`);
				player.currentMP = player.maxMP;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(player.currentMP/player.maxMP)*100}%`);
				$('#enemy-image').css('height', '150px');
				$('#enemy-image').css('width', '150px');
				$lowerRightButton.text('');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerLeftButton.css('visibility', 'visible');
				$upperLeftButton.css('visibility', 'visible');
				$upperRightButton.css('visibility', 'visible');
				startingZone = true;
				game.battleRound = 1
				game.gameStart();
			}
			timer++;
		}, 500);
	}
}



