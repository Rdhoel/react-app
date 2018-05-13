import React, { Component} from "react";
import Board from "./Board.js";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        locations: []
      }],
      stepNumber: 0,
      xIsNext: true,
      movesOrder: 'asc'
    };
  }

  handleClick(i, row, col) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const locations = current.locations;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    locations.push(`row: ${row}, col: ${col}`);
    
    this.setState({
       history: history.concat([{
        squares: squares,
        locations: locations,
        bold: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  toggleMoves() {
    const order = this.state.movesOrder === 'asc' ? 'desc' : 'asc';
    this.setState({
      movesOrder: order
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let combo = [];

    const moves = history.map((step, move) => {
      let desc = 'Go to game start';
      let location = '';
      if (move) {
        desc = `Go to move # ${move}`;
        location = `Clicked on ${step.locations[move-1]}`;
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <p style={ this.state.stepNumber == move ? {fontWeight: 'bold'} : {fontWeight: 'normal'} }>{location}</p>
        </li>
      );
    });

    if (this.state.movesOrder === 'desc') {
      moves.reverse();
    }

    let status;
    if (typeof winner === 'object') {
      status = 'Winner: ' + winner.player;
      combo = winner.combo;
    } else if (this.state.stepNumber === 9) {
      status = 'Result is a draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
       
        <div className="game-board">
         <div className="status">{status}</div>
          <Board
            squares={current.squares}
            winner={combo}
            onClick={(i, row, col) => this.handleClick(i, row, col)}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
        <div>
          <button className="toggleMoves" onClick={() => this.toggleMoves()}>Toggle Moves Order</button>
        </div>
       
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(lines[i]);
      return {player: squares[a], combo: lines[i]};

    }
  }
  return '';
}

export default Game;