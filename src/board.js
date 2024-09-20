class Board {
	constructor() {
		this.list = [];

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

		for (let i = 0; i <= ship.length; i++) {
			shipLoc.push(start++);
		}

		return shipLoc;
	}
}

export default Board;
