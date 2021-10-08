import React, { useState, useEffect, useContext } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {Container, Segment } from 'semantic-ui-react'

// import styles from "./Contador.module.css";
import { StylesContext } from "@material-ui/styles";
import Context from "../Contexts/UserContext";

const Contador = ({id}) => {
  const {counter, setCounter} = useContext(Context);
  // const [contador, setContadorGramo] = useState(0);
  // const [counterKilo, setCounterKilo] = useState(0);


  return (
    <div  >
      <div >
        <div >
          <span
            
            onClick={() => setCounter (counter  - 1)}
          >
            <RemoveIcon />
          </span>
          <span className="counter__content-controls-value">  {counter} </span>
          <span
            className="counter__content-controls-add"
            onClick={() => setCounter (counter + 1)}
          >
            <AddIcon />
         
          
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contador;


