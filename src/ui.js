const boardDiv = document.querySelector('.board-div');

function highlightSpace() {
	this.style.backgroundColor = 'grey';
}

function unHighlightSpace() {
	this.style.backgroundColor = 'white';
}

function createBoardUI(classText, labelText) {
	const boardLabel = document.createElement('div');
	boardLabel.className = 'board-label';
	boardLabel.innerText = labelText;
	const board = document.createElement('div');
	board.className = classText;
	boardDiv.appendChild(boardLabel);
	boardDiv.appendChild(board);
	for (let i = 0; i < 100; i++) {
		const boardSpace = document.createElement('div');
		boardSpace.className = 'board-space';
		boardSpace.id = i;
		if (classText === 'comp-board') {
			boardSpace.addEventListener('mouseover', highlightSpace);
			boardSpace.addEventListener('mouseout', unHighlightSpace);
		}
		board.appendChild(boardSpace);
	}
}

function getShipLocs(shipLocations) {
	const locationArr = [];
	for (let [key, value] of Object.entries(shipLocations)) {
		for (let i = 0; i < value.length; i++) {
			locationArr.push(value[i]);
		}
	}
	return locationArr;
}

function highlightShips(boardClass, locArr) {
	const playerBoard = document.querySelector(boardClass);
	const boardArr = Array.from(playerBoard.childNodes);

	for (let i = 0; i < boardArr.length; i++) {
		for (let j = 0; j < locArr.length; j++) {
			if (boardArr[i].id === locArr[j].toString()) {
				boardArr[i].style.backgroundColor = 'green';
			}
		}
	}
}

export { createBoardUI, getShipLocs, highlightShips };