import React from "react";
import { useState } from "react";

import "bootstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export default function FormEdit({
  c,
  d,
  editModal,
  input,
  handlerProduct,
  handlerCategories,
  handlerDiets,
  handlerSubmitProduct,
  editProductClose,
}) {
  const [edit, setEdit] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    stock: "",
    ids_categories: [],
    ids_diets: [],
  });

  return (
    <Modal isOpen={editModal.product}>
      <ModalHeader>
        <div>
          <h3>Editar Producto: {input.name} </h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <input
            className="form-control"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handlerProduct(e)}
          />{" "}
          {!input.name ? <output>✏</output> : <output> ✔</output>}
        </FormGroup>
        <FormGroup>
          <input
            className="form-control"
            type="number"
            value={input.price}
            name="price"
            placeholder="precio"
            onChange={(e) => handlerProduct(e)}
          />
          {!input.price ? <output> ✏</output> : <output> ✔</output>}
        </FormGroup>
        <FormGroup>
          <input
            className="form-control"
            type="textarea"
            value={input.description}
            name="description"
            placeholder="Descripcion"
            onChange={(e) => handlerProduct(e)}
          />
          {!input.description ? <output> ✏</output> : <output> ✔</output>}
        </FormGroup>
        <FormGroup>
          <input
            className="form-control"
            type="number"
            value={input.stock}
            min="0"
            name="stock"
            placeholder="Stock"
            onChange={(e) => handlerProduct(e)}
          />
          {!input.stock ? <output> ✏</output> : <output> ✔</output>}
        </FormGroup>
        <div>
          <h4> Elegir Categorias</h4>
          {c.map((e, i) => (
            <div class="form-check">
              <label key={i} class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="ids_categories"
                  value={e.id}
                  onChange={(e) => handlerCategories(e)}
                />
                {e.name}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h4> Elegir Dieta</h4>
          {d.map((e, i) => (
            <div class="form-check">
              <label key={i} class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="ids_diets"
                  value={e.id}
                  onChange={(e) => handlerDiets(e)}
                />
                {e.name}
              </label>
            </div>
          ))}
        </div>
        <FormGroup>
          <label> Imagen actual:  </label>
          {'                                     '}
          {!input.image ? (
            <output> ✏</output>
          ) : (
            <output>
              <img src={input.image} width="30" height="30"></img>
            </output>
          )}
          <input
            className="form-control"
            type="file"
            accept="image/png, .jpeg, .jpg"
            name="image"
            onChange={(e) => handlerProduct(e)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={(e) => handlerSubmitProduct(e)}>
          Editar
        </Button>
        <Button className="btn btn-danger" onClick={(e) => editProductClose(e)}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
