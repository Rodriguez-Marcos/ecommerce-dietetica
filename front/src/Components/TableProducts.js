import { React } from "react";
import s from './TableProducts.module.css'
import "bootstrap";
import {
  Button,

} from "reactstrap";

export default function  TableProducts({p, editProductOpen, openDeleteProduct  }) {
 

  return (
    <div className='container'>
    <div className= {s.content}  >
    <table className={` ${s.TableProducts} table`}>
      <thead>
        <tr>
          <th>Imagen:</th>
          <th>Producto:</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acción</th>
        </tr>
      </thead>

      {p.map((e) => (
        <tbody key={e.id}>
          <td>
            <img src={e.image} height="60" width="80" />
          </td>
          <td>{e.name}</td>
          <td>{e.price}</td>
          <td>{e.stock}</td>
          <td>
            <Button color="primary bg-primary" onClick={() => editProductOpen(e)}>
              ✏
            </Button>
            <Button color="danger  bg-danger" onClick={() => openDeleteProduct(e)}>
              🗑
            </Button>
          </td>
        </tbody>
      ))}
    </table>
  </div>
  </div>

  )
 
}
