import React, { useState } from 'react';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xturn, setXturn] = useState(true);

  const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handlerWinner = (squares) => {
    for (let combination of winCombination) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a]; 
      }
    }
    return null;
  };

  const handlerSquare = (index) => {
    if (board[index] || handlerWinner(board)) { 
      return;
    }
    const updatedBoard = [...board];
    updatedBoard[index] = xturn ? 'X' : 'O';

    setBoard(updatedBoard);
    setXturn(!xturn);
  };

  const handlerStatus = () => {
    const winner = handlerWinner(board);
    if (winner) {
      return `Player ${winner} wins!`;
    }
    if (board.every((square) => square !== null)) {
      return "It's a draw!";
    }
    return `Next Player: ${xturn ? 'X' : 'O'}`;
  };

  const handlerReset = () => {
    setBoard(Array(9).fill(null));
    setXturn(true);
  };

  return (
    <>
      <div className='min-h-screen bg-slate-950 flex items-center justify-center'>
        <div className='w-full max-w-[400px] mx-5'>
          <h1 className='text-5xl font-semibold text-white mb-8 text-center'>TIC TAC TOE</h1>
          <div
            className={`text-center mb-6 ${
              handlerWinner(board) ? 'text-2xl font-bold text-green-400 animate-bounce' : 'text-xl text-white'
            }`}
          >
            {handlerStatus()}
          </div>
          <div className='grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6 '>
            {board.map((square, index) => (
              <button
                key={index}
                onClick={() => handlerSquare(index)}
                className={`h-32 w-full bg-gray-800 rounded-md text-3xl font-bold transition-colors duration-200 hover:bg-gray-700 ${
                  square === 'X' ? 'text-white' : 'text-slate-400'
                }`}
              >
                {square}
              </button>
            ))}
          </div>
          <button
            className='w-full py-3 text-lg text-white border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200'
            onClick={handlerReset}
          >
            New Game
          </button>
        </div>
      </div>
    </>
  );
}
