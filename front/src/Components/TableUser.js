import { React } from "react";
import "bootstrap";
import { Button } from "reactstrap";
import './TableUser.css'
import Sidebar from "./AdminSideBar";
import Topbar from "./AdminTopBar";


export default function TableUser({ clients, borrar, handlerUpdateUser, handleChangePassword }) {
  return (
    <div className='coint'>
      <Topbar />
      <div className="tab-sidebar">
        <Sidebar />
        <div className='contenedor'  >
          <table className={`tablaproductos` } class= 'table'>
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
                <td>{e.isAdmin ? 'Si' : 'No'}</td>
                <td>
                  {e.isAdmin ?
                    <Button color="primary text-dark bg-warning" onClick={() => handlerUpdateUser(e.id)}>
                      Quitar de admin
                    </Button> :
                    <Button color="primary text-dark bg-success" onClick={() => handlerUpdateUser(e.id)}>
                      Transformar en admin
                    </Button>}{'   '}
                  <Button color="danger text-dark bg-info " onClick={() => { handleChangePassword(e.id) }}>
                    Forzar Password Reset
                  </Button>{'   '}
                  <Button color="danger text-dark bg-danger " onClick={() => { borrar(e.id) }}>
                    🗑 
                  </Button>
                </td>
              </tbody>
            )) : <div>Cargando...</div>}
          </table>
        </div>
      </div>
    </div>
  )

}
