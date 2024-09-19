import Ship from '../ship.js';

test('new ship with length of 5', () => {
	expect(new Ship(5)).toEqual({ length: 5, hits: 0, sunk: false });
});

test('add 1 hit', () => {
	expect(new Ship(5).hit()).toEqual({ length: 5, hits: 1, sunk: false });
});
