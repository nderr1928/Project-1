//Global varibales being used
	const $clearLogButton = $('#clearlog');
	const $update = $('#updates'); 
	const $upperLeftButton = $('#upperleft-button');
	const $upperRightButton = $('#upperright-button');
	const $lowerLeftButton = $('#lowerleft-button');
	const $lowerRightButton = $('#lowerright-button');
	const $commandDescription = $('#commandDescription');
	const $startGame = $('#startGame');
	let magicToggle = false;
	let itemToggle = false;
	let battleToggle = false;
	let playerToggle = false;
	let gameOverToggle = false;
	let startingZone = true;
	let titleScreen = true;

	$('html').click(function(){
		if(titleScreen === true){
			$('#titleScreen').css('display', "none");
			titleScreen = false;
			$('#instructionsScreen').css('display', 'block');
		}
	})
	
	$($startGame).click(function(){
		$('#instructionsScreen').css('display', 'none');
		$('#gameScreen').css('display', 'grid');
	})

//Hover functions for all buttons
	//Top left
	$($upperLeftButton).hover(function(){
		if(magicToggle === false && itemToggle === false && battleToggle === true){
			$($commandDescription).text(`Attack the enemy`);
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true){
			$($commandDescription).text(`Deal ${player.fireSpellProperties.fireDmg} points of fire damage - ${player.fireSpellProperties.burnChance *100}% chance for burn (-1hp per turn)`);
		}
		}, function(){
			$($commandDescription).text('');
		}
	);

	$($upperLeftButton).on('touchstart', function(){
		if(magicToggle === false && itemToggle === false && battleToggle === true){
			$($commandDescription).text(`Attack the enemy`);
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true){
			$($commandDescription).text(`Deal ${player.fireSpellProperties.fireDmg} points of fire damage - ${player.fireSpellProperties.burnChance *100}% chance for burn (-1hp per turn)`);
		}
	});

	$($upperLeftButton).on('touchcancel', function(){
		console.log('event cancelled.');
		$($commandDescription).text(``);
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
			$($commandDescription).text(`Restore 50% of max HP (${Math.ceil(player.maxHP/2)} points)`);
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
			$($commandDescription).text(`Deal ${player.iceSpellProperties.iceDmg} points of ice damage - ${player.iceSpellProperties.frostbiteChance * 100}% chance of frostbite (enemy atk reduced by 10%)`);
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
			$($commandDescription).text(`Deal ${player.lightningSpellProperties.lightningDmg} points of lightning damage - ${player.lightningSpellProperties.shockChance * 100}% chance of shock (enemy cannot attack next turn)`);
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

	$('#playerLevel').hover(function(){
		console.log('hover');
		$('#displayStats').css('display', 'block');
		$('#displayStats').append(`<p style="color: white">Player Stats:</p>`);
		$('#displayStats').append(`<p style="color: rgb(135,206,235)">Level = ${player.level}`);
		$('#displayStats').append(`<p style="color: rgb(135,206,235)">Max HP = ${player.maxHP}</p>`);
		$('#displayStats').append(`<p style="color: rgb(135,206,235)">Max MP = ${player.maxMP}</p>`);
		$('#displayStats').append(`<p style="color: rgb(135,206,235)">Strength = ${player.strength}</p>`);
		$('#displayStats').append(`<p style="color: rgb(135,206,235)">Defense = ${player.defense}</p>`);
		$('#displayStats').append(`<p style="color: rgb(135,206,235)">MP Regen = ${player.manaRegen}</p>`);
		$('#displayStats').append(`<p style="color: orange">Fire spell:<br>Cost = ${player.fireSpellProperties.spellCost} MP<br>Damage: ${player.fireSpellProperties.fireDmg}<br>Burn Chance = ${Math.floor(player.fireSpellProperties.burnChance * 100)}%</p>`);
		$('#displayStats').append(`<p style="color: teal">Ice spell:<br>Cost = ${player.iceSpellProperties.spellCost} MP<br>Damage: ${player.iceSpellProperties.iceDmg}<br>Frostbite Chance = ${Math.floor(player.iceSpellProperties.frostbiteChance * 100)}%</p>`);
		$('#displayStats').append(`<p style="color: rgb(218,112,214)">Lightning spell:<br>Cost = ${player.lightningSpellProperties.spellCost} MP<br>Damage: ${player.lightningSpellProperties.lightningDmg}<br>Shock Chance = ${Math.floor(player.lightningSpellProperties.shockChance * 100)}%</p>`);
	}, function(){
		$('#displayStats').empty();
		$('#displayStats').css('display', 'none');
	})

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
			$upperLeftButton.text(`Fire (${player.fireSpellProperties.spellCost} MP)`);
			$upperRightButton.text('Return');
			$lowerLeftButton.text(`Ice (${player.iceSpellProperties.spellCost} MP)`);
			$lowerRightButton.css('visibility', 'visible');
			$lowerRightButton.text(`Lightning (${player.lightningSpellProperties.spellCost} MP)`);
		}
		if(magicToggle === false && itemToggle === true && battleToggle === true && playerToggle === true){
			player.healthPotion();
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
		if(magicToggle === false && itemToggle === false && battleToggle === false && playerToggle === false && gameOverToggle === true ){
			console.log('restart');
			game.startOver();
		}
		if(magicToggle === false && itemToggle === false && battleToggle === false && playerToggle === false && gameOverToggle === false){
			console.log('start');
			game.gameStart();
		}
		if(magicToggle === true && itemToggle === false && battleToggle === true && playerToggle === true){
			player.lightningSpell();
		}
		if(magicToggle === false && itemToggle === true && battleToggle === true && playerToggle === true){
			player.manaPotion();
		}
	});

//dblclcik return commands
	//Commands to return to main command screen from magic menu
	$($upperRightButton).on('dblclick', () => {
		if(magicToggle === true && itemToggle === false){
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
		constructor(name, strength, attack, hp, defense, fireWeakness, iceWeakness, lightningWeakness, exp, imageURL, height, width, topMargin){
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
			this.height = height;
			this.width = width;
			this.topMargin = topMargin;
		}
	}

	//Fields
	const rat = new enemies('Rat', 2, "bite", 8, 1, true, false, true, 1, 'url(images/enemies/rat.gif)', '150px', '150px', '160px');
	const snake = new enemies('Snake', 3, "bite", 10, 2, true, true, false, 2, 'url(images/enemies/snake.gif)', '150px', '225px', '160px' );
	//Cave entrance
	const caveGuard = new enemies('Cave Guard', 6, "Slash", 30, 4, false, false, true, 5, 'url(images/enemies/caveGuard.gif)', '268px', '150px', '80px' );
	//Cave
	const bat = new enemies('Bat', 4, "bite", 20, 2, false, false, true, 2, 'url(images/enemies/bat_fast.gif)', '160px', '185px', '145px');
	const slime = new enemies('Slime', 3, "goop", 25, 6, true, true, true, 4, 'url(images/enemies/slime.gif)', '160px', '160px', '160px');
	//Cave Exit
	const lich = new enemies ('Lich', 8, "soul sap", 35, 8, true, false, false, 8,  'url(images/enemies/lich.gif', '256px', '256px', '160px');
	//Graveyard
	const skeleton = new enemies('Skeleton Warrior', 6, "bone crusher", 26, 5, true, false, true, 6, 'url(images/enemies/skeleton.gif)', '200px', '164px', '150px' );
	const zombie = new enemies('Zombie', 4, "rotten punch", 30, 7, true, true, false, 6,  'url(images/enemies/zombie.gif)', '200px', '171px', '150px' );
	//Castle Entrance
	const ogre = new enemies('Castle Guard', 10, "club smash", 40, 7, false, true, true, 12,  'url(images/enemies/ogre.gif)', '300px', '300px', '120px' );
	//Castle Interior
	const assassin = new enemies('Demon Assassin', 12, "back stab", 40, 4, false, true, true, 20, 'url(images/enemies/demonAssassin.gif)', '210px', '200px', '160px' );
	const demon = new enemies('Demon', 15, "fire breath", 38, 6, false, true, false, 22,  'url(images/enemies/demon.gif)', '200px', '200px');
	//Throne Room
	const demonLord = new enemies('Demon Overlord', 25, "soul crusher", 60, 15, false, false, false, 100, 'url(images/enemies/demonLord.gif)', '373px', '400px', '90px');

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
		fireSpellProperties: {
			name: 'fireball',
			spellCost: 5,
			burnChance: 0.25,
			fireDmg: 4,
			imageURL: 'url(images/attacks/fireball.gif)',
			exp: 0,
			nextLvl: 2,
			checkProgress(){
				if(player.fireSpellProperties.exp >= player.fireSpellProperties.nextLvl){
					$($update).prepend('<p style="color: orange">Your fire spell has improved!</p>');
					player.fireSpellProperties.fireDmg++;
					player.fireSpellProperties.burnChance += 0.01;
					player.fireSpellProperties.spellCost++;
					$($update).prepend(`<p style="color: orange">Fire spell:<br>Cost = ${player.fireSpellProperties.spellCost} MP<br>Damage: ${player.fireSpellProperties.fireDmg}<br>Burn Chance = ${Math.floor(player.fireSpellProperties.burnChance * 100)}%</p>`);
					player.fireSpellProperties.nextLvl +=2;
				}
			}
		},
		iceSpellProperties: {
			name: 'blizzard',
			spellCost: 3,
			frostbiteChance: 0.25,
			iceDmg: 4,
			imageURL: 'url(images/attacks/ice.gif)',
			exp: 0,
			nextLvl: 2,
			checkProgress(){
				if(player.iceSpellProperties.exp >= player.iceSpellProperties.nextLvl){
					$($update).prepend('<p style="color: teal">Your ice spell has improved!</p>');
					player.iceSpellProperties.iceDmg++;
					player.iceSpellProperties.frostbiteChance += 0.01;
					player.iceSpellProperties.spellCost++;
					$($update).prepend(`<p style="color: teal">Ice spell:<br>Cost = ${player.iceSpellProperties.spellCost} MP<br>Damage: ${player.iceSpellProperties.iceDmg}<br>Frostbite Chance = ${Math.floor(player.iceSpellProperties.frostbiteChance * 100)}%</p>`);
					player.iceSpellProperties.nextLvl +=2;
				}
			}
		},
		lightningSpellProperties: {
			name: 'static',
			spellCost: 4,
			shockChance: 0.1,
			lightningDmg: 4,
			imageURL: 'url(images/attacks/lightning.gif)',
			exp: 0,
			nextLvl: 2,
			checkProgress(){
				if(player.lightningSpellProperties.exp >= player.lightningSpellProperties.nextLvl){
					$($update).prepend('<p style="color: rgb(218,112,214)">Your lightning spell has improved!</p>');
					player.lightningSpellProperties.lightningDmg++;
					player.lightningSpellProperties.shockChance += 0.01;
					player.lightningSpellProperties.spellCost++;
					$($update).prepend(`<p style="color: rgb(218,112,214)">Lightning spell:<br>Cost = ${player.lightningSpellProperties.spellCost} MP<br>Damage: ${player.lightningSpellProperties.lightningDmg}<br>Shock Chance = ${Math.floor(player.lightningSpellProperties.shockChance * 100)}%</p>`);
					player.lightningSpellProperties.nextLvl +=2;
				}
			}
		},
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
			if(player.level % 2 === 0){
				player.manaRegen++;
				$($update).prepend(`<p style="color: rgb(135,206,235)">MP Regen = ${player.manaRegen}</p>`);
			}
			$($update).prepend(`<p style="border-bottom: 1px white solid; color: green">EXP to next level: ${player.levelUpEXP - player.currentEXP}</p>`);
		},
		attack(){
			atkDmg = Math.ceil(player.strength + player.weaponAtk - Math.floor(game.currentEnemy.defense/2));
			game.battleAnimation('url(images/attacks/slash_slow.gif)')
			if(atkDmg <= 1){
				game.currentEnemy.HP--;
				$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
				$('#enemyCurrentHP').text(game.currentEnemy.HP);
				$($update).prepend(`<p style="color: rgb(135,206,235)">You attack the enemy and deal 1 point of damage.</p>`);
			} else if(game.currentEnemy.HP - atkDmg <= 0){
				game.currentEnemy.HP = 0;
				$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
				$('#enemyCurrentHP').text(game.currentEnemy.HP);
				$($update).prepend(`<p style="color: rgb(135,206,235)">You attack the enemy and deal ${atkDmg} points of damage.</p>`);
			} 
			else{
				game.currentEnemy.HP -= atkDmg;
				$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
				$('#enemyCurrentHP').text(game.currentEnemy.HP);
				$($update).prepend(`<p style="color: rgb(135,206,235)">You attack the enemy and deal ${atkDmg} points of damage.</p>`);
			}
			playerToggle = false;
			game.checkDeath();
			if(game.currentEnemy.HP > 0){
				game.enemyAttack();
			}
		},
		fireSpell(){
			if(player.currentMP < player.fireSpellProperties.spellCost){
				$($update).prepend(`<p style="color: white">Not enough MP to cast</p>`);
			} else{
				game.battleAnimation(player.fireSpellProperties.imageURL);
				player.fireSpellProperties.exp++;
				player.currentMP -= player.fireSpellProperties.spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				fireDmg = player.fireSpellProperties.fireDmg;
				if(game.currentEnemy.fireWeakness === true){
					fireDmg = Math.floor(fireDmg * 1.5);
				}
				if(game.currentEnemy.HP - fireDmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
					$('#enemyCurrentHP').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: orange">You cast ${player.fireSpellProperties.name} and deal ${fireDmg} points of damage.</p>`);
				} else{
					game.currentEnemy.HP -= fireDmg;
					$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
					$('#enemyCurrentHP').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: orange">You cast ${player.fireSpellProperties.name} and deal ${fireDmg} points of damage.</p>`);
				}
				if(Math.random() < player.fireSpellProperties.burnChance && game.currentEnemy.burn === false){
					game.currentEnemy.burn = true;
					$($update).prepend(`<p style="color: gold">The ${game.currentEnemy.name} has been burned.</p>`);
					$("#enemyDebuffs").append(`<img src="./images/icons/enemyBurnt.png" alt="Enemy Burnt">`);
				}
				player.fireSpellProperties.checkProgress();
				playerToggle = false;
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerRightButton.text('');
				game.checkDeath();
				if(game.currentEnemy.HP > 0){
					game.enemyAttack();
				}
			}
		},
		iceSpell(){
			if(player.currentMP < player.iceSpellProperties.spellCost){
				$($update).prepend(`<p style="color: white">Not enough MP to cast</p>`);
			} else{
				game.battleAnimation(player.iceSpellProperties.imageURL);
				player.iceSpellProperties.exp++;
				player.currentMP -= player.iceSpellProperties.spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				iceDmg = player.iceSpellProperties.iceDmg;
				if(game.currentEnemy.iceWeakness === true){
					iceDmg = Math.floor(iceDmg * 1.5);
				}
				if(game.currentEnemy.HP - iceDmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
					$('#enemyCurrentHP').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: teal">You used ${player.iceSpellProperties.name} and deal ${iceDmg} points of damage.</p>`);
				} else{
					game.currentEnemy.HP -= iceDmg;
					$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
					$('#enemyCurrentHP').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: teal">You used ${player.iceSpellProperties.name} and deal ${iceDmg} points of damage.</p>`);
				}
				if(Math.random() < player.iceSpellProperties.frostbiteChance && game.currentEnemy.frostbite === false){
					game.currentEnemy.frostbite = true;
					game.currentEnemy.defense = Math.floor(game.currentEnemy.defense * 0.9);
					$($update).prepend(`<p style="color: yellow">The ${game.currentEnemy.name} has become frostbitten.</p>`);
					$("#enemyDebuffs").append(`<img src="./images/icons/enemyFrostbite.png" alt="Enemy Frostbitten">`);
				}
				player.iceSpellProperties.checkProgress();
				playerToggle = false;
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerRightButton.text('');
				game.checkDeath();
				if(game.currentEnemy.HP > 0){
					game.enemyAttack();
				}
			}
		},
		lightningSpell(){
			if(player.currentMP < player.lightningSpellProperties.spellCost){
				$($update).prepend(`<p style="color: white">Not enough MP to cast</p>`);
			} else{
				game.battleAnimation(player.lightningSpellProperties.imageURL);
				player.lightningSpellProperties.exp++;
				player.currentMP -= player.lightningSpellProperties.spellCost;
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				lightningDmg = player.lightningSpellProperties.lightningDmg;
				if(game.currentEnemy.lightningWeakness === true){
					lightningDmg = Math.floor(lightningDmg * 1.5);
				}
				if(game.currentEnemy.HP - lightningDmg <= 0){
					game.currentEnemy.HP = 0;
					$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
					$('#enemyCurrentHP').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: rgb(218,112,214)">You used ${player.lightningSpellProperties.name} and deal ${lightningDmg} points of damage.</p>`);
				} else{
					game.currentEnemy.HP -= lightningDmg;
					$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
					$('#enemyCurrentHP').text(game.currentEnemy.HP);
					$($update).prepend(`<p style="color: rgb(218,112,214)">You used ${player.lightningSpellProperties.name} and deal ${lightningDmg} points of damage.</p>`);
				}
				if(Math.random() < player.lightningSpellProperties.shockChance && game.currentEnemy.shock === false){
					game.currentEnemy.shock = true;
					$($update).prepend(`<p style="color: yellow">The ${game.currentEnemy.name} is in shock.</p>`);
					$("#enemyDebuffs").append(`<img id="shockedElement" src="./images/icons/enemyShocked.png" alt="Enemy Shocked">`);
				}
				player.lightningSpellProperties.checkProgress();
				playerToggle = false;
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerRightButton.text('');
				game.checkDeath();
				if(game.currentEnemy.HP > 0){
					game.enemyAttack();
				}
			}
		},
		healthPotion(){
			if(this.healthPotions > 0 && this.currentHP < this.maxHP){
				if(Math.ceil(healthPotion.recovery * this.maxHP) + this.currentHP >= this.maxHP){
					$($update).prepend(`<p style="color: yellow">You use a health potion and regen ${player.maxHP - player.currentHP} health point(s).`);
					this.currentHP = this.maxHP;
				} else{
					$($update).prepend(`<p style="color: yellow">You use a health potion and regen ${Math.ceil(healthPotion.recovery * this.maxHP)} health points.`);
					this.currentHP += Math.ceil(healthPotion.recovery * this.maxHP);
				}
				$('#currentHP').text(player.currentHP);
				$('#hpBar').css('width', `${(this.currentHP/this.maxHP)*100}%`);
				this.healthPotions--;
				playerToggle = false;
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperLeftButton.css('visibility', 'visible');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerRightButton.text('');
				playerToggle = false;
				game.enemyAttack();
			} else {
				if(this.healthPotions === 0){
					$($update).prepend('<p style="color: white">You have no health potions left</p>')
				} else{
					$($update).prepend('<p style="color: white">Health is already at max</p>');
				}
			}
		},
		manaPotion(){
			if(this.manaPotions > 0 && this.currentMP < this.maxMP){
				if(Math.ceil(manaPotion.recovery * this.maxMP) + this.currentMP >= this.maxMP){
					$($update).prepend(`<p style="color: yellow">You use a mana potion and regen ${player.maxMP - player.currentMP} mana point(s).`);
					this.currentMP = this.maxMP;
				} else{
					$($update).prepend(`<p style="color: yellow">You use a mana potion and regen ${Math.ceil(healthPotion.recovery * this.maxMP)} mana points.`);
					this.currentMP += Math.ceil(healthPotion.recovery * this.maxMP);
				}
				$('#currentMP').text(player.currentMP);
				$('#manaBar').css('width', `${(this.currentMP/this.maxMP)*100}%`);
				this.manaPotions--;
				playerToggle = false;
				magicToggle = false;
				itemToggle = false;
				$upperLeftButton.text('Attack');
				$upperLeftButton.css('visibility','visible');
				$upperRightButton.text('Magic');
				$lowerLeftButton.text('Item');
				$lowerRightButton.css('visibility', 'hidden');
				$lowerRightButton.text('');
				playerToggle = false;
				game.enemyAttack();
			} else {
				if(this.manaPotions === 0){
						$($update).prepend('<p style="color: white">You have no mana potions left</p>')
				} else{
					$($update).prepend('<p style="color: white">Mana is already at max</p>');
				}
			}
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
		enemies: [lich],
		imageURL: 'url(images/backgrounds/caveExitBackground.jpg)'
	},
	graveyard: {
		name: 'Weeping Bones Necrofield',
		numBattles: 4,
		enemies: [skeleton, zombie],
		imageURL: 'url(images/backgrounds/graveyardBackground.jpeg)'
	},
	castleEntrance: {
		name: 'Castle to Hell Entrance',
		numBattles: 1,
		enemies: [ogre],
		imageURL: 'url(images/backgrounds/castleEntranceBackground.jpeg)'
	},
	castleInterior: {
		name: 'Castle to Hell',
		numBattles: 4,
		enemies: [assassin, demon],
		imageURL: 'url(images/backgrounds/castleBackground.jpeg)'
	},
	castleThroneRoom: {
		name: 'Castle to Hell Throne Room',
		numBattles: 1,
		enemies: [demonLord],
		imageURL: 'url(images/backgrounds/throneBackground2.jpg)'
	},
	changeZones(){
		if(startingZone === true){
			startingZone = false;
			alert(`You begin your journey by setting course through open fields to reach the Archway Caves. The enemies you will encounter are simple, but keep your guard up - you don't want the journey to end as soon as it has started.`);
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
			alert('You have defeated the guard and he allows you to pass. The journey through Archway Cave is on its way.');
			$('main').css('background-image', this.cave.imageURL);
			$('#zone-info').text(`Zone: ${this.cave.name}`);
			game.totalNumBattleRounds = this.cave.numBattles;
			game.zone = this.cave.name;
		}else if(game.zone === this.cave.name && startingZone === false){
			alert('You see the light of the moon shine through as you approach stairs. As you approach the stairs, a dark figure emerges from the shadows. Without a word it draws its sword and prepares to strike. Look alive!');
			$('main').css('background-image', this.caveExit.imageURL);
			$('#zone-info').text(`Zone: ${this.caveExit.name}`);
			game.totalNumBattleRounds = this.caveExit.numBattles;
			game.zone = this.caveExit.name;
		}else if(game.zone === this.caveExit.name && startingZone === false){
			alert(`You exit the cave to a green haze and the moon providing the only light. You see lines of tombstones and the restless undead walking around. The Castle to Hell lies just beyond`);
			$('main').css('background-image', this.graveyard.imageURL);
			$('#zone-info').text(`Zone: ${this.graveyard.name}`);
			game.totalNumBattleRounds = this.graveyard.numBattles;
			game.zone = this.graveyard.name;
		}else if(game.zone === this.graveyard.name && startingZone === false){
			alert(`Making it through the graveyard, you stumble across a fortress type castle. This must be the Castle to Hell. A giant ogre with a club starts charging at you, prepare for battle!`);
			$('main').css('background-image', this.castleEntrance.imageURL);
			$('#zone-info').text(`Zone: ${this.castleEntrance.name}`);
			game.totalNumBattleRounds = this.castleEntrance.numBattles;
			game.zone = this.castleEntrance.name;
		}else if(game.zone === this.castleEntrance.name && startingZone === false){
			alert(`You make it into the Castle to Hell. You must fight past the demons inside to get through the portal to fight the Demon Overlord!`);
			$('main').css('background-image', this.castleInterior.imageURL);
			$('#zone-info').text(`Zone: ${this.castleInterior.name}`);
			game.totalNumBattleRounds = this.castleInterior.numBattles;
			game.zone = this.castleInterior.name;
		}else if(game.zone === this.castleInterior.name && startingZone === false){
			alert(`You have finally made it to the Demon Overlord. He's expected you and prepared accordingly. It's now or never - time to end this!`);
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
		maxHP: null,
		HP: null,
		fireWeakness: null,
		iceWeakness: null,
		lightningWeakness: null,
		burn: null,
		frostbite: null,
		shock: null,
		exp: null,
		imageURL: null,
		height: null,
		width: null,
		topMargin: null
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
			game.currentEnemy.maxHP = zones.fields.enemies[randomIndex].HP;
			game.currentEnemy.HP = zones.fields.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.fields.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.fields.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.fields.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.fields.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.fields.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.fields.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.fields.enemies[randomIndex].shock;
			game.currentEnemy.exp = zones.fields.enemies[randomIndex].expPts;
			game.currentEnemy.imageURL = zones.fields.enemies[randomIndex].imageURL;
			game.currentEnemy.height = zones.fields.enemies[randomIndex].height;
			game.currentEnemy.width = zones.fields.enemies[randomIndex].width;
			game.currentEnemy.topMargin = zones.fields.enemies[randomIndex].topMargin;
			// $('#enemy-image').css('margin-top', game.currentEnemy.topMargin);
			$('#enemy-image').css('height', game.currentEnemy.height);
			$('#enemy-image').css('width', game.currentEnemy.width);
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyCurrentHP').text(`${game.currentEnemy.HP}`);
			$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/fireWeakness.png" alt="Fire Weakness">');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/iceWeakness.png" alt="Ice Weakness">');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/lightningWeakness.png" alt="Lightning Weakness">');
			}
		}
		if(game.zone === zones.caveEntrance.name){
			const randomIndex = Math.floor(Math.random()*zones.caveEntrance.enemies.length);
			game.currentEnemy.name = zones.caveEntrance.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.caveEntrance.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.caveEntrance.enemies[randomIndex].attack;
			game.currentEnemy.maxHP = zones.caveEntrance.enemies[randomIndex].HP;
			game.currentEnemy.HP = zones.caveEntrance.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.caveEntrance.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.caveEntrance.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.caveEntrance.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.caveEntrance.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.caveEntrance.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.caveEntrance.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.caveEntrance.enemies[randomIndex].shock;
			game.currentEnemy.exp = zones.caveEntrance.enemies[randomIndex].expPts;
			game.currentEnemy.imageURL = zones.caveEntrance.enemies[randomIndex].imageURL;
			game.currentEnemy.height = zones.caveEntrance.enemies[randomIndex].height;
			game.currentEnemy.width = zones.caveEntrance.enemies[randomIndex].width;
			game.currentEnemy.topMargin = zones.caveEntrance.enemies[randomIndex].topMargin;
			// $('#enemy-image').css('margin-top', game.currentEnemy.topMargin);
			$('#enemy-image').css('height', game.currentEnemy.height);
			$('#enemy-image').css('width', game.currentEnemy.width);
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyCurrentHP').text(`${game.currentEnemy.HP}`);
			$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/fireWeakness.png" alt="Fire Weakness">');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/iceWeakness.png" alt="Ice Weakness">');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/lightningWeakness.png" alt="Lightning Weakness">');
			}
		}
		if(game.zone === zones.cave.name){
			const randomIndex = Math.floor(Math.random()*zones.cave.enemies.length);
			game.currentEnemy.name = zones.cave.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.cave.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.cave.enemies[randomIndex].attack;
			game.currentEnemy.maxHP = zones.cave.enemies[randomIndex].HP;
			game.currentEnemy.HP = zones.cave.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.cave.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.cave.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.cave.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.cave.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.cave.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.cave.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.cave.enemies[randomIndex].shock;
			game.currentEnemy.exp = zones.cave.enemies[randomIndex].expPts;
			game.currentEnemy.imageURL = zones.cave.enemies[randomIndex].imageURL;
			game.currentEnemy.height = zones.cave.enemies[randomIndex].height;
			game.currentEnemy.width = zones.cave.enemies[randomIndex].width;
			game.currentEnemy.topMargin = zones.cave.enemies[randomIndex].topMargin;
			// $('#enemy-image').css('margin-top', game.currentEnemy.topMargin);
			$('#enemy-image').css('height', game.currentEnemy.height);
			$('#enemy-image').css('width', game.currentEnemy.width);
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyCurrentHP').text(`${game.currentEnemy.HP}`);
			$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/fireWeakness.png" alt="Fire Weakness">');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/iceWeakness.png" alt="Ice Weakness">');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/lightningWeakness.png" alt="Lightning Weakness">');
			}
		}
		if(game.zone === zones.caveExit.name){
			const randomIndex = Math.floor(Math.random()*zones.caveExit.enemies.length);
			game.currentEnemy.name = zones.caveExit.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.caveExit.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.caveExit.enemies[randomIndex].attack;
			game.currentEnemy.maxHP = zones.caveExit.enemies[randomIndex].HP;
			game.currentEnemy.HP = zones.caveExit.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.caveExit.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.caveExit.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.caveExit.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.caveExit.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.caveExit.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.caveExit.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.caveExit.enemies[randomIndex].shock;
			game.currentEnemy.exp = zones.caveExit.enemies[randomIndex].expPts;
			game.currentEnemy.imageURL = zones.caveExit.enemies[randomIndex].imageURL;
			game.currentEnemy.height = zones.caveExit.enemies[randomIndex].height;
			game.currentEnemy.width = zones.caveExit.enemies[randomIndex].width;
			game.currentEnemy.topMargin = zones.caveExit.enemies[randomIndex].topMargin;
			// $('#enemy-image').css('margin-top', game.currentEnemy.topMargin);
			$('#enemy-image').css('height', game.currentEnemy.height);
			$('#enemy-image').css('width', game.currentEnemy.width);
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyCurrentHP').text(`${game.currentEnemy.HP}`);
			$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/fireWeakness.png" alt="Fire Weakness">');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/iceWeakness.png" alt="Ice Weakness">');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/lightningWeakness.png" alt="Lightning Weakness">');
			}
		}
		if(game.zone === zones.graveyard.name){
			const randomIndex = Math.floor(Math.random()*zones.graveyard.enemies.length);
			game.currentEnemy.name = zones.graveyard.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.graveyard.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.graveyard.enemies[randomIndex].attack;
			game.currentEnemy.maxHP = zones.graveyard.enemies[randomIndex].HP;
			game.currentEnemy.HP = zones.graveyard.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.graveyard.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.graveyard.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.graveyard.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.graveyard.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.graveyard.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.graveyard.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.graveyard.enemies[randomIndex].shock;
			game.currentEnemy.exp = zones.graveyard.enemies[randomIndex].expPts;
			game.currentEnemy.imageURL = zones.graveyard.enemies[randomIndex].imageURL;
			game.currentEnemy.height = zones.graveyard.enemies[randomIndex].height;
			game.currentEnemy.width = zones.graveyard.enemies[randomIndex].width;
			game.currentEnemy.topMargin = zones.graveyard.enemies[randomIndex].topMargin;
			// $('#enemy-image').css('margin-top', game.currentEnemy.topMargin);
			$('#enemy-image').css('height', game.currentEnemy.height);
			$('#enemy-image').css('width', game.currentEnemy.width);
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyCurrentHP').text(`${game.currentEnemy.HP}`);
			$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/fireWeakness.png" alt="Fire Weakness">');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/iceWeakness.png" alt="Ice Weakness">');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/lightningWeakness.png" alt="Lightning Weakness">');
			}
		}
		if(game.zone === zones.castleEntrance.name){
			const randomIndex = Math.floor(Math.random()*zones.castleEntrance.enemies.length);
			game.currentEnemy.name = zones.castleEntrance.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.castleEntrance.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.castleEntrance.enemies[randomIndex].attack;
			game.currentEnemy.maxHP = zones.castleEntrance.enemies[randomIndex].HP;
			game.currentEnemy.HP = zones.castleEntrance.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.castleEntrance.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.castleEntrance.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.castleEntrance.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.castleEntrance.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.castleEntrance.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.castleEntrance.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.castleEntrance.enemies[randomIndex].shock;
			game.currentEnemy.exp = zones.castleEntrance.enemies[randomIndex].expPts;
			game.currentEnemy.imageURL = zones.castleEntrance.enemies[randomIndex].imageURL;
			game.currentEnemy.height = zones.castleEntrance.enemies[randomIndex].height;
			game.currentEnemy.width = zones.castleEntrance.enemies[randomIndex].width;
			game.currentEnemy.topMargin = zones.castleEntrance.enemies[randomIndex].topMargin;
			// $('#enemy-image').css('margin-top', game.currentEnemy.topMargin);
			$('#enemy-image').css('height', game.currentEnemy.height);
			$('#enemy-image').css('width', game.currentEnemy.width);
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyCurrentHP').text(`${game.currentEnemy.HP}`);
			$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/fireWeakness.png" alt="Fire Weakness">');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/iceWeakness.png" alt="Ice Weakness">');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/lightningWeakness.png" alt="Lightning Weakness">');
			}
		}
		if(game.zone === zones.castleInterior.name){
			const randomIndex = Math.floor(Math.random()*zones.castleInterior.enemies.length);
			game.currentEnemy.name = zones.castleInterior.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.castleInterior.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.castleInterior.enemies[randomIndex].attack;
			game.currentEnemy.maxHP = zones.castleInterior.enemies[randomIndex].HP;
			game.currentEnemy.HP = zones.castleInterior.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.castleInterior.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.castleInterior.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.castleInterior.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.castleInterior.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.castleInterior.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.castleInterior.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.castleInterior.enemies[randomIndex].shock;
			game.currentEnemy.exp = zones.castleInterior.enemies[randomIndex].expPts;
			game.currentEnemy.imageURL = zones.castleInterior.enemies[randomIndex].imageURL;
			game.currentEnemy.height = zones.castleInterior.enemies[randomIndex].height;
			game.currentEnemy.width = zones.castleInterior.enemies[randomIndex].width;
			game.currentEnemy.topMargin = zones.castleInterior.enemies[randomIndex].topMargin;
			// $('#enemy-image').css('margin-top', game.currentEnemy.topMargin);
			$('#enemy-image').css('height', game.currentEnemy.height);
			$('#enemy-image').css('width', game.currentEnemy.width);
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyCurrentHP').text(`${game.currentEnemy.HP}`);
			$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/fireWeakness.png" alt="Fire Weakness">');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/iceWeakness.png" alt="Ice Weakness">');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/lightningWeakness.png" alt="Lightning Weakness">');
			}
		}
		if(game.zone === zones.castleThroneRoom.name){
			const randomIndex = Math.floor(Math.random()*zones.castleThroneRoom.enemies.length);
			game.currentEnemy.name = zones.castleThroneRoom.enemies[randomIndex].name;
			game.currentEnemy.strength = zones.castleThroneRoom.enemies[randomIndex].strength;
			game.currentEnemy.attack = zones.castleThroneRoom.enemies[randomIndex].attack;
			game.currentEnemy.maxHP = zones.castleThroneRoom.enemies[randomIndex].HP;
			game.currentEnemy.HP = zones.castleThroneRoom.enemies[randomIndex].HP;
			game.currentEnemy.defense = zones.castleThroneRoom.enemies[randomIndex].defense;
			game.currentEnemy.fireWeakness = zones.castleThroneRoom.enemies[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = zones.castleThroneRoom.enemies[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = zones.castleThroneRoom.enemies[randomIndex].lightningWeakness;
			game.currentEnemy.burn = zones.castleThroneRoom.enemies[randomIndex].burn;
			game.currentEnemy.frostbite = zones.castleThroneRoom.enemies[randomIndex].frostbite;
			game.currentEnemy.shock = zones.castleThroneRoom.enemies[randomIndex].shock;
			game.currentEnemy.exp = zones.castleThroneRoom.enemies[randomIndex].expPts;
			game.currentEnemy.imageURL = zones.castleThroneRoom.enemies[randomIndex].imageURL;
			game.currentEnemy.height = zones.castleThroneRoom.enemies[randomIndex].height;
			game.currentEnemy.width = zones.castleThroneRoom.enemies[randomIndex].width;
			game.currentEnemy.topMargin = zones.castleThroneRoom.enemies[randomIndex].topMargin;
			// $('#enemy-image').css('margin-top', game.currentEnemy.topMargin);
			$('#enemy-image').css('height', game.currentEnemy.height);
			$('#enemy-image').css('width', game.currentEnemy.width);
			$('#enemy-image').css('background-image', game.currentEnemy.imageURL);
			$('#enemyCurrentHP').text(`${game.currentEnemy.HP}`);
			$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
			if(game.currentEnemy.fireWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/fireWeakness.png" alt="Fire Weakness">');
			}
			if(game.currentEnemy.iceWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/iceWeakness.png" alt="Ice Weakness">');
			}
			if(game.currentEnemy.lightningWeakness === true){
				$('#enemyWeakness').append('<img src="./images/icons/lightningWeakness.png" alt="Lightning Weakness">');
			}
		}
	},
	enemyAttack(){
		let timer = 0;
		const pause = setInterval(function(){
			if(timer >= 1){
				clearInterval(pause);
				if(game.currentEnemy.burn === true && game.currentEnemy.HP > 0){
					$($update).prepend(`<p style="color: orange">The enemy feels the burn and takes 1 point of damage.`);
					game.currentEnemy.HP--;
					$('#enemyHpBar').css('width', `${(game.currentEnemy.HP/game.currentEnemy.maxHP)*100}%`);
				}
				if(game.currentEnemy.HP <= 0){
					game.checkDeath();
				} else if(game.currentEnemy.shock === false && game.currentEnemy.HP > 0){
					const dmg = Math.ceil(game.currentEnemy.strength - Math.floor(player.defense/2));
					$('#shockedElement').remove();
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
		// $('#enemyHealth').empty();
		$('#enemyHealth').css('display', 'flex')
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
					$('#enemy-image').css('height', '193px');
					$('#enemy-image').css('width', '200px');
					$('#enemy-image').css('background-image', 'url(images/enemies/defeated.png)');
					battleToggle = false;
					playerToggle = false;
					player.currentEXP += game.currentEnemy.exp;
					if(player.currentEXP >= player.levelUpEXP){
						$($update).prepend(`<p style="border-bottom: 1px white solid; color: green">You have defeated the enemy and gained ${game.currentEnemy.exp} experience point(s).</p>`);
						player.levelUp();
					} else{
						$($update).prepend(`<p style="color: green">You have defeated the enemy and gained ${game.currentEnemy.exp} experience point(s).</p>`);
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
					$('#enemyWeakness').empty();
					$('#enemyDebuffs').empty();
					$('#enemyHealth').css('display', 'none')
					gameOverToggle = true;
					battleToggle = false;
					playerToggle = false;
					magicToggle = false;
					itemToggle = false;
					$lowerRightButton.css('visibility', 'visible');
					$lowerRightButton.text('Start Over');
					$lowerLeftButton.css('visibility', 'hidden');
					$upperLeftButton.css('visibility', 'hidden');
					$upperRightButton.css('visibility', 'hidden');
				}
				game.gameWon();	
			}
			timer++;
		}, 800);
	},
	startOver(){
		let timer = 0;
		$lowerRightButton.css('visibility', 'hidden');
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
				// $('#enemy-image').css('margin-top', '160px');
				$lowerRightButton.text('');
				$lowerLeftButton.css('visibility', 'visible');
				$upperLeftButton.css('visibility', 'visible');
				$upperRightButton.css('visibility', 'visible');
				startingZone = true;
				game.battleRound = 1
				game.gameStart();
			}
			timer++;
		}, 500);
	},
	gameWon(){
		if(game.currentEnemy.HP <= 0 && game.zone === 'Castle to Hell Throne Room'){
			alert(`Congratulations, you have defeated the Demon Overlord and are deemed a Master Wizard! You can fight the Demon Overlord again with all bonus' from the final battle, or you can refresh the page and start completely over!`);
		}
	}
}



