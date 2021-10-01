import { React, useEffect, useState } from "react";
import { deleteProductByID } from "../Actions";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap";
import {
  Button,
} from "reactstrap";

export default function ({ product, stock, price, id, img,  }) {
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
    

      <td>{price}</td>
      <td>{stock}</td>
      <td>
        <Button color="primary">⚙</Button> {"   "}
        <Button color="danger">🗑</Button>
      </td>
    </tbody>
  );
}
