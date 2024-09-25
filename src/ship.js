class Ship {
	constructor(name, length) {
		this.name = name;
		this.length = length;
		this.hits = 0;
		this.sunk = false;
	}

	hit() {
		this.hits += 1;
	}

	isSunk() {
		if (this.hits >= this.length) {
			this.sunk = true;
		}
	}
}

export default Ship;
