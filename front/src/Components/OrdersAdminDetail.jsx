import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders , putOrders} from "../Actions";

// imports redireccionar
import "bootstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";


export default function OrderAdminDetail() {


  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state.reducerPablo.orders);
  const {client} = orders
  const [estado, setStatus] = useState({
    status: orders.status,
    id: "",
  });
  function handlerStatus(event, id) {
  
    if (event.target.value != estado.actual) {
      setStatus({
        ...estado,
        status: event.target.value,
        id: id
      });
     
      dispatch(putOrders({status: event.target.value}, id))
    } 
    dispatch(getOrders());
  }




  return (
    <div className="container">
 
      <table className="table">
        <thead>
          <tr>
            <th>Nro: </th>
            <th>Datos del cliente:</th>
            <th>Email</th>
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
              <td>{e.client? e.client.name: 'User' } {'  '}{e.client? e.client.lastname: 'No Found ' } </td>
              <td>{e.client? e.client.email: 'No Found' }</td>
              <td>{e.createDate.slice(0, 10)}  -  {e.createDate.slice(11,16)} hrs</td>
              <td> $ {e.ammount}</td>
           
              <td>
                <select
                  className="form-select"
                  onChange={(value) => handlerStatus(value, e.id) }name= 'seleccionar' >
                          <option disabled="disabled" selected="true" > {e.status}</option>

                  <option value="creada"> creada</option>
                  <option value="procesando"> procesando</option>
                  <option value="cancelada"> cancelada</option>
                  <option value="completa"> completa</option>
                </select>
              </td>

              <td>
                <Button color="primary" > Ver Mas </Button>
              </td>
            </tbody>
          ))
        ) : (
          <div>Cargando </div>
        )}
      </table>
      <Modal isOpen={false}>
        <ModalHeader>
          Detalles de la Orden 
        </ModalHeader>

      </Modal>


    </div>
  );
}
