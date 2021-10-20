import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../Actions";
import { Bar } from "react-chartjs-2";
export default function Grafics() {
  // Importaciones y creacion de entorno
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.reducerPablo.orders);
  const myStorage = window.localStorage;
  let token = myStorage.getItem("jwt");
  // estados
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getOrders(token, order));
  }, []);
  const [state, setState] = useState({
    order_name: [], 
    order_ids: [],
    order_ammounts: [],
    colors: [],

  });

  const data = {
    labels: state.order_ids,
    datasets: [
      {
        label: "Dinero $",
        backgroundColor: ["rgb(155, 105, 0)", 'blue', 'black', 'green', 'red', 'yellow'],
        borderColor: "black",
        borderWidth: 2,
        hoverBackgroundColor: "rgb(131, 97, 24 )",
        hoverBorderColor: "black",
        data: state.order_ammounts,
      },
    ],
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
  };
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
    let number = (Math.random() * 15).toFixed(0);
    return characters[number];
  }

  function GenerateColors() {
    let colors = [];
    for (let i = 0; i > orders.id; i++) {
      colors.push(generateCharacter());
    }
    return colors;
  }

  function Dates() {
    setState({
      ...state,
      order_ids: orders.map((e) => e.id).reverse(),
      order_ammounts: orders.map((e) => e.ammount).reverse(),
      colors: GenerateColors(),
    });
  }
  console.log(orders);
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h2>Graficos de compras por cliente.</h2>

      <Bar data={data} options={opciones} />
      <button onClick={() => Dates()}> Ver</button>
    </div>
  );
}
