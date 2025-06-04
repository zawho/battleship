// NEXT: try to account for all border + ship cases with new checkAllBorders()

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
    const boardArr = Array.from(board.childNodes);
    const allShipCoords = getShipCoords(board);
    const up = axis - 10;
    let right;
    if (axis + 1 <= 99) {
        right = axis + 1;
    }
    let down;
    if (axis + 10 <= 99) {
        down = axis + 10;
    }
    const left = axis - 1;
    let axisShip;
    let upShip;
    let rightShip;
    let downShip;
    let leftShip;

    for (let i = 0; i < boardArr.length; i++) {
        if (i === axis) {
            axisShip = boardArr[i].className;
            upShip = boardArr[i - 10].className;
            if (i + 1 <= 99) {
                rightShip = boardArr[i + 1].className;
            }
            if (i + 10 <= 99) {
                downShip = boardArr[i + 10].className;
            }
            leftShip = boardArr[i - 1].className;
        }
    }

    if (allShipCoords.includes(up) && axisShip === upShip) {
        return 'up';
    } else if (allShipCoords.includes(right) && axisShip === rightShip) {
        return 'right';
    } else if (allShipCoords.includes(down) && axisShip === downShip) {
        return 'down';
    } else if (down === undefined || allShipCoords.includes(left) && axisShip === leftShip) {
        return 'left';
    }
}

function checkAllBorders(shipDirection, axis, value) {
    let rightBorderArr = [];
    let downBorderArr = [];
    let leftBorderArr = [];
    let rightBorderResult;
    let downBorderResult;
    let leftBorderResult;

    for (let i = 0; i < value.length; i++) {
        rightBorderArr = checkRightBorder(axis, value, i);
        downBorderArr = checkBottomBorder(axis, value, i);
        leftBorderArr = checkLeftBorder(axis, value, i);
        rightBorderResult = rightBorderArr[1];
        downBorderResult = downBorderArr[1];
        leftBorderResult = leftBorderArr[1];
    }

    console.log(`right: ${rightBorderResult}`);
    console.log(`down: ${downBorderResult}`);
    console.log(`left: ${leftBorderResult}`);

    if (shipDirection === 'up' && rightBorderResult === 'down') {
        return 'right-border';
    }
    if (
        shipDirection === 'up' && 
        rightBorderResult === 'left' && 
        downBorderResult === 'left'
    ) {
        return "right-down-border"
    }
    if (
        shipDirection === 'right' && 
        downBorderResult === 'left' && 
        leftBorderResult === 'left'
    ) {
        return "down-border"
    }
}

function checkForShips(shipDirection, axis, value, boardArr) {
    const checkRightArr = [];
    const checkDownArr = [];
    const checkLeftArr = [];
    const borderCheck = checkAllBorders(shipDirection, axis, value);
    let rightCollision = false;
    let downCollision = false;
    let leftCollision = false;

    console.log(borderCheck);

    for (let i = 1; i < value.length; i++) {
    checkRightArr.push(axis + i);
    }

    for (let i = 1; i < value.length; i++) {
    checkDownArr.push(axis + i * 10);
    }

    for (let i = 1; i < value.length; i++) {
    checkLeftArr.push(axis - i);
    }

    for (let i = 0; i < boardArr.length; i++) { 
        if (
            checkRightArr.includes(parseInt(boardArr[i].id)) &&
            boardArr[i].style.backgroundColor === 'red' &&
            !value.includes(parseInt(boardArr[i].id))
        ) {
                rightCollision = true;
            }
        if (
            checkDownArr.includes(parseInt(boardArr[i].id)) &&
            boardArr[i].style.backgroundColor === 'red' &&
            !value.includes(parseInt(boardArr[i].id))
        ) {
                downCollision = true;
            }
        if (
            checkLeftArr.includes(parseInt(boardArr[i].id)) &&
            boardArr[i].style.backgroundColor === 'red' &&
            !value.includes(parseInt(boardArr[i].id))
        ) {
            leftCollision = true;
        }
    }

    for (let i = 0; i < boardArr.length; i++) {
        if (
            shipDirection === 'up' &&
            rightCollision === true &&
            downCollision === false
        ) {
            return 'right';
        } else if (
            shipDirection === 'up' &&
            rightCollision === true &&
            downCollision === true &&
            leftCollision === false
        ) {
            return 'right-down';
        } else if (
            shipDirection === 'up' &&
            rightCollision === false &&
            downCollision === true &&
            leftCollision === false &&
            borderCheck === 'right-border'
        ) {
            return 'right-down';
        } else if (
            shipDirection === 'up' &&
            rightCollision === false &&
            downCollision === false &&
            leftCollision === true &&
            borderCheck === 'right-down-border'
        ) {
            return 'right-down-left';
        } else if (
            shipDirection === 'up' &&
            rightCollision === true &&
            downCollision === true &&
            leftCollision === true
        ) {
            return 'right-down-left';
        } else if (
            shipDirection === 'right' &&
            downCollision === true &&
            leftCollision === false
        ) {
            return 'down';
        } else if (
            shipDirection === 'right' &&
            downCollision === true &&
            leftCollision === true
        ) {
            return 'down-left';
        } else if (
            shipDirection === 'right' &&
            downCollision === false &&
            leftCollision === true &&
            borderCheck === 'down-border'
        ) {
            return 'down-left';
        } else if (
            shipDirection === 'down' &&
            leftCollision === true
        ) {
            return 'left';
        }
    }
    return 'clear'
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

			for (let i = 1; i < value.length; i++) {
				oldSpaceArr.push(value[i]);
				if (axis - value[i] === 10 * i && shipCheck === 'clear') {
					directionArr = checkRightBorder(axis, value, i);
					value[i] = directionArr[0];
					direction = directionArr[1];
				} else if (
					(value[i] - axis === i && shipCheck === 'clear') ||
					shipCheck === 'right'
				) {
					directionArr = checkBottomBorder(axis, value, i);
					value[i] = directionArr[0];
					direction = directionArr[1];
				} else if (
					(value[i] - axis === 10 * i && shipCheck === 'clear') ||
					shipCheck === 'down' ||
					shipCheck === 'right-down'
				) {
					directionArr = checkLeftBorder(axis, value, i);
					value[i] = directionArr[0];
					direction = directionArr[1];
				} else if (
					(axis - value[i] === i && shipCheck === 'clear') ||
					shipCheck === 'left' ||
					shipCheck === 'down-left'
				) {
					value[i] = axis - 10 * i;
					direction = 'up';
				} else if (shipCheck === 'right-down-left') {
					return;
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
	highlightRotate(
		boardArr,
		oldSpaceArr,
		newSpaceArr,
		direction,
		boardArr[axis],
	);
}

export { getShipName, rotateShip };