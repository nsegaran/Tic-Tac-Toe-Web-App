import React, { useState } from "react";
import { calculateWinner } from "../calculate_win";
import Board from "./Board";

let squares = [null, null, null, null, null, null, null, null, null]

const Game = () => {
  // TODO: Set up states and functions: position of Xs and Os on board,
  const [board, setBoard] = useState([null, null, null, null, null, null, null, null, null]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);

  const next_player = (xIsNext) => {
    let next_string = 'X';
    if (!xIsNext) {
      next_string = 'O';
    }
    return next_string;
  }

  // step number, whether X is next, is there a win or tie, etc.
  const next_string = next_player(xIsNext);
  const winner = calculateWinner(board);

  const handleClick = (i) => {
    let copy_board = [...board];
    if (winner !== null || board[i] !== null) {
      return;
    } else {
      copy_board[i] = next_string
    }
    setBoard(copy_board);
    setXisNext(!xIsNext);
   }

   const jumpToStart = () => {
    const start_board = [null, null, null, null, null, null, null, null, null]
    setBoard(start_board);
    setXisNext(true);
   }

   const result = () => {
    console.log(winner)
    if (winner !== null) {
      return ('Winner: ' + winner);
    }
    let empty_squares = 0;
    for (let i = 0; i < board.length; i++ ) {
      if (board[i] === null) {
        empty_squares++;
      }
    }
    if (!empty_squares) {
      return 'Tie Game';
    } else {
      return ('Next Player:' + ' ' + next_string);
    }
   }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Board squares={board} onClick={(i) => handleClick(i)} />
      <div className='flexbox'>
          <div>
            <button className= 'startbutton' onClick={() => jumpToStart()}>Go to Start</button>
          </div>
          <h3> {result()}
            </h3>
      </div>
  </>
  );
};

export default Game;
