import React from "react";
import { Button } from "reactstrap";


export default function UserOrders({orders,handlerDetails}){


return(
    <div>
        <div>
        <table className='table'>
      <thead>
        <tr>
          <th>Numero: </th>
          <th>Fecha de pedido:</th>
          <th>Total:</th>
          <th>Estado:</th>
        </tr>
      </thead>

      {orders ? (
        orders.map((e) => (
          <tbody>
            <td>{e.id}</td>
            
            <td>
              {e.createDate.slice(0, 10)} - {e.createDate.slice(11, 16)} hrs
            </td>
            <td> $ {e.ammount}</td>

            <td>
               {e.status}  
            </td>

            <td>
              <Button color="primary" onClick={() => handlerDetails(e)} >
                {" "}
                Ver Mas{" "}
              </Button>
            </td>
          </tbody>
        ))
      ) : (
        <div>Cargando </div>
      )}
    </table>
        </div>
        </div>
)
}