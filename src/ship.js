function capitalize(string) {
	const firstLetter = string.charAt(0).toUpperCase();
    console.log(firstLetter + string.slice(1));
	return firstLetter + string.slice(1);
}

export default capitalize;