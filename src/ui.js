const boardDiv = document.querySelector('.board-div');

function highlightSpace() {
	this.style.backgroundColor = 'grey';
}

function unHighlightSpace() {
	this.style.backgroundColor = 'white';
}

function highlightCompShips() {
    this.style.backgroundColor = 'green';
    this.removeEventListener('mouseover', highlightSpace);
	this.removeEventListener('mouseout', unHighlightSpace);
    for (let i = 0; i < this.locationArray.length; i++) {
        if (this.id === this.locationArray[i].toString()) {
            this.style.backgroundColor = 'red';
        }
    }
}

function addCompListeners(space, locArr) {
        space.locationArray = locArr;
        space.addEventListener('mouseover', highlightSpace);
        space.addEventListener('mouseout', unHighlightSpace);
        space.addEventListener('click', highlightCompShips);
}

function createBoardUI(labelText, classText, locArr) {
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
            addCompListeners(boardSpace, locArr);
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

function highlightPlayerShips(boardClass, locArr) {
	const playerBoard = document.querySelector(boardClass);
	const boardArr = Array.from(playerBoard.childNodes);

	for (let i = 0; i < boardArr.length; i++) {
		for (let j = 0; j < locArr.length; j++) {
			if (boardArr[i].id === locArr[j].toString()) {
				boardArr[i].style.backgroundColor = 'red';
			}
		}
	}
}

export { createBoardUI, getShipLocs, highlightPlayerShips };