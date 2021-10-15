import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalGrup,
} from "reactstrap";

export default function AdminDetailsOrders({ input , closeModal}) {

  return (
    <div>
      <Modal isOpen={input.modal}>
        <ModalHeader>
          DETALLES DEL PEDIDO NRO: {input.id}{" "}
          <b class="text-success"> {input.status}</b>
        </ModalHeader>
        <ModalBody>
          <div>
            <h6>
              <b>Nombres del Cliente:</b> {input.clientName}
              {input.clientLastname}
            </h6>
          </div>
          <div>
            <h6>
              <b>Correo Electronico:</b> {input.clientMail}
            </h6>
          </div>
          <div>
            <h6>
              <b>Nro de Teléfono:</b> {input.clientPhone}
            </h6>
          </div>
          <div>
            <h6>
              <b>Dirección de envio: </b> {input.direccion}
            </h6>
          </div>

          <table className="table">
            <thead>
              <th>Nombre del Producto</th>
              <th> Cant.</th>
              <th> V.Unit.</th>
              <th> V.Total. </th>
            </thead>

            {input.productName.map((e) => (
              <tbody>
                <td><NavLink to={`Detail/${e.id}`}>{e.name}</NavLink> </td>
                <td> {e.products_order.quantity}</td>
                <td class="text-left"> $ {e.price}</td>
                <td class="text-left"> $ {e.products_order.total}</td>
              </tbody>
            ))}
            <tfoot>
              <tr>
                <td>Total: </td>
                <td />
                <td />
                <td> $ {input.total}</td>
              </tr>
            </tfoot>
          </table>
        </ModalBody>
        <ModalFooter>
      
          <Button color="danger" onClick ={(e)=>closeModal(e)}>Salir</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
