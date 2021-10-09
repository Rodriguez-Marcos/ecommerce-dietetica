import { React } from "react"; import "bootstrap";
import {
  Button,
} from "reactstrap";
import Topbar from "./AdminTopBar";
import Sidebar from "./AdminSideBar";
import './TableOrders.css'

export default function TableOrders({ orders, handlerStatus }) {
  return (
    <div className="ordersContenedor">
      <Topbar />
      <div className="ordersTable-Sidebar">
        <Sidebar />
        <table className="table1">
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
                <td>{e.client ? e.client.name : 'User'} {'  '}{e.client ? e.client.lastname : 'No Found '} </td>
                <td>{e.client ? e.client.email : 'No Found'}</td>
                <td>{e.createDate.slice(0, 10)}  -  {e.createDate.slice(11, 16)} hrs</td>
                <td> $ {e.ammount}</td>

                <td>
                  <select
                    className="form-select"
                    onChange={(value) => handlerStatus(value, e.id)} name='seleccionar' >
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
      </div>
    </div>
  );
}
