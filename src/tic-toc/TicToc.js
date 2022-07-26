import React, { useState } from 'react';

export function Square(props) {
    return (
      <button 
          className={ props.redHighlight ? "square red" : "square"} 
          onClick={ props.onClick }
      >
        { props.value }
      </button>
    );
  }

export function MagicButton(props) {

  let [name, setName ] = useState('John');
  let [count, setCount] = useState(0);

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <>
      <input value={name} onChange={handleChange}></input>
      <button onClick={() => setCount(count + 1)}>{props.nameOfButton}show the: {count}</button>
      <p>Hello {name}!</p>
    </>
  );
}
  
export  class Board extends React.Component {

    renderSquare(i) {
      return (
        <Square 
          key={'k'+ i}
          redHighlight={this.props.winnerCombo.includes(i)}
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const arrField = [];
      let k = 0;
      while (k < 3) {
        let subArr = [];
        let j = 0;
        while (j < 3) {
          subArr.push(this.renderSquare(k*3+j))
          j++;
        }
        arrField.push(<div key={'j'+ k} className="board-row">{ subArr }</div>)
        k++;
      }
      return (
        <div>
          { arrField }
          {/* <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div> */}
        </div>
      );
    }
  }
  
export  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                move: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            reverseListOrder: false,
            winnerCombo: [null],
        };
    }

    calculateWinner(squares) {
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
          return [squares[a], lines[i]];
        }
      }
      return [null, [null]];
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares)[0] || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ 
            history: history.concat([{
                squares: squares,
                move: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            winnerCombo: this.calculateWinner(squares)[1],
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    reversListOrderDisp() {
      this.setState({
        reverseListOrder: !this.state.reverseListOrder,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = this.calculateWinner(current.squares)[0];
      
      const arrWithCells = [
        'first row, first cell',
        'first row, second cell',
        'first row, third cell',
        'second row, first cell',
        'second row, second cell',
        'second row, third cell',
        'third row, first cell',
        'third row, second cell',
        'third row, third cell',
      ];
      const moves = history.map((step, move) => {
        const buttonClass = this.state.stepNumber === move ? 'button-list bold' : 'button-list';
        const desc = move ?
          ('Back to move #' + move + ' (move was to ' + arrWithCells[step.move] + ')') : 'Go to game start';
        return (
            <li key={move}>
                <button className={ buttonClass } onClick={ () => this.jumpTo(move) }>{ desc }</button>
            </li>
            );
      });

      if (this.state.reverseListOrder) {
        moves.reverse();
      }

      let status;
      if (winner) {
        status = 'Winner is ' + winner;
      } else {
        if (current.squares.includes(null)) {
          status = 'Next player: ' + (this.state.xIsNext ? 'X ' : 'O ');
        } else {
          status = 'DRAW!';
        }
        
      }

      return (
        <>
        <div className="game">
          <div className="game-board">
            <Board 
              xIsNext={this.state.xIsNext}
              winnerCombo={this.state.winnerCombo} 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <MagicButton nameOfButton="Helena "/>
            <div>{ status }<button onClick={()=>this.reversListOrderDisp()}>Order of moves: { 
              this.state.reverseListOrder ? 'from down' : 'from top' 
            }</button></div>
            <ol>{ moves }</ol>
          </div>
        </div>
        </>
        
      );
    }
  }