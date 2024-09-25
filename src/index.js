import './style.css';
import Ship from './ship.js';
import Board from './board.js';

const carrier = new Ship('carrier', 5);
const battleship = new Ship('battleship', 4);
const destroyer = new Ship('destroyer', 3);
const submarine = new Ship('submarine', 3);
const patrol = new Ship('patrol', 2);

const testBoard = new Board();

testBoard.placeHorizontal(10, carrier);

console.log(testBoard.locations);
