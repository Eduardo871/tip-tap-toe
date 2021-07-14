import React from "react";
import "./Selection.css";

const Selection = ({changeState}) => {

    const [stateSelect, setStateSelect] = React.useState("inputOne") // inputOne | inputTwo
    const [text, setText] = React.useState({
       nameOne: '',
       nameTwo: '' 
    });
    const handleChange = (v)=>{
        const id = v.target.id;
        const value = v.target.value;

        if(id === "one"){

            setText({
                ...text, nameOne: value
            });

        }else if (id === "two"){

            setText({
                ...text, nameTwo: value
            });

        }
    };
    
    

    if(stateSelect && stateSelect === "inputOne"){
        return (
            <div className="containerSelection"> 
                <div className="inputContent">
                    <h1>Select the name of player one</h1>
                    <input type="text" value={text.nameOne} placeholder="Please enter your name" id="one" onChange={handleChange}/>
                </div>
                <div className="textDirection">
                    <span className="back" onClick={()=> {
                        changeState('initial')
                        localStorage.clear()
                    }}>Back</span>
                    <span className="next" onClick={()=>{
                        localStorage.setItem('nameOne', text.nameOne)
                        setStateSelect("inputTwo")
                        }}>Next</span>
                </div>
            </div>
        )
    }else if (stateSelect && stateSelect === "inputTwo"){
        return(
            
             <div className="containerSelection"> 
                <div className="inputContent">
                    <h1>Select the name of player two</h1>
                    <input type="text" value={text.nameTwo} placeholder="Please enter your name" id="two" onChange={handleChange}/>
                </div>
                <div className="textDirection">
                    <span className="back" onClick={()=>{setStateSelect("inputOne")}}>Back</span>
                    <span className="next" onClick={()=>{
                        localStorage.setItem('nameTwo', text.nameTwo)
                        changeState('startedGame')
                        }}>Next</span>
                </div>
            </div>
        )
    }
}
export default Selection;