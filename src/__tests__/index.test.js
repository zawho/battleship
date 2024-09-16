import capitalize from "../ship.js";

test('capitalizes "hello" as "Hello"', () => {
	expect(capitalize('hello')).toBe('Hello');
});