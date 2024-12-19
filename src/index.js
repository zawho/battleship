import './style.css';
import Ship from './ship.js';
import Player from './player.js';
import createSetup from './setup-ui.js';
import {
	createBoardUI,
	getShipLocs,
	highlightPlayerShips,
	placeAllCompShips,
} from './ui.js';

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

humanPlayer.gameboard.placeHorizontal(0, humanPatrol);
humanPlayer.gameboard.placeVertical(8, humanSubmarine);
humanPlayer.gameboard.placeHorizontal(97, humanDestroyer);
humanPlayer.gameboard.placeVertical(20, humanBattleship);
humanPlayer.gameboard.placeHorizontal(33, humanCarrier);

// UI stuff

createSetup();

/* placeAllCompShips(pcPlayer, pcPatrol, pcSubmarine, pcDestroyer, pcBattleship, pcCarrier);

const playerShipLocs = getShipLocs(humanPlayer.gameboard.locations);
const compShipLocs = getShipLocs(pcPlayer.gameboard.locations);

createBoardUI('player', 'player-board', playerShipLocs);
createBoardUI(
	'computer',
	'comp-board',
	compShipLocs,
	pcPlayer.gameboard,
	humanPlayer.gameboard,
);

highlightPlayerShips('.player-board', playerShipLocs); */
