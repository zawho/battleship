class Board {
	constructor() {
		this.list = [];
		this.locations = {};

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

		this.locations[ship.name] = shipLoc;
		return shipLoc;
	}

	receiveAttack(coords) {
		for (let [key, value] of Object.entries(this.locations)) {
			for (let i = 0; i < value.length; i++) {
				if (value[i] === coords) {
					return true;
				}
			}
		}
		return false;
	}
}

export default Board;
