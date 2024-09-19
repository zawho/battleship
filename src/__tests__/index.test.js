import Ship from '../ship.js';

test('create new ship object with length of 5', () => {
	expect(new Ship(5)).toEqual({ length: 5, hits: 0, sunk: false });
});

test('add 1 hit to ship', () => {
	const testShip = new Ship(5);

	testShip.hit();

	expect(testShip.hits).toBe(1);
});

test('sink the ship', () => {
	const testShip = new Ship(5);

	for (let i = 0; i < 5; i++) {
		testShip.hit();
	}

	testShip.isSunk();

	expect(testShip.sunk).toBe(true);
});
