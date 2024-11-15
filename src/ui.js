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

function isPlayed(adjacentNum, playedSpaces) {
	for (let i = 0; i < playedSpaces.length; i++) {
		if (adjacentNum === playedSpaces[i]) {
			return true;
		}
	}

	return false;
}

// Next: prevent horizontal adjacent play if ship is on left or right board edge
// Next next: factor in checking ship numbers to account for adjacent, separate ships.

function checkVertHits(board, current, up, down) {
	if ((current > 9 && board[up].style.backgroundColor === 'black') ||
		(current < 90 && board[down].style.backgroundColor === 'black')
	) {
		return false;
	}
	return true;
}

function checkHorizHits(board, current, forward, back) {
	if ((current < 99 && board[forward].style.backgroundColor === 'black') ||
		(current > 0 && board[back].style.backgroundColor === 'black')
	) {
		return false;
	}
	return true;
}

function getAdjacentSpace(playerBoard, playedSpaces) {
	let adjacentNum;

	for (let i = 0; i < playerBoard.length; i++) {
		const nextSpace = parseInt(playerBoard[i].id) + 1;
		const lastSpace = parseInt(playerBoard[i].id) - 1;
		const downSpace = parseInt(playerBoard[i].id) + 10;
		const upSpace = parseInt(playerBoard[i].id) - 10;
		if (
			nextSpace <= 99 &&
			playerBoard[i].style.backgroundColor === 'black' &&
			checkVertHits(playerBoard, i, upSpace, downSpace) === true &&
			isPlayed(nextSpace, playedSpaces) === false
		) {
			adjacentNum = nextSpace;
		} else if (
			lastSpace >= 0 &&
			playerBoard[i].style.backgroundColor === 'black' &&
			checkVertHits(playerBoard, i, upSpace, downSpace) === true &&
			isPlayed(lastSpace, playedSpaces) === false
		) {
			adjacentNum = lastSpace;
		} else if (
			downSpace <= 99 &&
			playerBoard[i].style.backgroundColor === 'black' &&
			checkHorizHits(playerBoard, i, nextSpace, lastSpace) === true &&
			isPlayed(downSpace, playedSpaces) === false
		) {
			adjacentNum = downSpace;
		} else if (
			upSpace >= 0 &&
			playerBoard[i].style.backgroundColor === 'black' &&
			checkHorizHits(playerBoard, i, nextSpace, lastSpace) === true &&
			isPlayed(upSpace, playedSpaces) === false
		) {
			adjacentNum = upSpace;
		}
	}

	return adjacentNum;
}

function attackplayerBoard(
	playerBoardObj,
	playedSpacesArr,
	compBoard,
	boardArr,
) {
	compBoard.style.pointerEvents = 'none';

	const adjacentNum = getAdjacentSpace(boardArr, playedSpacesArr);
	const randNum = getRandNum(playedSpacesArr);
	let spaceNum;

	if (adjacentNum != undefined) {
		spaceNum = adjacentNum;
	} else {
		spaceNum = randNum;
	}

	playerBoardObj.receiveAttack(spaceNum);

	setTimeout(() => {
		for (let i = 0; i < boardArr.length; i++) {
			if (
				boardArr[i].id === spaceNum.toString() &&
				boardArr[i].style.backgroundColor != 'red'
			) {
				boardArr[i].style.backgroundColor = 'green';
				playedSpacesArr.push(spaceNum);
			} else if (
				boardArr[i].id === spaceNum.toString() &&
				boardArr[i].style.backgroundColor === 'red'
			) {
				boardArr[i].style.backgroundColor = 'black';
				playedSpacesArr.push(spaceNum);
			}
		}
		compBoard.style.pointerEvents = 'auto';
	}, 1);
}

function attackCompBoard(space, compBoardObj, locArr) {
	space.style.pointerEvents = 'none';
	compBoardObj.receiveAttack(Number(space.id));
	space.style.backgroundColor = 'green';
	space.removeEventListener('mouseover', highlightSpace);
	space.removeEventListener('mouseout', unHighlightSpace);
	for (let i = 0; i < locArr.length; i++) {
		if (space.id === locArr[i].toString()) {
			space.style.backgroundColor = 'red';
		}
	}
}

function addCompListeners(space, locArr, compBoardObj, playerBoardObj) {
	const playerBoard = document.querySelector('.player-board');
	const compBoard = document.querySelector('.comp-board');
	playerBoard.playedSpaces = [];
	const boardArr = Array.from(playerBoard.childNodes);

	space.addEventListener('mouseover', highlightSpace);
	space.addEventListener('mouseout', unHighlightSpace);

	space.addEventListener('click', () => {
		attackplayerBoard(
			playerBoardObj,
			playerBoard.playedSpaces,
			compBoard,
			boardArr,
		);
	});

	space.addEventListener('click', () => {
		attackCompBoard(space, compBoardObj, locArr);
	});
}

function createBoardUI(
	labelText,
	classText,
	locArr,
	compBoardObj,
	playerBoardObj,
) {
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
			addCompListeners(boardSpace, locArr, compBoardObj, playerBoardObj);
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
