import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white',
  'transition': 'all 0.5s',
 
}
const squareCross = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'backgroundColor': 'red',
  "clipPath": "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
  'borderRadius':'50%'
}
const squareCircle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'backgroundColor': 'blue',
  'borderRadius':'50%'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}
const scoreBoardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'heigth':'100px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}


const ScoreBoard = ()=>{
  return(
    <div className="scoreBoard" style={scoreBoardStyle}>
      <div className="squareBoard"></div>
      <div className="squareBoard"></div>
    </div>
  )
}

const Square = ({value, game, resetSquare, gameWinner}) => {

  useEffect(()=>{

   setSquare({

        style: "",
        
        active: false,
      })

    if(gameWinner){

      setSquare({

        style: gameWinner,
        
        active: true,
      })
    }

  }, [resetSquare, gameWinner])

  const [square, setSquare] = useState({

    style: "",

    active: false,
    
  })

  const handleClick = (v)=>{

    const id= v.target.id;

    if(!square.active){
      
      setSquare({

        style: game(id),

        active: true

      })

    };

    

  };
  return (
      <div
        className="square"
        style={
          square.style === "X" ? (squareCross):
          square.style === "O" ? (squareCircle):
          (squareStyle)
        }
        id={value}
        onClick= {handleClick}
        >
      </div>
  )
}


const Board = ({game, reset, gameWinner, player})=> {

  const [resetSquare, setResetSquare] = useState(null)

  const createSquares = values => (
    values.map(value => (
      <Square
      key ={value}
      value={value}
      game={game}
      resetSquare={resetSquare}
      gameWinner={gameWinner}
      />
    ))
  );

  const handleReset = () =>{

    reset();

    if(resetSquare === 'reset1'){

      setResetSquare('reset2')

    } else{

      setResetSquare('reset1')

    } 

  }
  return(
     <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{player}</span></div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{gameWinner}</span></div>
        <button style={buttonStyle} onClick={handleReset}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            {createSquares([0,1,2])}
          </div>
          <div className="board-row" style={rowStyle}>
             {createSquares([3,4,5])}
          </div>
          <div className="board-row" style={rowStyle}>
             {createSquares([6,7,8])}
          </div>
        </div>
       
      </div>
  )
}


const Game = ()=>{

  const [score, setScore] = useState({
    X:0,
    O:0
  });

  const [player, setPlayer] = useState("X");

  const [moves, setMoves] = useState(Array(9).fill(null));

  const [gameWinner, setGameWinner] = useState(null);

  const  handleClick = (squareId)=>{

    const playerCopy = player;

    const movesCopy = [...moves];
    
    player === "X" && setPlayer("O");

    player === "O" && setPlayer("X");

    movesCopy.splice(squareId,1,playerCopy)

    setMoves(movesCopy);

    winner(movesCopy);

    return playerCopy
  }

  const reset = ()=>{

    setScore({
      X:0,
      O:0
    });

    setPlayer("X");

    setMoves(Array(9).fill(null));

    setGameWinner(null)
  }

  const winingPosition = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
 

  const winner = (playerMoves) => {

    for ( let i = 0; i < winingPosition.length;  i++ ){
      
      const  [ a, b, c ] = winingPosition[i];
      
      if( playerMoves[a] && playerMoves[a] === playerMoves[b] && playerMoves[a] === playerMoves[c]){

        gameOver(playerMoves[a])
        
        return

      }
    }
  }

  const gameOver = (playerWinner)=>{

    if(playerWinner){
      setGameWinner(playerWinner)
    }else{
      setGameWinner('tie')
    }
  }

  if(!moves.includes(null) && !gameWinner ){
    gameOver()
  }

  console.log(moves)

  return (
     <div className="game">
        <div className="game-board">
          <Board 
          game={handleClick}
          reset={reset}
          gameWinner={gameWinner}
          player= {player}
          />
           
        </div>
      </div>
  )
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);