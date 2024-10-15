import './style.css';
import Ship from './ship.js';
import Player from './player.js';
import { createBoardUI, getShipLocs, highlightShips }from './ui.js';

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
humanPlayer.gameboard.placeHorizontal(12, humanDestroyer);
humanPlayer.gameboard.placeVertical(20, humanBattleship);
humanPlayer.gameboard.placeHorizontal(33, humanCarrier);

pcPlayer.gameboard.placeVertical(50, pcPatrol);
pcPlayer.gameboard.placeHorizontal(54, pcSubmarine);
pcPlayer.gameboard.placeVertical(67, pcDestroyer);
pcPlayer.gameboard.placeHorizontal(72, pcBattleship);
pcPlayer.gameboard.placeVertical(8, pcCarrier);


// UI stuff

createBoardUI('player-board', 'player');
createBoardUI('comp-board', 'computer');

const playerShipLocs = getShipLocs(humanPlayer.gameboard.locations);
const compShipLocs = getShipLocs(pcPlayer.gameboard.locations);

highlightShips('.player-board', playerShipLocs);
highlightShips('.comp-board', compShipLocs);

// console.log(humanPlayer.gameboard.locations);
// console.log(pcPlayer.gameboard.locations);