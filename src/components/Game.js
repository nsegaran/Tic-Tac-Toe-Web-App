import React, { useState } from "react";
import { calculateWinner } from "../calculate_win";
import Board from "./Board";
import TriviaModal from "./TriviaModal";

const Game = () => {
  const [board, setBoard] = useState([null, null, null, null, null, null, null, null, null]);
  const [xIsNext, setXisNext] = useState(true);

  // Trivia state
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [pendingSquareIndex, setPendingSquareIndex] = useState(null);

  const next_player = (xIsNext) => {
    let next_string = 'X';
    if (!xIsNext) {
      next_string = 'O';
    }
    return next_string;
  }

  const next_string = next_player(xIsNext);
  const winner = calculateWinner(board);

  const fetchQuestion = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setCurrentQuestion(data.results[0]);
      } else {
        // Fallback or retry
        console.error("No results from trivia API");
        // For simplicity, just let them play if API fails
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error fetching trivia:", error);
      return false;
    }
  };

  const handleClick = async (i) => {
    if (winner !== null || board[i] !== null) {
      return;
    }

    // Set pending move and fetch question
    setPendingSquareIndex(i);
    setShowModal(true);
    setCurrentQuestion(null); // Clear previous question

    const success = await fetchQuestion();
    if (!success) {
      // If API fails, just allow the move
      finalizeMove(i);
      setShowModal(false);
    }
  };

  const finalizeMove = (i) => {
    let copy_board = [...board];
    copy_board[i] = next_string;
    setBoard(copy_board);
    setXisNext(!xIsNext);
  };

  const handleTriviaAnswer = (isCorrect) => {
    setShowModal(false);
    if (isCorrect) {
      finalizeMove(pendingSquareIndex);
    } else {
      // Logic for incorrect answer:
      // Option A: Nothing happens, they lose their chance to mark (effectively lose turn or just wasted time)
      // Let's make it so they just don't get the square. They can try again (clicking again will fetch a new question).
      // Or we can swap turns? Let's just cancel the move.
      alert("Incorrect! You missed the chance to mark this square.");
    }
    setPendingSquareIndex(null);
    setCurrentQuestion(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPendingSquareIndex(null);
    setCurrentQuestion(null);
  }

   const jumpToStart = () => {
    const start_board = [null, null, null, null, null, null, null, null, null]
    setBoard(start_board);
    setXisNext(true);
   }

   const result = () => {
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
      <p style={{textAlign: 'center', marginBottom: '20px'}}>Answer a trivia question correctly to make your move!</p>
      <Board squares={board} onClick={(i) => handleClick(i)} />
      <div className='flexbox'>
          <div>
            <button className= 'startbutton' onClick={() => jumpToStart()}>Go to Start</button>
          </div>
          <h3> {result()}
            </h3>
      </div>

      <TriviaModal
        isOpen={showModal}
        questionData={currentQuestion}
        onAnswer={handleTriviaAnswer}
        onClose={handleCloseModal}
      />
  </>
  );
};

export default Game;
