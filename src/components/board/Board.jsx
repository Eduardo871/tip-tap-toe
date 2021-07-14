import "./Board.css";
import Square from "../square/Square";

const Board = ({game, winner, player,reset, changeState})=>{
    
    const createSquares = values => (
        values.map(value => (
            <Square 
            key={value}
            value={value}
            game={game}
            winner= {winner}
            reset = {reset}
            
            />
        ))
    )

    return(
        <div className="board">
            {
                winner && winner === "X" && localStorage.getItem("nameOne") === "" ? (<h1>{`Player one wins the game`}</h1>):
                winner && winner === "O" && localStorage.getItem("nameTwo") === "" ? (<h1>{`Player two wins the game`}</h1>):
                winner && winner === "X" ? (<h1>{`${localStorage.getItem("nameOne")} wins the game`}</h1>):
                winner && winner === "O" ? (<h1>{`${localStorage.getItem("nameTwo")} wins the game`}</h1>):
                winner && winner === "TIE" ? (<h1>TIE</h1>):
                (<h1>Next player: {
                    player === "X" && localStorage.getItem("nameOne") !== "" ?(localStorage.getItem("nameOne")):
                    player === "O" && localStorage.getItem("nameTwo") !== "" ? (localStorage.getItem("nameTwo")):
                    player === "X" && localStorage.getItem("nameOne") === "" ? ("player one"):("player two")
                    }</h1>)
            }
           <div className="boardOne">
            <div className="row">
                    {createSquares([0,1,2])}
                </div>
                <div className="row">
                    {createSquares([3,4,5])}
                </div>
                <div className="row">
                    {createSquares([6,7,8])}
                </div>
           </div>
           <div className="textDirection1" style={{marginBottom:"-10px"}}>
                <span className="back" onClick={()=>{changeState("selection"); reset()}}>Back</span>
                <span className="next" onClick={()=>{changeState("initial"); reset()}}>Next</span>
           </div>
          
        </div>
    )
}

export default Board;