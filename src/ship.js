class Ship {
	constructor(length) {
		this.length = length;
		this.hits = 0;
		this.sunk = false;
	}

	hit() {
		this.hits += 1;
		return this;
	}

	isSunk() {
		if (this.hits >= this.length) {
			this.sunk = true;
		}
		return this;
	}
}

export default Ship;
