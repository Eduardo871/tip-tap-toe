import {useState, useEffect} from "react";
import './App.css';
import Board from "./components/board/Board";
import Welcome from "./components/welcome/Welcome"
import Selection from "./components/selection/Selection"

const  App= () => {
  
  const [state, setState] = useState('initial'); // initial | selection | startedGame  
  const [player, setPlayer] = useState('X'); // "X" o "O"
  const [moves, setMoves] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(false) // "X"  | "O" | TIE

  const movesWinners = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
  ]

  const playerWinner = (array)=>{

    for(let i=0; i < movesWinners.length; i++){
      const [ a, b, c] = movesWinners[i];
      if(array[a] && array[a] === array[b] && array[a] === array[c]){
        setWinner(array[a]);
        return
      }
    }
  }

  const onChange = (squareId)=>{
    const newMoves = [...moves];
    const newPlayer = player;
    player && player === "X" && setPlayer('O');
    player && player === "O" && setPlayer('X');
    newMoves[squareId] = newPlayer;
    setMoves(newMoves);
    playerWinner(newMoves);
    return newPlayer;
  }

  if(!winner && !moves.includes(null)){
    setWinner('TIE')
  }
  const reset = ()=>{
    setPlayer('X');
    setMoves(Array(9).fill(null));
    setWinner(false)
  }

  return (
    <div className="container"> 

    {
       state && state === "initial" ? ( <Welcome changeState={setState} />):
       state && state === "selection" ? ( <Selection changeState={setState}/> ):
       state && state === "startedGame" ? ( 
       <Board 
       changeState={setState} 
       game={onChange}
       winner={winner}
       player={player}
       reset={reset}
      />
       ):
      //  state && state === "selection" ? (<Selection changeState={setState}/> ):
      //  state && state === "initial" ? ( <Welcome changeState={setState} />):
       ("about")
    }
    
    
    </div>
  );
}

export default App;
