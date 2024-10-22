function highlightSpace() {
	this.style.backgroundColor = 'grey';
}

function unHighlightSpace() {
	this.style.backgroundColor = 'white';
}

function getRandNum(spacesArr) {
	let randNum = Math.floor(Math.random() * 100);
	let repeatedNum = false;

	for (let i = 0; i < spacesArr.length; i++) {
		if (randNum === spacesArr[i]) {
			repeatedNum = true;
		}
	}

	if (repeatedNum === false) {
		return randNum;
	} else {
		return getRandNum(spacesArr);
	}
}

function compTurn() {
	const playerBoard = document.querySelector('.player-board');
	const boardArr = Array.from(playerBoard.childNodes);
	const randNum = getRandNum(playerBoard.playedSpaces);

	setTimeout(() => {
		for (let i = 0; i < boardArr.length; i++) {
			if (
				boardArr[i].id === randNum.toString() &&
				boardArr[i].style.backgroundColor != 'red'
			) {
				boardArr[i].style.backgroundColor = 'green';
				playerBoard.playedSpaces.push(randNum);
			} else if (
				boardArr[i].id === randNum.toString() &&
				boardArr[i].style.backgroundColor === 'red'
			) {
				boardArr[i].style.backgroundColor = 'black';
				playerBoard.playedSpaces.push(randNum);
			}
		}
	}, 1000);
}

function addCompListeners(space, locArr, boardObj) {
	const playerBoard = document.querySelector('.player-board');
	playerBoard.playedSpaces = [];
	space.addEventListener('mouseover', highlightSpace);
	space.addEventListener('mouseout', unHighlightSpace);
	space.addEventListener('click', compTurn);
	space.addEventListener('click', () => {
		space.style.pointerEvents = 'none';
		boardObj.receiveAttack(Number(space.id));
		space.style.backgroundColor = 'green';
		space.removeEventListener('mouseover', highlightSpace);
		space.removeEventListener('mouseout', unHighlightSpace);
		for (let i = 0; i < locArr.length; i++) {
			if (space.id === locArr[i].toString()) {
				space.style.backgroundColor = 'red';
			}
		}
	});
}

function createBoardUI(labelText, classText, locArr, boardObj) {
	const boardDiv = document.querySelector('.board-div');
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
			addCompListeners(boardSpace, locArr, boardObj);
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

export { createBoardUI, getShipLocs, highlightPlayerShips, compTurn };
