import React, { useEffect, useState } from 'react'
import Square from './Square'
import './style.css'

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [tobeFilled, setToBeFilled] = useState('X')
    const [history, setHistory] = useState([])

    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) {
            return
        }
        const nextSquares = [...squares];
        nextSquares[i] = tobeFilled;
        setSquares(nextSquares);

        setHistory([...history, nextSquares]);

        if (tobeFilled === "O") {
            setToBeFilled("X")
        } else {
            setToBeFilled("O")
        }
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (!winner && !squares.includes(null)) {
        status = `GAME TIED`;
    }
    else {
        status = `Next player: ${tobeFilled}`;
    }


    function calculateWinner(squares) {
        const winningSituations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < winningSituations.length; i++) {
            const [a, b, c] = winningSituations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const handleGoBack = () => {
        // const newHistory = history.slice(0, -1);
        let newHistory =[]
        for (let index = 0; index < history.length-1; index++) {
           newHistory.push(history[index]);  
        }
        setHistory(newHistory);

        if (newHistory.length > 0) {
            setSquares(newHistory[newHistory.length - 1]);
            setToBeFilled(tobeFilled === "X" ? "O" : "X")
        } else {
            setSquares(Array(9).fill(null));
            setToBeFilled('X')
        }
    };

    const handleRestart = () => {
        setHistory([]);
        setSquares(Array(9).fill(null));
        setToBeFilled('X')
    };

    return (
        <div>
            <div className="status">{squares.includes("X") ? status : "START GAME"}</div>
            <div className='board-row'>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>

            <button onClick={handleRestart}>Restart</button>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    )
}

export default Board