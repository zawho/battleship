import Board from './board';

class Player {
	constructor(type) {
		this.type = type;
		this.gameboard = new Board();
	}
}

export default Player;
