// next: basic check for the up to right direction is working, now need to
// figure out how to implement it into the existing rotateShip() for loop
// or implement a check before the loop.
// maybe need to write a new func that runs if checkForShips() does not return clear
// and does the rotation prior to the existing loop. can have that func and
// the existing loop in a if/else statement based on checkForShips()

function getShipName(boardArr) {
	for (let i = 0; i < boardArr.length; i++) {
		if (
			boardArr[i].style.borderLeftWidth === '3px' ||
			boardArr[i].style.borderTopWidth === '3px' ||
			boardArr[i].style.borderRightWidth === '3px' ||
			boardArr[i].style.borderBottomWidth === '3px'
		) {
			return boardArr[i].className.slice(0, -11);
		}
	}
}

function checkRightBorder(axis, value, i) {
	const remainder = axis % 10;
	const leftBorderNum = axis - remainder;
	const rightBorderNum = leftBorderNum + 9;

	if (
		axis + (value.length - 1) > rightBorderNum &&
		axis + 10 * (value.length - 1) > 99
	) {
		return [axis - i, 'left'];
	} else if (axis + (value.length - 1) > rightBorderNum) {
		return [axis + 10 * i, 'down'];
	} else {
		return [axis + i, 'right'];
	}
}

function checkBottomBorder(axis, value, i) {
	const remainder = axis % 10;
	const leftBorderNum = axis - remainder;

	if (
		axis + 10 * (value.length - 1) > 99 &&
		axis - (value.length - 1) < leftBorderNum
	) {
		return [axis - 10 * i, 'up'];
	} else if (axis + 10 * (value.length - 1) > 99) {
		return [axis - i, 'left'];
	} else {
		return [axis + 10 * i, 'down'];
	}
}

function checkLeftBorder(axis, value, i) {
	const remainder = axis % 10;
	const leftBorderNum = axis - remainder;

	if (axis - (value.length - 1) < leftBorderNum) {
		return [axis - 10 * i, 'up'];
	} else {
		return [axis - i, 'left'];
	}
}

function highlightRotate(boardArr, oldSpaceArr, newSpaceArr, direction, axis) {
	for (let i = 0; i < boardArr.length; i++) {
		if (oldSpaceArr.includes(parseInt(boardArr[i].id))) {
			boardArr[i].style.borderWidth = '1px';
		}
	}

	if (direction === 'right') {
		axis.style.borderTopWidth = '3px';
		axis.style.borderRightWidth = '1px';

		for (let i = 0; i < boardArr.length; i++) {
			if (newSpaceArr.includes(parseInt(boardArr[i].id))) {
				boardArr[i].style.borderTopWidth = '3px';
				boardArr[i].style.borderBottomWidth = '3px';
			}
			if (newSpaceArr[newSpaceArr.length - 1] === parseInt(boardArr[i].id)) {
				boardArr[i].style.borderRightWidth = '3px';
			}
		}
	} else if (direction === 'down') {
		axis.style.borderRightWidth = '3px';
		axis.style.borderBottomWidth = '1px';

		for (let i = 0; i < boardArr.length; i++) {
			if (newSpaceArr.includes(parseInt(boardArr[i].id))) {
				boardArr[i].style.borderLeftWidth = '3px';
				boardArr[i].style.borderRightWidth = '3px';
			}
			if (axis.id === boardArr[i].id) {
				boardArr[i].style.borderTopWidth = '3px';
			}
			if (newSpaceArr[newSpaceArr.length - 1] === parseInt(boardArr[i].id)) {
				boardArr[i].style.borderBottomWidth = '3px';
			}
		}
	} else if (direction === 'left') {
		axis.style.borderBottomWidth = '3px';
		axis.style.borderLeftWidth = '1px';

		for (let i = 0; i < boardArr.length; i++) {
			if (newSpaceArr.includes(parseInt(boardArr[i].id))) {
				boardArr[i].style.borderTopWidth = '3px';
				boardArr[i].style.borderBottomWidth = '3px';
			}
			if (axis.id === boardArr[i].id) {
				boardArr[i].style.borderRightWidth = '3px';
				boardArr[i].style.borderTopWidth = '3px';
			}
			if (newSpaceArr[newSpaceArr.length - 1] === parseInt(boardArr[i].id)) {
				boardArr[i].style.borderLeftWidth = '3px';
			}
		}
	} else if (direction === 'up') {
		axis.style.borderLeftWidth = '3px';
		axis.style.borderTopWidth = '1px';

		for (let i = 0; i < boardArr.length; i++) {
			if (newSpaceArr.includes(parseInt(boardArr[i].id))) {
				boardArr[i].style.borderLeftWidth = '3px';
				boardArr[i].style.borderRightWidth = '3px';
			}
			if (axis.id === boardArr[i].id) {
				boardArr[i].style.borderBottomWidth = '3px';
				boardArr[i].style.borderRightWidth = '3px';
			}
			if (newSpaceArr[newSpaceArr.length - 1] === parseInt(boardArr[i].id)) {
				boardArr[i].style.borderTopWidth = '3px';
			}
		}
	}
}

function getShipCoords(board) {
	const shipCoordsArr = [];

	for (let [key, value] of Object.entries(board.allShips)) {
		for (let i = 0; i < value.length; i++) {
			shipCoordsArr.push(value[i]);
		}
	}

	return shipCoordsArr;
}

function getShipDirection(board, axis) {
	const allShipCoords = getShipCoords(board);
	const up = axis - 10;
	const right = axis + 1;
	const down = axis + 10;
	const left = axis - 1;
	
	if (allShipCoords.includes(up)) {
		return 'up';
	} else if (allShipCoords.includes(right)) {
		return 'right';
	} else if (allShipCoords.includes(down)) {
		return 'down';
	} else if (allShipCoords.includes(left)) {
		return 'left';
	}
}

function checkForShips(shipDirection, axis, value, boardArr) {
	const checkArr = [];

	for (let i = 1; i < value.length; i++) {
		if (shipDirection === 'up') {
			checkArr.push(axis + i);
		}
	}

	for (let i = 0; i < boardArr.length; i++) {
		if (
			checkArr.includes(parseInt(boardArr[i].id)) && 
			boardArr[i].style.backgroundColor === 'red'
		) {
			return 'right';
		}
	}
	return 'clear';
}

function rotateShip() {
	const board = document.querySelector('.setup-board');
	const boardArr = Array.from(board.childNodes);
	const shipName = getShipName(boardArr);
	const oldSpaceArr = [];
	const newSpaceArr = [];
	let axis;
	let direction;
	let directionArr = [];

	for (let [key, value] of Object.entries(board.allShips)) {
		if (key === shipName) {
			axis = value[0];

			const shipDirection = getShipDirection(board, axis);
			const shipCheck = checkForShips(shipDirection, axis, value, boardArr);

			console.log(shipCheck);

			for (let i = 1; i < value.length; i++) {
				oldSpaceArr.push(value[i]);
				if (axis - value[i] === 10 * i && shipCheck === 'clear') {
					directionArr = checkRightBorder(axis, value, i);
					value[i] = directionArr[0];
					direction = directionArr[1];
				} else if 
				(
					value[i] - axis === i && shipCheck === 'clear' ||
					shipCheck === 'right'
				) {
					directionArr = checkBottomBorder(axis, value, i);
					value[i] = directionArr[0];
					direction = directionArr[1];
				} else if (value[i] - axis === 10 * i) {
					directionArr = checkLeftBorder(axis, value, i);
					value[i] = directionArr[0];
					direction = directionArr[1];
				} else if (axis - value[i] === i) {
					value[i] = axis - 10 * i;
					direction = 'up';
				}
				newSpaceArr.push(value[i]);
			}
		}
	}

	for (let i = 0; i < boardArr.length; i++) {
		if (oldSpaceArr.includes(parseInt(boardArr[i].id))) {
			boardArr[i].style.backgroundColor = 'white';
			boardArr[i].className = 'setup-space';
		} else if (newSpaceArr.includes(parseInt(boardArr[i].id))) {
			boardArr[i].style.backgroundColor = 'red';
			boardArr[i].className = `${shipName}-ship-space`;
		}
	}
	highlightRotate(boardArr, oldSpaceArr, newSpaceArr, direction, boardArr[axis]);
}

function menuBtnHelper(button, setupMenu) {
	const btnName = button.className.slice(0, -4);
	button.innerText = btnName;
	setupMenu.appendChild(button);
}

function createMenuButtons(setupMenu) {
	const rotateBtn = document.createElement('button');
	const confirmBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');
	const clearBtn = document.createElement('button');

	rotateBtn.className = 'rotate-btn';
	confirmBtn.className = 'confirm-btn';
	cancelBtn.className = 'cancel-btn';
	clearBtn.className = 'clear-btn';

	menuBtnHelper(rotateBtn, setupMenu);
	menuBtnHelper(confirmBtn, setupMenu);
	menuBtnHelper(cancelBtn, setupMenu);
	menuBtnHelper(clearBtn, setupMenu);

	rotateBtn.addEventListener('click', rotateShip);
}

function shipSetupHelper(shipDiv, length, shipSetup) {
	const shipName = shipDiv.className.slice(0, -4);
	const shipLabel = document.createElement('div');

	shipLabel.className = `${shipName}-label`;
	shipLabel.innerText = shipName;

	const ship = document.createElement('div');

	ship.className = `${shipName}-ship`;
	ship.id = `length-${length}`;
	ship.draggable = true;

	for (let i = 0; i < length; i++) {
		const shipSpace = document.createElement('div');
		shipSpace.className = 'ship-space';
		shipSpace.id = `${ship.className}-${i}`;
		ship.appendChild(shipSpace);
		shipSpace.addEventListener('mousedown', (e) => {
			shipSpace.clicked = 'true';
		});
	}

	ship.addEventListener('dragstart', (e) => {
		const shipArr = Array.from(ship.childNodes);
		let newID;

		for (let i = 0; i < shipArr.length; i++) {
			if (shipArr[i].clicked === 'true') {
				newID = shipArr[i].id + '-' + e.target.id;
			}
		}
		e.dataTransfer.setData('text/plain', newID);
	});

	shipDiv.appendChild(shipLabel);
	shipDiv.appendChild(ship);
	shipSetup.appendChild(shipDiv);
}

function createSetupShips(shipSetup) {
	const patrolDiv = document.createElement('div');
	const subDiv = document.createElement('div');
	const destroyDiv = document.createElement('div');
	const battleDiv = document.createElement('div');
	const carrierDiv = document.createElement('div');

	patrolDiv.className = 'patrol-div';
	subDiv.className = 'submarine-div';
	destroyDiv.className = 'destroyer-div';
	battleDiv.className = 'battleship-div';
	carrierDiv.className = 'carrier-div';

	shipSetupHelper(patrolDiv, 2, shipSetup);
	shipSetupHelper(subDiv, 3, shipSetup);
	shipSetupHelper(destroyDiv, 3, shipSetup);
	shipSetupHelper(battleDiv, 4, shipSetup);
	shipSetupHelper(carrierDiv, 5, shipSetup);
}

function preventPlacementHelper(spaceIndex, shipLength, shipArr, shipSpace) {
	if (spaceIndex === 0) {
		shipArr.push(shipSpace);
		for (let i = 0; i < shipLength - 1; i++) {
			shipSpace += 10;
			shipArr.push(shipSpace);
		}
	} else if (spaceIndex === shipLength - 1) {
		shipArr.push(shipSpace);
		for (let i = 0; i < shipLength - 1; i++) {
			shipSpace -= 10;
			shipArr.push(shipSpace);
		}
	} else {
		for (let i = 0; i < spaceIndex; i++) {
			shipSpace -= 10;
		}
		shipArr.push(shipSpace);
		for (let i = 0; i < shipLength - 1; i++) {
			shipSpace += 10;
			shipArr.push(shipSpace);
		}
	}
}

function allowDrag(event) {
	const targetID = parseInt(event.target.id);
	const data = event.dataTransfer.getData('text/plain');
	const spaceIndex = parseInt(data.at(-10));

	const boardArr = Array.from(this.childNodes);

	const shipLength = parseInt(data.charAt(data.length - 1));
	const shipArr = [];
	let shipSpace = targetID;

	preventPlacementHelper(spaceIndex, shipLength, shipArr, shipSpace);

	if (
		shipArr[shipArr.length - 1] <= 99 &&
		shipArr[shipArr.length - 1] >= 0 &&
		shipArr[0] >= 0
	) {
		event.preventDefault();
	}

	for (let i = 0; i < boardArr.length; i++) {
		for (let j = 0; j < shipArr.length; j++) {
			if (
				parseInt(boardArr[i].id) === shipArr[j] &&
				boardArr[i].style.backgroundColor === 'red'
			) {
				event.target.style.pointerEvents = 'none';
				boardArr[i].style.pointerEvents = 'none';
			}
		}
	}
}

function highlightShip(shipSpace, shipArr) {
	shipSpace.style.borderLeft = '3px solid black';
	shipSpace.style.borderRight = '3px solid black';

	if (
		shipArr[0] < shipArr[shipArr.length - 1] &&
		parseInt(shipSpace.id) === shipArr[0]
	) {
		shipSpace.style.borderTop = '3px solid black';
	} else if (
		shipArr[0] > shipArr[shipArr.length - 1] &&
		parseInt(shipSpace.id) === shipArr[shipArr.length - 1]
	) {
		shipSpace.style.borderTop = '3px solid black';
	}

	if (
		shipArr[0] < shipArr[shipArr.length - 1] &&
		parseInt(shipSpace.id) === shipArr[shipArr.length - 1]
	) {
		shipSpace.style.borderBottom = '3px solid black';
	} else if (
		shipArr[0] > shipArr[shipArr.length - 1] &&
		parseInt(shipSpace.id) === shipArr[0]
	) {
		shipSpace.style.borderBottom = '3px solid black';
	}
}

function removeHighlight(boardArr) {
	for (let i = 0; i < boardArr.length; i++) {
		if (boardArr[i].style.borderTopWidth === '3px') {
			boardArr[i].style.borderTop = '1px solid black';
		}

		if (boardArr[i].style.borderLeftWidth === '3px') {
			boardArr[i].style.borderLeft = '1px solid black';
		}

		if (boardArr[i].style.borderBottomWidth === '3px') {
			boardArr[i].style.borderBottom = '1px solid black';
		}

		if (boardArr[i].style.borderRightWidth === '3px') {
			boardArr[i].style.borderRight = '1px solid black';
		}
	}
}

function editShipObj(allShips, shipName, shipArr) {
	for (let [key, value] of Object.entries(allShips)) {
		if (key === shipName) {
			for (let i = 0; i < shipArr.length; i++) {
				value.push(shipArr[i]);
				value.sort(function (a, b) {
					return b - a;
				});
			}
		}
	}
}

function dropHandler(event) {
	event.preventDefault();
	const data = event.dataTransfer.getData('text/plain');
	const shipSpaceClass = `${data.slice(0, -11)}-space`;
	const dataClass = data.slice(0, -11);
	const spaceIndex = parseInt(data.at(-10));
	const shipName = data.slice(0, -16);
	const setupBoard = document.querySelector('.setup-board');

	event.target.appendChild(document.querySelector(`.${dataClass}`));

	const boardArr = Array.from(this.childNodes);

	removeHighlight(boardArr);

	const shipLength = parseInt(data.charAt(data.length - 1));
	const shipArr = [];
	let shipSpace = parseInt(event.target.id);

	preventPlacementHelper(spaceIndex, shipLength, shipArr, shipSpace);

	for (let i = 0; i < boardArr.length; i++) {
		for (let j = 0; j < shipArr.length; j++) {
			if (parseInt(boardArr[i].id) === shipArr[j]) {
				const nextSpace = document.getElementById(shipArr[j]);
				nextSpace.style.backgroundColor = 'red';
				nextSpace.className = shipSpaceClass;
				highlightShip(nextSpace, shipArr);
			}
		}
	}
	event.target.removeChild(document.querySelector(`.${dataClass}`));

	editShipObj(setupBoard.allShips, shipName, shipArr);
}

function createShipObj() {
	return {
		patrol: [],
		submarine: [],
		destroyer: [],
		battleship: [],
		carrier: [],
	};
}

function createSetup() {
	const setupDiv = document.querySelector('.setup-div');
	const setupLabel = document.createElement('div');

	setupLabel.className = 'setup-label';
	setupLabel.innerText = 'place your ships';

	const setupBoard = document.createElement('div');
	setupBoard.className = 'setup-board';

	setupBoard.addEventListener('dragover', allowDrag);

	setupBoard.addEventListener('drop', dropHandler);

	const setupMenu = document.createElement('div');
	setupMenu.className = 'setup-menu';

	const shipSetup = document.createElement('div');
	shipSetup.className = 'ship-setup';

	setupDiv.appendChild(setupLabel);
	setupDiv.appendChild(setupBoard);
	setupDiv.appendChild(setupMenu);
	setupDiv.appendChild(shipSetup);

	createMenuButtons(setupMenu);
	createSetupShips(shipSetup);

	for (let i = 0; i < 100; i++) {
		const setupSpace = document.createElement('div');
		setupSpace.className = 'setup-space';
		setupSpace.id = i;
		setupBoard.appendChild(setupSpace);
	}
	setupBoard.allShips = createShipObj();
}

export default createSetup;
