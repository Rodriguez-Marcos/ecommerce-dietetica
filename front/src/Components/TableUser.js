import { React } from "react";
import "bootstrap";
import { Button} from "reactstrap";
import './TableUser.css'
import Sidebar from "./AdminSideBar";


export default function TableUser({clients,borrar,handlerUpdateUser}) {
  return (
      <div className='coint'>
          <Sidebar></Sidebar>
          
        <div className= 'contenedor'  >
    <table className={`tablaproductos`}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Acción</th>
        </tr>
      </thead>
      {clients ? clients.map((e) => (
        <tbody key={e.id}>
          <td>{e.id} </td>
          <td>{e.name}</td>
          <td>{e.lastname}</td>
          <td>{e.email}</td>
          <td>{e.isAdmin ? 'Si':'No'}</td>
          <td>
            {e.isAdmin ?
            <Button color="primary" onClick={()=>handlerUpdateUser(e.id)}>
            Quitar de admin
            </Button> : 
            <Button color="primary" onClick={()=>handlerUpdateUser(e.id)}>
            Transformar en admin
          </Button>}
            <Button color="danger"  onClick={()=>{borrar(e.id)}}>
              🗑
            </Button>
          </td>
        </tbody>
      )):console.log('hola')}
    </table>
  </div>
  </div>
  )
 
}
