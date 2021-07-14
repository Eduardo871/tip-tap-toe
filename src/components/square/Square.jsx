import React from "react";
import "./Square.css";



const Square = ( {value, game, winner, reset}) => {

    const [square, setSquare] = React.useState({
        active: false,
        class: `square`
    });

    

    React.useEffect(()=>{
        if(winner ){
            winner === "X" && setSquare({active:true, class: 'square X'});  
            winner === "O" && setSquare({active:true, class: 'square O'});  
            winner === "TEA" && setSquare({active:true, class: 'square white'});   
        }else{
            setSquare({active:false, class: 'square'});
        }
       
    }, [winner])


    

    const handleClick = (v)=>{
        const id = v.target.id;
        if(!square.active){
            setSquare({
                active: true, class:`square ${game(id)}`
            })
        };
        if(winner && square.active){
            reset()
        };
    
    }

    return(
        <div 
        className={
            winner && winner === "X"  && ![1,3,5,7].includes(value) ? (`${square.class}`):
            winner && winner === "O" && value !== 4 ? (`${square.class}`):
            winner && winner === "TIE" && [0,1,2,4,7].includes(value) ? (`square white`):
            winner && winner === "TIE" && [3,5,6,8].includes(value) ? (`square black`):
            !winner ? (`${square.class}`):
            ("square")
        }
        id={value}
        onClick={handleClick}
        >
        </div>
    )
}
export default Square;

