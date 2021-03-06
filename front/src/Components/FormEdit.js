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
  Input,
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

  console.log('esto es input',input)
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
        <FormGroup>
          <div>
            <fieldset>
              <h6>Seleccionar Categorias: </h6>
              {c.map((e, i) => (

                <div class="form-check" key={i}>                
                  <label
                    onChange={(e) => handlerCategories(e)}
                    key={e.id}
                    class="form-check-label"
                  >
                    <input
                      type="checkbox"
                      value={e.id}
                      name={e.name}
                      class="form-check-input"
                      checked= {input.ids_categories.includes(e.id)? true: false}

                    />
                    {e.name}
                  </label>
                </div>
              ))}

              <output>
                seleccionaste: {input.ids_categories.length} categorias
              </output>
            </fieldset>
          </div>
          <br />
          <div>
            <fieldset>
              <h6> Seleccionar Dietas: </h6>
              {d.map((e, i) => (
                <div class="form-check" key={i}>
                  <label
                    onChange={(e) => handlerDiets(e)}
                    key={e.id}
                    class="form-check-label"
                  >
                    <input
                      type="checkbox"
                      value={e.id}
                      name={e.name}
                      class="form-check-input"
                      checked= {input.ids_diets.includes(e.id)? true: false}
                 
                   
                    />
                    {e.name}
                  </label>
                </div>
              ))}
              {"    "}
              <output> seleccionaste: {input.ids_diets.length} dietas</output>
            </fieldset>
          </div>
        </FormGroup>
        <br />
        <FormGroup>
          <label> Imagen actual: </label>
          {"               "}
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
