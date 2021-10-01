import { React, useEffect, useState } from "react";
import { deleteProductByID } from "../Actions";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export default function ({ product, stock, price, id }) {
  let [data, setData] = useState({
    id,
  });

  function handlerDelete(e) {
    e.preventDefault();
  }

  let dispatch = useDispatch();

  return (
    <div key={id}>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product}</td>
              <td>{price}</td>
              <td>{stock}</td>
              <td>
                <Button color= 'primary'>⚙</Button> {'   '}

                <Button  color ='danger'>🗑</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
