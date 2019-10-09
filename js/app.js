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
			if(player.currentMP < player.maxMP){
				player.currentMP += player.manaRegen;
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
				if(player.currentMP < player.maxMP){
					player.currentMP += player.manaRegen;
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
				if(player.currentMP < player.maxMP){
					player.currentMP += player.manaRegen;
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
				if(player.currentMP < player.maxMP){
					player.currentMP += player.manaRegen;
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
	zone: "Cave",
	selectEnemy(){
		if(game.zone === 'Fields'){
			const randomIndex = Math.floor(Math.random()*field.length);
			game.currentEnemy.name = field[randomIndex].name;
			game.currentEnemy.strength = field[randomIndex].strength;
			game.currentEnemy.attack = field[randomIndex].attack;
			game.currentEnemy.HP = field[randomIndex].HP;
			game.currentEnemy.defense = field[randomIndex].defense;
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
			$($update).prepend(`<p>An enemy ${fields[randomIndex].name} has appeared!`);
		}
		if(game.zone === 'Cave'){
			const randomIndex = Math.floor(Math.random()*cave.length);
			game.currentEnemy.name = cave[randomIndex].name;
			game.currentEnemy.strength = cave[randomIndex].strength;
			game.currentEnemy.attack = cave[randomIndex].attack;
			game.currentEnemy.HP = cave[randomIndex].HP;
			game.currentEnemy.defense = cave[randomIndex].defense;
			game.currentEnemy.fireWeakness = cave[randomIndex].fireWeakness;
			game.currentEnemy.iceWeakness = cave[randomIndex].iceWeakness;
			game.currentEnemy.lightningWeakness = cave[randomIndex].lightningWeakness;
			game.currentEnemy.burn = cave[randomIndex].burn;
			game.currentEnemy.frostbite = cave[randomIndex].frostbite;
			game.currentEnemy.shock = cave[randomIndex].shock;
			game.currentEnemy.imageURL = cave[randomIndex].imageURL;
			game.currentEnemy.exp = cave[randomIndex].expPts;
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