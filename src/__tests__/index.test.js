import carrier from "../index.js";

test('object assignment', () => {
	expect(carrier).toEqual({length: 5, hits: 0, sunk: false});
});