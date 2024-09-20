import Ship from '../ship.js';
import Board from '../board.js';

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

describe('test game board', () => {
	const testBoard = new Board();

	test('create 2D game board array with length 100', () => {
		expect(testBoard.list.length).toEqual(100);
	});

	test('board array at index 0 equals [1, 10]', () => {
		expect(testBoard.list[0]).toEqual([1, 10]);
	});

	test('board array at index 12 equals [2, 11, 13, 22]', () => {
		expect(testBoard.list[12]).toEqual([2, 11, 13, 22]);
	});

	test('board array at index 99 equals [89, 98]', () => {
		expect(testBoard.list[99]).toEqual([89, 98]);
	});
});
