import React from  "react";
import "./Welcome.css";

const Welcome = ({changeState})=>{


    return (
        <div className="containerWelcome">
            <h1>
                Welcome to 
                <span className="spanTip">tip</span>
                <span className="spanTap">tap</span> 
                <span className="spanToe">toe</span>
            </h1>
            <button onClick={()=>{changeState('selection')}}>Press to continue</button>
        </div> 
    )
};

export default  Welcome;