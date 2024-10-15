const boardDiv = document.querySelector('.board-div');


function createBoardUI(classText) {
    const board = document.createElement('div');
    board.className = classText;
    boardDiv.appendChild(board);
    for (let i = 0; i < 100; i++) {
        const boardSpace = document.createElement('div');
        boardSpace.className = 'board-space';
        board.appendChild(boardSpace);
    }
}

export default createBoardUI;