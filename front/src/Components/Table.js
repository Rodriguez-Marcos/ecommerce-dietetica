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

export default function ({ product, stock, price, id, img, description }) {
  let [data, setData] = useState({
    id,
  });

  function handlerDelete(e) {
    e.preventDefault();
  }

  let dispatch = useDispatch();

  return (
    <tbody key={id}>
      <td>
        {" "}
        <img src={img} height="60" width="80" />
      </td>
      <td>{product}</td>
      <td>{description}</td>

      <td>{price}</td>
      <td>{stock}</td>
      <td>
        <Button color="primary">⚙</Button> {"   "}
        <Button color="danger">🗑</Button>
      </td>
    </tbody>
  );
}
