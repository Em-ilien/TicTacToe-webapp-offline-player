<script>
	import { TicTacToe } from './../lib/tictactoe.js';

	let cells;
	let gameFinished;
	let winner;
	let nextPlayer;

	let game = new TicTacToe();
	resetCells();
	checkGameStatus();

	function resetCells() {
		cells = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		];
	}

	function checkGameStatus() {
		gameFinished = game.isTheGameIsFinished();
		winner = game.isPlayerWinner('X') ? 'X' : game.isPlayerWinner('O') ? 'O' : 'none';
		if (gameFinished) return;
		nextPlayer = game.getCurrentTurnPlayer();
	}

	const convertIdxToCellCoords = (row, column) => {
		const rowLetter = row == '0' ? 'A' : row == '1' ? 'B' : 'C';
		const columnNumber = parseInt(column) + 1;
		return `${rowLetter}${columnNumber}`;
	};

	function onClickCell(e) {
		if (game.isTheGameIsFinished()) return;
		if (e.type === 'keydown' && e.key !== 'Enter') return;
		const { row, column } = e.target.dataset;
		if (row == undefined || column == undefined) return;
		const cell = convertIdxToCellCoords(row, column);
		if (game.getCellPlayer(cell)) return;
		game.play(cell);
		cells[row][column] = game.getCellPlayer(cell);
		checkGameStatus();
	}

	function onClickReplay(e) {
		game = new TicTacToe();
		resetCells();
		checkGameStatus();
	}
</script>

<section>
	<main>
		<h1>TicTacToe game</h1>
		<div>
			<div class="tictactoe">
				<div class="grid">
					{#each cells as rowCells, idx1}
						<div class="row">
							{#each rowCells as cell, idx2}
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<div
									class="cell"
									on:click={onClickCell}
									on:keydown={onClickCell}
									tabindex="0"
									data-row={idx1}
									data-column={idx2}
									role="cell"
								>
									{#if cell === 'X'}
										<svg
											width="1300"
											height="130"
											viewBox="0 0 130 130"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M10 10L120 120" stroke="black" stroke-width="8" />
											<path d="M120 10L10 120" stroke="black" stroke-width="8" />
										</svg>
									{:else if cell === 'O'}
										<svg
											width="1300"
											height="130"
											viewBox="0 0 130 130"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle cx="65" cy="65" r="60.5" stroke="black" stroke-width="8" />
										</svg>
									{/if}
								</div>
							{/each}
						</div>
					{/each}
				</div>
				{#if gameFinished}
					<p>Game finished. Winner: {winner}</p>
				{:else}
					<p>Next player: {nextPlayer}</p>
				{/if}
			</div>
			<footer>
				<button
					class="replay-btn"
					on:click={onClickReplay}
					on:keydown={onClickReplay}
					tabindex="0"
					role="button">Replay</button
				>
			</footer>
		</div>
	</main>
</section>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		background: linear-gradient(291deg, #ced3f1 -25.6%, rgba(139, 151, 214, 0) 94.17%);
	}

	section {
		width: 100vw;
		max-width: 100vw;
		height: 100vh;
		max-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	main {
		width: fit-content;
		height: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		align-self: stretch;
		padding: 1em;
	}

	h1 {
		color: #686868;
		font-family: 'Inter';
		font-size: 1.875em;
		font-style: normal;
		font-weight: 600;
		line-height: 2.25em;
		letter-spacing: -0.225px;
	}

	main > div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 4em;
		flex-shrink: 1;
		max-height: 100%;
		max-width: 100%;
	}

	.tictactoe {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.625em;
		max-width: 100%;
	}

	.tictactoe > .grid {
		display: flex;
		width: 25em;
		height: 25em;
		max-height: 80%;
		max-width: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.625em;
	}

	.row {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.625em;
		align-self: stretch;
		height: calc((100% / 3) - 0.4em);
		min-height: calc((100% / 3) - 0.4em);
		max-height: calc((100% / 3) - 0.4em);
	}

	.cell {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.625em;
		padding: 2em;
		align-self: stretch;
		border: 1px solid #000;
		width: calc((100% / 3) - 0.4em);
		min-width: calc((100% / 3) - 0.4em);
		max-width: calc((100% / 3) - 0.4em);
	}

	.row .cell:last-child,
	.row:last-child .cell {
		box-shadow: 4px 4px 10.6px 0px rgba(0, 0, 0, 0.2);
	}

	.cell svg {
		stroke-width: 0.5em;
		stroke: #000;
	}

	main > div p {
		color: #686868;
		font-family: 'Inter';
		font-size: 1.125em;
		font-style: normal;
	}

	footer {
		display: flex;
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
		gap: 0.625em;
	}

	footer .replay-btn {
		display: flex;
		padding: 0.5em 1em;
		justify-content: center;
		align-items: center;
		gap: 0.625em;
		border-radius: 0.375em;
		background: #0f172a;
		color: #fff;
		font-family: 'Inter';
		font-size: 1.125em;
		font-style: normal;
		line-height: 1.375em;
	}
</style>
