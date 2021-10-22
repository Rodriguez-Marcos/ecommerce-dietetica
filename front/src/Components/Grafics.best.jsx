import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBestSellers } from "../Actions";
import { Pie } from "react-chartjs-2";
import "chart.piecelabel.js";
import {
  Button,

} from "reactstrap";
import { Accordion } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

export default function Bestsellers() {
  // Importaciones y creacion de entorno
  const dispatch = useDispatch();
  let bestsellers = useSelector((state) => state.reducerPablo.bestseller);
  const myStorage = window.localStorage;
  let token = myStorage.getItem("jwt");
  bestsellers = bestsellers.data;

  // estados

  useEffect(() => {
    dispatch(getBestSellers(token));
  }, [dispatch]);

  const [state, setState] = useState({
    id_product: [],
    productQuantity: [],
    name: [],
  });
  function Dates() {
    setState({
      ...state,
      productQuantity: bestsellers.map((e) => e.productQuantity),
      id_product: bestsellers.map((e) => e.id_product),
      name: bestsellers.map((e) => e.name),
    });
  }

  function generateCharacter() {
    let characters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let num = (Math.random() * 15).toFixed(0);
    return characters[num];
  }

  function GenerateHexa() {
    let color = "";
    for (let i = 0; i < 6; i++) {
      color = color + generateCharacter();
    }
    return "#" + color;
  }

  function generateColors() {
    let colors = [];
    for (let i = 0; i < state.id_product.length; i++) {
      colors.push(GenerateHexa());
    }
    return colors;
  }

  console.log(generateColors());
  const data = {
    labels: state.name,
    datasets: [
      {
        data: state.productQuantity,
        backgroundColor: generateColors(),
        // borderColor: "black",
        // borderWidth: 2,
        // hoverBackgroundColor: generateColors(),
        // hoverBorderColor: "black",
      },
    ],
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
    pieceLabel: {
      render: function (arg) {
        return arg.label + ":" + arg.value;
      },
      fontSize: "15",
      fontColor: "#fff",
      fontFamily: "Arial",
    },
  };

    //acordeon
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  

  return (
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
    <AccordionSummary
      // expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2bh-content"
      id="panel2bh-header"
      onClick={() => Dates() }
    >
      <Typography sx={{ width: '33%', flexShrink: 0 }}>Estadistica Productos mas vendidos</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <div style={{ width: "65%", height: "500px" }}>
      {/* <Button onClick={() => Dates() } color="primary bg-primary">
        {" "}
        <h2>Productos más Vendidos </h2>
      </Button> */}
      <Pie data={data} options={opciones} />
    </div>
    </AccordionDetails>
  </Accordion>
   
  );
}
