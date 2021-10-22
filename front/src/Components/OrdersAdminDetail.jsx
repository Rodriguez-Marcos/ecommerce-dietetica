import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders , putOrders} from "../Actions";
import TableOrders from "./TableOrders";

// imports redireccionar
import  "bootstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { Redirect } from "react-router";


export default function OrderAdminDetail() {


  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state.reducerPablo.orders);
  const isadmin = useSelector((state) => state.reducerPablo.IsAdmin);
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
      {isadmin?
      <div>
 <TableOrders
 orders= {orders}
 handlerStatus= {handlerStatus}


 />
    
      <Modal isOpen={false}>
        <ModalHeader>
          <h4>Detalles de la Orden</h4>
          <h6>Orden Numero </h6>
        </ModalHeader>

      </Modal> </div> : <Redirect to='/'/>};



    </div>
  );
}
