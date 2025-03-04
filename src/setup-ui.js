// Next: figure out sub/destroyer placement bug
// Next next: Rewrite rotate func to use ship class and ship obj
// Also next next maybe: Try CSS transform rotate...???

function getShipName(boardArr) {
	for (let i = 0; i < boardArr.length; i++) {
		if (boardArr[i].style.borderLeftWidth === "3px" ||
			boardArr[i].style.borderTopWidth === "3px" || 
			boardArr[i].style.borderRightWidth === "3px" ||
			boardArr[i].style.borderBottomWidth === "3px" 
		) {
			return boardArr[i].className.slice(0, -11);
		}
	}
}

function rotateShip() {
	const board = document.querySelector('.setup-board');
	const boardArr = Array.from(board.childNodes);
	const shipName = getShipName(boardArr);
	
	for (let [key, value] of Object.entries(board.allShips)) {
			if (key === shipName) {
				console.log(value);
			}
	}
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
			}
		}
	}
}

function dropHandler(event) {
	event.preventDefault();
	const data = event.dataTransfer.getData('text/plain');
	const shipSpaceClass = `${data.slice(0, -11)}-space`;
	const dataID = data.slice(-8);
	const spaceIndex = parseInt(data.at(-10));
	const shipName = data.slice(0, -16);
	const setupBoard = document.querySelector('.setup-board');

	event.target.appendChild(document.getElementById(dataID));

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
	event.target.removeChild(document.getElementById(dataID));

	editShipObj(setupBoard.allShips, shipName, shipArr);
}

function createShipObj() {
	return {
		patrol: [],
		submarine: [],
		destroyer: [],
		battleship: [],
		carrier: [],
	}
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
