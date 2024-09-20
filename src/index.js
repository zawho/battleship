import './style.css';
import Ship from './ship.js';
import Board from './board.js';

const carrier = new Ship(5);
const battleship = new Ship(4);
const destroyer = new Ship(3);
const submarine = new Ship(3);
const patrol = new Ship(2);

export default carrier;
