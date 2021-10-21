import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalByDay } from "../Actions";
import { Bar } from "react-chartjs-2";
import Topbar from "./AdminTopBar";
import Sidebar from "./AdminSideBar";
import Bestsellers from './Grafics.best'
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
    colors: [],
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

  console.log(generateColors())
  const data = {
    labels: state.totalByDay_Day,
    datasets: [
      {
        label: "Dinero $",
        backgroundColor: generateColors(),
        borderColor: "black",
        borderWidth: 2,
        hoverBackgroundColor: generateColors(),
        hoverBorderColor: "black",
        data: state.totalByDay_Total,
      },
    ],
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
  };
  return (
    <div >
       <div>
        <Topbar />
        <Sidebar />
      </div>
      <div style={{ width: "100%", height: "500px" }}>
      <h2>Compras Diarias. </h2>
      <Bar data={data} options={opciones} />
      <button onClick={() => Dates()}> Ver</button>
      <Bestsellers/>
      </div>
    
    </div>
  );
}
