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
    order_ids: [],
    order_ammounts: [],
  });


    function Dates (){
 setState({
        ...state, 
        order_ids: orders.map((e) => e.id).reverse() ,
        order_ammounts: orders.map((e) => e.ammount).reverse(),

    })

    }
 
 const data = {

    labels: state.order_ids,    
    datasets: [
      {
        label: "Dinero", 
        backgroundColor: "rgb(196, 188, 38)",
        borderColor: "black",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(0, 255,45,24,0.2)",
        hoverBorderColor: "#fff000",
        data: state.order_ammounts,
      },
    ],
  };
 
  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h2>Graficos de compras por cliente.</h2>

      <Bar data={data} options={opciones} />
      <button onClick ={()=>Dates()}> Ver</button>
    </div>
  );
}
