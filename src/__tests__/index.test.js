import Ship from '../ship.js';

describe('test ship', () => {
	const testShip = new Ship(5);

	test('create new ship object with length of 5', () => {
		expect(testShip).toEqual({ length: 5, hits: 0, sunk: false });
	});

	test('add 1 hit to ship', () => {
		testShip.hit();

		expect(testShip.hits).toBe(1);
	});

	test('ship is not sunk', () => {
		testShip.isSunk();

		expect(testShip.sunk).toBe(false);
	});

	test('ship is sunk', () => {
		for (let i = 0; i < 4; i++) {
			testShip.hit();
		}

		testShip.isSunk();

		expect(testShip.sunk).toBe(true);
	});
});
