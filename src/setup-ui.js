// Next: prevent ship placements overflowing board

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
	}

	ship.addEventListener('dragstart', (e) => {
		e.dataTransfer.setData('text/plain', e.target.id);
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

function createSetup() {
	const setupDiv = document.querySelector('.setup-div');
	const setupLabel = document.createElement('div');

	setupLabel.className = 'setup-label';
	setupLabel.innerText = 'place your ships';

	const setupBoard = document.createElement('div');
	setupBoard.className = 'setup-board';

	setupBoard.addEventListener('dragover', (e) => {
		e.preventDefault();
	});

	setupBoard.addEventListener('drop', (e) => {
		e.preventDefault();
		const data = e.dataTransfer.getData('text/plain');
		e.target.appendChild(document.getElementById(data));

		const boardArr = Array.from(setupBoard.childNodes);

		const shipLength = parseInt(data.charAt(data.length - 1));
		const shipArr = [];
		let shipSpace = parseInt(e.target.id);
		shipArr.push(shipSpace);
		

		for (let i = 0; i < shipLength - 1; i++) {
			shipSpace += 10;
			shipArr.push(shipSpace);
		}

		e.target.style.backgroundColor = 'red';

		for (let i = 0; i < boardArr.length; i++) {

			for (let j = 0; j < shipArr.length; j++) {
				if (parseInt(boardArr[i].id) === shipArr[j]) {
					const nextSpace = document.getElementById(shipArr[j]);
					nextSpace.style.backgroundColor = 'red';
				}
			}
		}

		e.target.removeChild(document.getElementById(data));
	});

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
}

export default createSetup;