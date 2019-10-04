const $clearLogButton = $('#clearlog');
const $update = $('#updates'); 



class enemies{
	constructor(name){
		this.name = name;
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
	strength: 3,
	defense: 3,
	attack(){
		$($update).prepend('<p>You attack the enemy!</p>');
	}
}

$($clearLogButton).on('click', (e) => {
	console.log('clear');
	$($update).empty();
});