import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalByDay } from "../Actions";
import { Bar } from "react-chartjs-2";
import Topbar from "./AdminTopBar";
import Sidebar from "./AdminSideBar";
import Bestsellers from "./Grafics.best";
import { Button } from "reactstrap";
import './Grafics.css'
import { Accordion } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

export default function Grafics() {
  // Importaciones y creacion de entorno
  const dispatch = useDispatch();
  let totalByDay = useSelector((state) => state.reducerPablo.totalByDay);
  const myStorage = window.localStorage;
  let token = myStorage.getItem("jwt");
  totalByDay = totalByDay.data;

  // estados
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getTotalByDay(token));
  }, []);

  const [state, setState] = useState({
    totalByDay_Total: [],
    totalByDay_Day: [],
  });
  function Dates() {
    setState({
      ...state,
      totalByDay_Total: totalByDay.map((e) => e.total),
      totalByDay_Day: totalByDay.map((e) => e.createdDay.slice(0, 10)),
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
    for (let i = 0; i < state.totalByDay_Day.length; i++) {
      colors.push(GenerateHexa());
    }
    return colors;
  }


  const data = {
    labels: state.totalByDay_Day,
    datasets: [
      {
        label: "Dinero $",
        backgroundColor: generateColors(),
        borderColor: "black",
        borderWidth: 2,
        // hoverBackgroundColor: generateColors(),
        hoverBorderColor: "black",
        data: state.totalByDay_Total,
      },
    ],
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
  };


  //acordeon
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (

    <div>
      <div>
        <Topbar />
      </div>
      <div className="sidebar-graficas">
        <Sidebar />
        <div className="graficas">
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              onClick={() => Dates()}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }} />
              <Typography sx={{ color: 'text.secondary' }}>Estadistica compras diarias</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "65%", height: "500px" }}>
                {/* <Button color="primary bg-primary" onClick={() => Dates()}>
              {" "}
              <h2>Compras Diarias. </h2>
            </Button> */}
                <Bar data={data} options={opciones} />
              </div>
            </AccordionDetails>
          </Accordion>
          <Bestsellers />
        </div>
      </div>
    </div>
  );
}
