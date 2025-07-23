import Ship from './ship.js';
import Player from './player.js';
import {
	createBoardUI,
	getShipLocs,
	highlightPlayerShips,
	placeAllCompShips,
} from './ui.js';

function placePlayerShip(board, player, ship) {
    const shipName = ship.name.slice(5).toLowerCase();

    for (let [key, value] of Object.entries(board.allShips)) {
		if (shipName === key) {
			if (value[1] === value[0] + 1) {
            	player.gameboard.placeHorizontal(value[0], ship);
        	} else if(value[1] === value[0] - 1) {
            	player.gameboard.placeHorizontal(value[value.length - 1], ship);
        	}else if (value[1] === value[0] + 10) {
            	player.gameboard.placeVertical(value[0], ship);
        	} else if (value[1] === value[0] - 10) {
            	player.gameboard.placeVertical(value[value.length - 1], ship);
        	}
		}
	}

}

function startGame() {
    const setupDiv = document.querySelector('.setup-div');
	const gameDiv = document.querySelector('.board-div');
    const setupBoard = document.querySelector('.setup-board');
	 if (setupDiv.childNodes.length > 4) {
		setupDiv.removeChild(setupDiv.lastChild);
	 }

	for (let [key, value] of Object.entries(setupBoard.allShips)) {
		if (value.length === 0) {
			const setupAlertDiv = document.createElement('div');
			setupAlertDiv.className = 'setup-alert';
			setupAlertDiv.innerText = 'FINISH SHIP PLACEMENT'
			setupDiv.appendChild(setupAlertDiv);
			return;
		}
		setupDiv.style.display = 'none';
		gameDiv.style.display = 'grid';
		gameDiv.style.justifyItems = 'center';
	 }
    
	const humanPlayer = new Player('human');
	const pcPlayer = new Player('computer');

	const humanCarrier = new Ship('humanCarrier', 5);
	const humanBattleship = new Ship('humanBattleship', 4);
	const humanDestroyer = new Ship('humanDestroyer', 3);
	const humanSubmarine = new Ship('humanSubmarine', 3);
	const humanPatrol = new Ship('humanPatrol', 2);

	const pcCarrier = new Ship('pcCarrier', 5);
	const pcBattleship = new Ship('pcBattleship', 4);
	const pcDestroyer = new Ship('pcDestroyer', 3);
	const pcSubmarine = new Ship('pcSubmarine', 3);
	const pcPatrol = new Ship('pcPatrol', 2);

    placePlayerShip(setupBoard, humanPlayer, humanPatrol);
	placePlayerShip(setupBoard, humanPlayer, humanSubmarine);
	placePlayerShip(setupBoard, humanPlayer, humanDestroyer);
	placePlayerShip(setupBoard, humanPlayer, humanBattleship);
	placePlayerShip(setupBoard, humanPlayer, humanCarrier);

	placeAllCompShips(pcPlayer, pcPatrol, pcSubmarine, pcDestroyer, pcBattleship, pcCarrier);

	const playerShipLocs = getShipLocs(humanPlayer.gameboard.locations);
	const compShipLocs = getShipLocs(pcPlayer.gameboard.locations);

	createBoardUI('PLAYER', 'player-board', playerShipLocs);
	createBoardUI(
	'COMPUTER',
	'comp-board',
	compShipLocs,
	pcPlayer.gameboard,
	humanPlayer.gameboard,
	);

	highlightPlayerShips('.player-board', playerShipLocs);
}

export default startGame;