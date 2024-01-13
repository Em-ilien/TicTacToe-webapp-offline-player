export class TicTacToe {
	constructor() {
		this.PLAYER_1_SYMBOL = 'X';
		this.PLAYER_2_SYMBOL = 'O';
		this.ROWS = ['A', 'B', 'C'];
		this.COLUMNS = ['1', '2', '3'];
		this.cells = new Map();
		this.isPlayer1Turn = true;
	}

	play(cell) {
		this.checkGamePlayability();
		this.checkCellPlayability(cell);
		this.markCellAsPlayedBy(this.getCurrentTurnPlayer(), cell);
		this.isPlayer1Turn = !this.isPlayer1Turn;
	}

	getCellPlayer(cell) {
		this.checkCellExistence(cell);
		return this.cells.get(cell);
	}

	isTheGameIsFinished() {
		if (this.isPlayerWinner(this.PLAYER_1_SYMBOL) || this.isPlayerWinner(this.PLAYER_2_SYMBOL))
			return true;
		return this.cells.size === this.ROWS.length * this.COLUMNS.length;
	}

	isPlayerWinner(player) {
		try {
			if (this.hasPlayerAlignedTheLeftToRightDiagonal(player)) return true;
			if (this.hasPlayerAlignedTheRightToLeftDiagonal(player)) return true;
			for (const row of this.ROWS) if (this.hasPlayerAlignedTheRow(row, player)) return true;
			for (const column of this.COLUMNS)
				if (this.hasPlayerAlignedTheColumn(column, player)) return true;
			return false;
		} catch (e) {
			console.error(e);
			throw new Error(e);
		}
	}

	getCurrentTurnPlayer() {
		if (this.isTheGameIsFinished()) throw new Error('Game already finished.');
		return this.isPlayer1Turn ? this.PLAYER_1_SYMBOL : this.PLAYER_2_SYMBOL;
	}

	markCellAsPlayedBy(player, cell) {
		this.cells.set(cell, player);
	}

	checkGamePlayability() {
		if (this.isTheGameIsFinished()) throw new Error('Game already finished.');
	}

	checkCellPlayability(cell) {
		this.checkCellExistence(cell);
		if (this.cells.has(cell)) throw new Error('Cell already played.');
	}

	checkCellExistence(cell) {
		if (!cell || cell.length !== 2) throw new Error('Unknown cell.');
		const row = cell.substring(0, 1);
		const column = cell.substring(1, 2);
		if (!this.isRowExists(row)) throw new Error('Unknown cell.');
		if (!this.isColumnExists(column)) throw new Error('Unknown cell.');
	}

	isColumnExists(column) {
		return this.COLUMNS.includes(column);
	}

	isRowExists(row) {
		return this.ROWS.includes(row);
	}

	hasPlayerAlignedTheColumn(column, player) {
		for (const row of this.ROWS) if (player !== this.getCellPlayer(row + column)) return false;
		return true;
	}

	hasPlayerAlignedTheRow(row, player) {
		for (const column of this.COLUMNS)
			if (player !== this.getCellPlayer(row + column)) return false;
		return true;
	}

	hasPlayerAlignedTheRightToLeftDiagonal(player) {
		for (let i = 0; i < this.ROWS.length; i++)
			if (player !== this.getCellPlayer(this.ROWS[i] + this.COLUMNS[this.ROWS.length - 1 - i]))
				return false;
		return true;
	}

	hasPlayerAlignedTheLeftToRightDiagonal(player) {
		for (let i = 0; i < this.ROWS.length; i++)
			if (player !== this.getCellPlayer(this.ROWS[i] + this.COLUMNS[i])) return false;
		return true;
	}
}
