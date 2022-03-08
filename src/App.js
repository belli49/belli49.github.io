import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function Square(props) {
  return (
    <div>
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    </div>
  );
}

function SquareWon(props) {
  return (
    <button className="square" onClick={props.onClick} style={{backgroundColor: '#b1ff65'}}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={"square" + i}
      />
    );
  }

  renderSquareWon(i) {
    return (
      <SquareWon
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={"square" + i}
      />
    );
  }

  render() {
    let id = 0;
    let rows = [];
    const winnerSquares = this.props.winnerSquares;
    let winnerSquareCounter = 0;
    let currentWonSquare = winnerSquares[0];

    for (let k = 0; k < 3; k++) {
      let line = [];
      for (let j = 0; j < 3; j++) {
        if (currentWonSquare === k * 3 + j) {
          currentWonSquare = winnerSquares[++winnerSquareCounter];
          line.push(this.renderSquareWon(id++));
        } else {
          line.push(this.renderSquare(id++));
        }
      }
      rows.push(
        <div className="board-row" key={"board" + id}>
          {line}
        </div>
      )
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const check = calculateWinner(squares)[0];
    if (check || squares[i]) {
      return;
    }
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        lastPlay: [1 + i % 3, Math.floor(1 + i / 3)]
      }]),
      stepNumber: history.length,
      isXNext: !this.state.isXNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isXNext: (step % 2) === 0,
    });
  }

  changeSort() {
    this.setState({sortOrderAscending: !this.state.sortOrderAscending});
  }

  //CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastPlay: null,
      }
      ],
      stepNumber: 0,
      isXNext: true,
      sortOrderAscending: true,
      winnerSquares: Array(3).fill(null),
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const [winner, winnerSquares] = calculateWinner(current.squares);
    const sortOrderAscending = this.state.sortOrderAscending;
    let moves = [];

    history.map((step, move) => {
      const desc = move ?
        'Go to move#' + move :
        'Go to game start';

      //RENDERS BUTTONS
      if (move === this.state.stepNumber)
        moves.push((move === 0) ? (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
          </li>
        ) : (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
            <a> [{step.lastPlay[0]}, {step.lastPlay[1]}]</a>
          </li>
        ));
      else
        moves.push((move === 0) ? (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        ) : (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
            <a> [{step.lastPlay[0]}, {step.lastPlay[1]}]</a>
          </li>
        ));
    });

    if (!sortOrderAscending) moves.reverse();

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.stepNumber > 8) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
    }

    //RENDERS BOARD
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerSquares={winnerSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.changeSort()}>{"Change move list sort order"}</button>
          </div>
          <ul>{moves}</ul>
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
      return ([squares[a], lines[i]]);
    }
  }
  return [null, Array(3).fill(null)];
}

// ========================================

/*
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
*/

export default App;
