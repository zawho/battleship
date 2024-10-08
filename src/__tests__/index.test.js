import Ship from '../ship.js';
import Board from '../board.js';

describe('test ship', () => {
	const testShip = new Ship('testShip', 5);

	test('create new ship object with length of 5', () => {
		expect(testShip).toEqual({
			name: 'testShip',
			length: 5,
			hits: 0,
			sunk: false,
		});
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
		expect(testBoard.list.length).toBe(100);
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

describe('test ship placement', () => {
	const placeBoard = new Board();
	const horizShip = new Ship('horizShip', 5);
	const vertShip = new Ship('vertShip', 4);

	test('return spaces for horizontal placement of length 5 ship', () => {
		expect(placeBoard.placeHorizontal(10, horizShip)).toEqual([
			10, 11, 12, 13, 14,
		]);
	});

	test('ship does not fit in row, returns undefined', () => {
		expect(placeBoard.placeHorizontal(16, horizShip)).toBe(undefined);
	});

	test('return spaces for vertical placement of length 5 ship', () => {
		expect(placeBoard.placeVertical(25, vertShip)).toEqual([25, 35, 45, 55]);
	});

	test('ship does not fit in column, returns undefined', () => {
		expect(placeBoard.placeVertical(72, vertShip)).toBe(undefined);
	});

	test('board.locations object contains ship placements', () => {
		expect(placeBoard.locations).toEqual({
			horizShip: [10, 11, 12, 13, 14],
			vertShip: [25, 35, 45, 55],
		});
	});

	test('board.placedShips object contains ship placements', () => {
		expect(placeBoard.placedShips).toEqual({
			horizShip: horizShip,
			vertShip: vertShip,
		});
	});
});

describe('test attacks', () => {
	const attackBoard = new Board();
	const attackShip = new Ship('attackShip', 5);
	const secondAttackShip = new Ship('secondAttackShip', 4);
	attackBoard.placeHorizontal(10, attackShip);
	attackBoard.placeVertical(25, secondAttackShip);

	test('horizontal ship is attacked', () => {
		expect(attackBoard.receiveAttack(12)).toBe(true);
	});

	test('vertical ship is attacked', () => {
		expect(attackBoard.receiveAttack(45)).toBe(true);
	});

	test('attack missed', () => {
		expect(attackBoard.receiveAttack(15)).toBe(false);
	});

	test('attack missed', () => {
		expect(attackBoard.receiveAttack(2)).toBe(false);
	});

	test('attacked ship accrues 1 hit', () => {
		expect(attackShip.hits).toBe(1);
	});

	test('missed attack is logged', () => {
		expect(attackBoard.missed).toBe(2);
	});

	test('missed attack coords are logged', () => {
		expect(attackBoard.missedCoords).toEqual([15, 2]);
	});
});

describe('test for all ships sunk', () => {
	const sunkBoard = new Board();
	const sunkShip = new Ship('sunkShip', 5);
	const secondSunkShip = new Ship('secondSunkShip', 4);
	sunkBoard.placeHorizontal(10, sunkShip);
	sunkBoard.placeVertical(25, secondSunkShip);

	sunkBoard.receiveAttack(10);
	sunkBoard.receiveAttack(11);
	sunkBoard.receiveAttack(12);
	sunkBoard.receiveAttack(13);
	sunkBoard.receiveAttack(14);

	sunkBoard.receiveAttack(25);
	sunkBoard.receiveAttack(35);
	sunkBoard.receiveAttack(45);
	sunkBoard.receiveAttack(55);

	test('All ships sunk returns true', () => {
		expect(sunkBoard.checkSunk()).toBe(true);
	});
});
