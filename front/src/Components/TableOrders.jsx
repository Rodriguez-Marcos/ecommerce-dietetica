import { React } from "react";
import "bootstrap";
import { Button } from "reactstrap";
import Topbar from "./AdminTopBar";
import Sidebar from "./AdminSideBar";
import AdminDetailsOrders from "./AdminDetailsOrders";
import "./TableOrders.css";
import { useState } from "react";

export default function TableOrders({ orders, handlerStatus }) {
  const [state, setstate] = useState({

    clientName: "",
    clientLastname: "",
    clientPhone: "",
    clientMail: "",
    productName: [], 
    direccion: "",
    id:'', 
    date: "",
    total:'',
    status: '', 
    modal: false,
  });

  function handlerDetails(e) {
    console.log('esto es e',e)
   

        setstate({
          ...state,
         modal:true, 
         id: e.id,
         direccion: e.shippingAddress,
         date: e.createDate,
         total: e.ammount, 
         status: e.status,
         clientName: e.client? e.client.name : 'No Found',
         clientLastname: e.client? e.client.lastname : 'No Found',
         clientPhone: e.client? e.client.phone : 'No Found',
         clientMail: e.client? e.client.email : 'No Found',
         productName: e.products ? e.products.filter(e=> e.name) : 'No Found'

        })

       
  }
  function closeModal(e){

    setstate({
      ...state,
     modal:false, 
    

    })

  }

  

  return (
    <div className="ordersContenedor">
      <Topbar />
      <div className="ordersTable-Sidebar">
        <Sidebar />
        <table className={` ${"table"} `}>
          <thead>
            <tr>
              <th>Numero: </th>
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
                <td>
                  {e.client ? e.client.name : "User"} {"  "}
                  {e.client ? e.client.lastname : "No Found "}{" "}
                </td>
                <td>{e.client ? e.client.email : "No Found"}</td>
                <td>
                  {e.createDate.slice(0, 10)} - {e.createDate.slice(11, 16)} hrs
                </td>
                <td> $ {e.ammount}</td>

                <td>
                  <select
                    className="form-select"
                    onChange={(value) => handlerStatus(value, e.id)}
                    name="seleccionar"
                  >
                    <option disabled="disabled" selected="true">
                      {" "}
                      {e.status}
                    </option>

                    <option value="creada"> creada</option>
                    <option value="procesando"> procesando</option>
                    <option value="cancelada"> cancelada</option>
                    <option value="completa"> completa</option>
                  </select>
                </td>

                <td>
                  <Button color="primary" onClick={()=>handlerDetails(e)}> Ver Mas </Button>
                </td>
              </tbody>
            ))
          ) : (
            <div>Cargando </div>
          )}
        </table>
      </div>
      <AdminDetailsOrders  input= {state} closeModal ={closeModal}  />
    </div>
  );
}
