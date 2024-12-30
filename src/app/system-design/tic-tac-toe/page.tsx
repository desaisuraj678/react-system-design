"use client";
import { memo, useCallback, useState } from "react";
import "./styles.css";
export default function TicTacToe() {
  const n = 3;
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [board, setboard] = useState(() =>
    Array.from({ length: n }, () => Array(n).fill(null))
  );
  // keeping this state to get winner in O(1).
  const [winnerState, setWinnerState] = useState({
    rows: Array(n).fill(0),
    cols: Array(n).fill(0),
    diagonal: 0,
    antiDiagonal: 0,
  });

  const [winner, setWinner] = useState<"X" | "O" | null>(null);

  const onClickHandler = useCallback(
    (row: number, col: number) => {
      if (board[row][col] || winner) return;
      const value = currentPlayer === "X" ? 1 : -1;
      const newPlayer = currentPlayer === "X" ? "O" : "X";
      const newWinnerState = { ...winnerState };
      newWinnerState.antiDiagonal =
        row + col == n - 1
          ? newWinnerState.antiDiagonal + value
          : newWinnerState.antiDiagonal;
      newWinnerState.diagonal =
        row === col ? newWinnerState.diagonal + value : newWinnerState.diagonal;
      newWinnerState.rows[row] += value;
      newWinnerState.cols[col] += value;
      const currWinner = findWinner(row, col, newWinnerState);
      const newBoard = board.map((row) => [...row]);
      newBoard[row][col] = currentPlayer;
      setWinner(currWinner);
      setWinnerState(newWinnerState);
      setCurrentPlayer(newPlayer);
      setboard(board);
    },
    [winnerState]
  );

  function findWinner(row: number, col: number, newWinnerState) {
    if (
      Math.abs(newWinnerState.diagonal) == n ||
      Math.abs(newWinnerState.antiDiagonal) == n
    ) {
      return currentPlayer;
    }
    if (Math.abs(newWinnerState.rows[row]) == n) {
      return currentPlayer;
    }
    if (Math.abs(newWinnerState.cols[col]) == n) {
      return currentPlayer;
    }
    return null;
  }

  return (
    <div>
      <div>current Player :{currentPlayer}</div>
      <div>{winner ? `Winner is ${winner}` : ""}</div>
      <div
        className="cell-wrapper"
        style={{ gridTemplateColumns: `repeat(${n}, 50px)` }}
      >
        {board.map((item, rowIndex) => {
          return item.map((colItem, colIndex) => {
            return (
              <Cell
                colIndex={colIndex}
                rowIndex={rowIndex}
                key={rowIndex + "_" + colIndex}
                colItem={colItem}
                onClickHandler={onClickHandler}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

// eslint-disable-next-line react/display-name
const Cell = memo(
  ({
    colIndex,
    rowIndex,
    colItem,
    onClickHandler,
  }: {
    colIndex: number;
    rowIndex: number;
    colItem: string;
    onClickHandler: (row: number, col: number) => void;
  }) => {
    return (
      <div
        key={colIndex + rowIndex}
        className="cell"
        onClick={() => onClickHandler(rowIndex, colIndex)}
      >
        {colItem}
      </div>
    );
  }
);
