import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../Actions";

// imports redireccionar
import "bootstrap";
import { Button } from "reactstrap";

export default function OrderAdminDetail() {
  const orders = useSelector((state) => state.reducerPablo.orders);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const [status, setStatus] = useState({
    actual: orders.status,
    id: "",
  });
  function handlerStatus(event, order) {
  
    if (event.target.value != status.actual) {
      setStatus({
        ...status,
        actual: event.target.value,
        id: order.id
      });
    } 
  }

  console.log(status);
  return (
    <div className="container">
      <h1> separacion </h1>
      <h1> separacion </h1>
      <h1> separacion </h1>
      <h1> separacion </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nro: </th>
            <th>Datos del cliente:</th>
            <th>Dirección de envio:</th>
            <th>Fecha de pedido:</th>
            <th>Total:</th>
            <th>Estado:</th>
            <th>Detalles:</th>
          </tr>
        </thead>

        {orders ? (
          orders.map((e) => (
            <tbody>
              <td>{e.id}</td>
              <td>{e.id_client}</td>
              <td>{e.shippingAddress}</td>
              <td>{e.createDate.slice(0, 10)}</td>
              <td> $ {e.ammount}</td>
              <td>
                <select
                  className="form-select"
                  onChange={(value) => handlerStatus(value, e)}
                >
                  <option value="creada"> Creada</option>
                  <option value="procesando"> Procesando</option>
                  <option value="cancelada"> Cancelada</option>
                  <option value="completa"> Completa</option>
                </select>
              </td>

              <td>
                <Button color="primary"> Ver Mas </Button>
              </td>
            </tbody>
          ))
        ) : (
          <div>Cargando </div>
        )}
      </table>
    </div>
  );
}
