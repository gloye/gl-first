import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
    return (
        <button className={props.class} onClick={props.onClick}>
            {props.value}
        </button>
    );
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
            return {
                winner: squares[a],
                winnerPosition: lines[i]
            }
        }
    }
    return null;
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                key = {i}
                class = {this.props.winnerPosition.indexOf(i)>-1?'highlight square':'square'}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }

    render() {
        // let divRoot = []
        let divParent = []
        for (let i = 0; i < 3; i++) {
            let divRow = []
            for (let j = 0; j < 3; j++) {
                divRow.push(this.renderSquare(3*i+j))
            }
            divParent.push(<div className="board-row" key={i}>{divRow}</div>)
        }
        return (
               <div>{divParent}</div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            coordsHis: [],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        const coordsList = ['(1,1)', '(1,2)', '(1,3)', '(2,1)', '(2,2)', '(2,3)', '(3,1)', '(3,2)', '(3,3)'];
        const coordCurrent = coordsList[i]
        let coordsHis = this.state.coordsHis.slice()
        coordsHis.push(coordCurrent)

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            coordsHis: coordsHis
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }

    render() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);

        const coordsHis = this.state.coordsHis;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Move' + coordsHis[move - 1] :
                'Game start';
            return (
                <li key={move} className={this.state.stepNumber === move ? 'bold' : ''}>
                    <button type="button" className="button" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        let position;
        if (winner) {
            status = 'Winner: ' + winner.winner;
            position = winner.winnerPosition;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winnerPosition = {position?position:[]}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
