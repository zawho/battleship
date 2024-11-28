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

function checkVertHits(board, current, up, down) {
	if (
		(current > 9 && board[up].style.backgroundColor === 'black') ||
		(current < 90 && board[down].style.backgroundColor === 'black')
	) {
		return true;
	}
	return false;
}

function checkHorizHits(board, current, forward, back) {
	if (
		(current < 99 && board[forward].style.backgroundColor === 'black') ||
		(current > 0 && board[back].style.backgroundColor === 'black')
	) {
		return true;
	}
	return false;
}

function checkLeftBoard(current) {
	const currentString = current.toString();
	const zeroVar = 0;
	if (currentString.includes(zeroVar.toString())) {
		return true;
	}
	return false;
}

function checkRightBoard(current) {
	const currentString = current.toString();
	const nineVar = 9;
	if (current === 9 || currentString.includes(nineVar.toString(), 1)) {
		return true;
	}
	return false;
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
			checkVertHits(playerBoard, i, upSpace, downSpace) === false &&
			checkRightBoard(i) === false &&
			isPlayed(nextSpace, playedSpaces) === false
		) {
			adjacentNum = nextSpace;
		} else if (
			lastSpace >= 0 &&
			playerBoard[i].style.backgroundColor === 'black' &&
			checkVertHits(playerBoard, i, upSpace, downSpace) === false &&
			checkLeftBoard(i) === false &&
			isPlayed(lastSpace, playedSpaces) === false
		) {
			adjacentNum = lastSpace;
		} else if (
			downSpace <= 99 &&
			playerBoard[i].style.backgroundColor === 'black' &&
			checkHorizHits(playerBoard, i, nextSpace, lastSpace) === false &&
			isPlayed(downSpace, playedSpaces) === false
		) {
			adjacentNum = downSpace;
		} else if (
			upSpace >= 0 &&
			playerBoard[i].style.backgroundColor === 'black' &&
			checkHorizHits(playerBoard, i, nextSpace, lastSpace) === false &&
			isPlayed(upSpace, playedSpaces) === false
		) {
			adjacentNum = upSpace;
		}
	}

	return adjacentNum;
}

function resetGame() {
	location.reload();
}

function displayGameOver(winner) {
	const body = document.querySelector('body');
	const gameOverDiv = document.createElement('div');
	const winMsg = document.createElement('div');
	const resetButton = document.createElement('button');

	gameOverDiv.className = 'game-over-div';
	winMsg.className = 'win-msg-div';
	resetButton.className = 'reset-btn';

	gameOverDiv.style.flexDirection = 'column';
	gameOverDiv.style.alignItems = 'center';
	gameOverDiv.style.gap = '10px';

	resetButton.type = 'button';
	resetButton.innerText = 'play again';
	resetButton.addEventListener('click', resetGame);

	gameOverDiv.style.display = 'none';

	body.appendChild(gameOverDiv);
	gameOverDiv.appendChild(winMsg);
	gameOverDiv.appendChild(resetButton);

	if (winner === 'pc') {
		gameOverDiv.style.display = 'flex';
		winMsg.innerText = 'computer wins!';
	} else if (winner === 'human') {
		gameOverDiv.style.display = 'flex';
		winMsg.innerText = 'you win!';
	}
}

function checkGameOver(boardObj) {
	const boardDiv = document.querySelector('.board-div');
	let winnerVar;

	for (const ship in boardObj.placedShips) {
		if (ship.includes('human')) {
			winnerVar = 'pc';
		} else if (ship.includes('pc')) {
			winnerVar = 'human';
		}
	}

	if (boardObj.checkSunk() === true) {
		boardDiv.style.display = 'none';
		displayGameOver(winnerVar);
	}
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
		checkGameOver(playerBoardObj);
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
	checkGameOver(compBoardObj);
}

function checkCollisions(pcPlayer, ship, randNum, direction) {
	let placeArr = [];
	let index = randNum;
	let collisionVar = false;

	if (direction === 0) {
		for (let i = 0; i < ship.length; i++) {
			placeArr.push(index++);
		}
	} else if (direction === 1) {
		placeArr.push(index);
		for (let i = 0; i < ship.length - 1; i++) {
			index += 10;
			placeArr.push(index);
		}
	}

	for (let [key, value] of Object.entries(pcPlayer.gameboard.locations)) {
			value.filter((element) => {
				if (placeArr.includes(element)) {
					collisionVar = true;
				}
			}) 
	}

	return collisionVar;
}

function getRandSpace(pcPlayer, ship, direction) {
	let randNum = Math.floor(Math.random() * 100);
	const remainder = randNum % 10;
	const midLimit = randNum - remainder + 9;
	const upperLimit = (ship.length - 1) * 10;

	if (direction === 0 && randNum + ship.length > midLimit) {
		return getRandSpace(pcPlayer, ship, direction);
	} else if (direction === 1 && randNum + upperLimit >= 100) {
		return getRandSpace(pcPlayer, ship, direction);
	}

	if (checkCollisions(pcPlayer, ship, randNum, direction)) {
		return getRandSpace(pcPlayer, ship, direction);
	}

	return randNum;
}

function placeCompShip(pcPlayer, ship) {
	const directionNum = Math.floor(Math.random() * 2);
	const startSpace = getRandSpace(pcPlayer, ship, directionNum);

	if (directionNum === 0) {
		pcPlayer.gameboard.placeHorizontal(startSpace, ship);
	} else if (directionNum === 1) {
		pcPlayer.gameboard.placeVertical(startSpace, ship);
	}
}

function placeAllCompShips(pcPlayer, patrol, submarine, destroyer, battleship, carrier) {
	placeCompShip(pcPlayer, patrol);
	placeCompShip(pcPlayer, submarine);
	placeCompShip(pcPlayer, destroyer);
	placeCompShip(pcPlayer, battleship);
	placeCompShip(pcPlayer, carrier);
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

function createSetup() {
	const setupDiv = document.querySelector('.setup-div');
	const setupLabel = document.createElement('div');
	setupLabel.className = 'setup-label';
	setupLabel.innerText = 'place your ships';
	const setupBoard = document.createElement('div');
	setupBoard.className = 'setup-board';
	setupDiv.appendChild(setupLabel);
	setupDiv.appendChild(setupBoard);

	for (let i = 0; i < 100; i++) {
		const setupSpace = document.createElement('div');
		setupSpace.className = 'setup-space';
		setupSpace.id = i;
		setupBoard.appendChild(setupSpace);
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

export { createSetup, createBoardUI, getShipLocs, highlightPlayerShips, placeAllCompShips };
