const boardDiv = document.querySelector('.board-div');


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
        board.appendChild(boardSpace);
    }
}

export default createBoardUI;