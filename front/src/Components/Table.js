import React from "react";

export default function ({ product, stock, price, id, img }) {
  return (
    <div key={id}>
      <table class="table table-responsive">
        <thead>
          <tr>
          <th>Número</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Eliminar</th>
            <th>Editar</th>
            <th>Aceptar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>{id}</td>
            <td>{product}</td>
            <td>{price}</td>
            <td>{stock}</td>
            <td><button>❌</button></td>
            <td><button>⚙</button></td>
            <td><button>✔</button></td>
            
            
           


          </tr>
        </tbody>
      </table>
    </div>
  );
}
