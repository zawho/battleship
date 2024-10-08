import Ship from './ship.js';

class Board {
	constructor() {
		this.list = [];
		this.locations = {};
		this.placedShips = {};
		this.missed = 0;
		this.missedCoords = [];

		for (let i = 0; i < 100; i++) {
			this.list.push([]);
		}

		for (let i = 0; i < this.list.length; i++) {
			const up = i - 10;
			const left = i - 1;
			const right = i + 1;
			const down = i + 10;

			if (up >= 0) {
				this.list[i].push(up);
			}

			if (left >= 0) {
				this.list[i].push(left);
			}

			if (right <= this.list.length - 1) {
				this.list[i].push(right);
			}

			if (down <= this.list.length - 1) {
				this.list[i].push(down);
			}
		}
	}

	placeHorizontal(start, ship) {
		const shipLoc = [];
		const remainder = start % 10;
		const rowEnd = start - remainder + 9;

		for (let i = 0; i < ship.length; i++) {
			shipLoc.push(start++);
		}

		for (let i = 0; i <= shipLoc.length; i++) {
			if (shipLoc[i] === rowEnd && i != shipLoc.length - 1) {
				return undefined;
			}
		}

		this.placedShips[ship.name] = ship;
		this.locations[ship.name] = shipLoc;
		return shipLoc;
	}

	placeVertical(start, ship) {
		const shipLoc = [];

		shipLoc.push(start);

		for (let i = 0; i < ship.length - 1; i++) {
			start += 10;
			shipLoc.push(start);
		}

		for (let i = 0; i <= shipLoc.length; i++) {
			if (shipLoc[i] - (shipLoc[i] % 10) === 90 && i != shipLoc.length - 1) {
				return undefined;
			}
		}

		this.placedShips[ship.name] = ship;
		this.locations[ship.name] = shipLoc;
		return shipLoc;
	}

	findShip(shipName) {
		for (let [key, value] of Object.entries(this.placedShips)) {
			if (value.name === shipName) {
				return value;
			}
		}
	}

	receiveAttack(coords) {
		let hitShip;
		for (let [key, value] of Object.entries(this.locations)) {
			for (let i = 0; i < value.length; i++) {
				if (value[i] === coords) {
					hitShip = this.findShip(key);
					hitShip.hit();
					hitShip.isSunk();
					return true;
				}
			}
		}
		this.missed += 1;
		this.missedCoords.push(coords);
		return false;
	}

	checkSunk() {
		for (let [key, value] of Object.entries(this.placedShips)) {
			if (value.sunk === false) {
				return false;
			}
		}
		return true;
	}
}

export default Board;
