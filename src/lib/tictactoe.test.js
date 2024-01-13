import { test, expect, describe, beforeEach } from 'vitest';
import { TicTacToe } from './tictactoe';

describe('TicTacToe', () => {
	let ticTacToe;

	beforeEach(() => {
		ticTacToe = new TicTacToe();
	});

	test('playACellShouldWork', () => {
		ticTacToe.play('A1');
	});

	test('playACellShouldAssignItToX', () => {
		ticTacToe.play('A1');
		expect(ticTacToe.getCellPlayer('A1')).toEqual('X');
	});

	test('playASecondCellShouldAssignItToO', () => {
		ticTacToe.play('A1');
		ticTacToe.play('A2');
		expect(ticTacToe.getCellPlayer('A2')).toEqual('O');
	});

	test('playTwoCellsShouldAssignThemCorrectly', () => {
		ticTacToe.play('A1');
		ticTacToe.play('A2');
		expect(ticTacToe.getCellPlayer('A1')).toEqual('X');
		expect(ticTacToe.getCellPlayer('A2')).toEqual('O');
	});

	test('replayingACellShouldThrowException', () => {
		ticTacToe.play('A1');
		expect(() => ticTacToe.play('A1')).toThrowError('Cell already played.');
	});

	test('getNotPlayedCellShouldReturnNull', () => {
		expect(ticTacToe.getCellPlayer('A1')).toBeUndefined();
	});

	test('getUnknownCellShouldThrowException', () => {
		expect(() => ticTacToe.getCellPlayer('A9')).toThrowError('Unknown cell.');
	});

	test('getCellWithOneCharShouldThrowException', () => {
		expect(() => ticTacToe.getCellPlayer('A')).toThrowError('Unknown cell.');
	});

	test('getCellWithThreeCharsShouldThrowException', () => {
		expect(() => ticTacToe.getCellPlayer('A12')).toThrowError('Unknown cell.');
	});

	test('getCellWithNullShouldThrowException', () => {
		expect(() => ticTacToe.getCellPlayer(null)).toThrowError('Unknown cell.');
	});

	test('playACellWithNullShouldThrowException', () => {
		expect(() => ticTacToe.play(null)).toThrowError('Unknown cell.');
	});

	test('playACellWithOneCharShouldThrowException', () => {
		expect(() => ticTacToe.play('A')).toThrowError('Unknown cell.');
	});

	test('playACellWhichDoesNotExistShouldThrowException', () => {
		expect(() => ticTacToe.play('A9')).toThrowError('Unknown cell.');
	});

	test('alignTheFirstRowShouldReturnTrue', () => {
		ticTacToe.play('A1');
		ticTacToe.play('B1');
		ticTacToe.play('A2');
		ticTacToe.play('B2');
		ticTacToe.play('A3');
		expect(ticTacToe.isPlayerWinner('X')).toBeTruthy();
	});

	test('checkIfPlayer1IsWinnerWhileHeIsNotShouldReturnFalse', () => {
		ticTacToe.play('A1');
		ticTacToe.play('B1');
		ticTacToe.play('A2');
		ticTacToe.play('B2');
		expect(ticTacToe.isPlayerWinner('X')).toBeFalsy();
	});

	test('alignTheSecondRowShouldReturnTrue', () => {
		ticTacToe.play('B1');
		ticTacToe.play('A1');
		ticTacToe.play('B2');
		ticTacToe.play('A2');
		ticTacToe.play('B3');
		expect(ticTacToe.isPlayerWinner('X')).toBeTruthy();
	});

	test('alignTheFirstColumnShouldReturnTrue', () => {
		ticTacToe.play('A1');
		ticTacToe.play('A2');
		ticTacToe.play('B1');
		ticTacToe.play('A3');
		ticTacToe.play('C1');
		expect(ticTacToe.isPlayerWinner('X')).toBeTruthy();
	});

	test('playWhilePlayer1IsWinnerShouldThrowException', () => {
		ticTacToe.play('A1');
		ticTacToe.play('B1');
		ticTacToe.play('A2');
		ticTacToe.play('B2');
		ticTacToe.play('A3');
		expect(() => ticTacToe.play('B3')).toThrowError('Game already finished.');
	});

	test('playWhilePlayer2IsWinnerShouldThrowException', () => {
		ticTacToe.play('A1');
		ticTacToe.play('B1');
		ticTacToe.play('A2');
		ticTacToe.play('B2');
		ticTacToe.play('C1');
		ticTacToe.play('B3');
		expect(() => ticTacToe.play('C2')).toThrowError('Game already finished.');
	});

	test('theFirstPlayerShouldBeX', () => {
		expect(ticTacToe.getCurrentTurnPlayer()).toEqual('X');
	});

	test('theSecondPlayerShouldBeO', () => {
		ticTacToe.play('A1');
		expect(ticTacToe.getCurrentTurnPlayer()).toEqual('O');
	});

	test('theFirstPlayerShouldBeXAfterTwoTurns', () => {
		ticTacToe.play('A1');
		ticTacToe.play('A2');
		expect(ticTacToe.getCurrentTurnPlayer()).toEqual('X');
	});

	test('theGameShouldBeFinishedWhenTheFirstPlayerWins', () => {
		ticTacToe.play('A1');
		ticTacToe.play('B1');
		ticTacToe.play('A2');
		ticTacToe.play('B2');
		ticTacToe.play('A3');
		expect(ticTacToe.isTheGameIsFinished()).toBeTruthy();
	});

	test('theCurrentPlayerTurnMethodShouldThrowExceptionAfterTheGameIsFinished', () => {
		ticTacToe.play('A1');
		ticTacToe.play('B1');
		ticTacToe.play('A2');
		ticTacToe.play('B2');
		ticTacToe.play('A3');
		expect(() => ticTacToe.getCurrentTurnPlayer()).toThrowError('Game already finished.');
	});

	test('alignTheLeftToRightDiagonalShouldEndTheGame', () => {
		ticTacToe.play('A1');
		ticTacToe.play('B1');
		ticTacToe.play('B2');
		ticTacToe.play('A2');
		ticTacToe.play('C3');
		expect(ticTacToe.isTheGameIsFinished()).toBeTruthy();
		expect(ticTacToe.isPlayerWinner('X')).toBeTruthy();
	});

	test('alignTheRightToLeftDiagonalShouldEndTheGame', () => {
		ticTacToe.play('C3');
		ticTacToe.play('A3');
		ticTacToe.play('B1');
		ticTacToe.play('B2');
		ticTacToe.play('A2');
		ticTacToe.play('C1');
		expect(ticTacToe.isTheGameIsFinished()).toBeTruthy();
		expect(ticTacToe.isPlayerWinner('O')).toBeTruthy();
	});

	test('theGameIsFinishedMethodShouldReturnTrueWhenAllCellsArePlayedEvenIfThereIsNoWinner', () => {
		ticTacToe.play('A1');
		ticTacToe.play('B1');
		ticTacToe.play('A2');
		ticTacToe.play('B2');
		ticTacToe.play('B3');
		ticTacToe.play('A3');
		ticTacToe.play('C1');
		ticTacToe.play('C2');
		ticTacToe.play('C3');
		expect(ticTacToe.isTheGameIsFinished()).toBeTruthy();
		expect(ticTacToe.isPlayerWinner('X')).toBeFalsy();
		expect(ticTacToe.isPlayerWinner('O')).toBeFalsy();
	});
});
