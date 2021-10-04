import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export default function FormCreator({
  modal,
  input,
  handlerProduct,
  c,
  d,
  handlerCategories,
  handlerDiets,
  handlerSubmitProduct,
  closeProduct,
  handlerSubmitCategory,
  category,
  diet,
  handlerCategory,
  closeCategory,
  handlerSubmitDiet,
  handlerDiet,
  closeDiet,
}) {
  return (
    <div>
      <Modal isOpen={modal.product}>
        <ModalHeader>
          <div>
            <h3>Insertar Nuevo Producto</h3>
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
              placeholder="Nombre"
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
            <label> Inserte imagen</label>
            <input
              className="form-control"
              type="file"
              accept="image/png, .jpeg, .jpg"
              name="image"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.image ? <output> ✏</output> : <output> ✔</output>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handlerSubmitProduct(e)}>
            Insertar
          </Button>
          <Button className="btn btn-danger" onClick={() => closeProduct()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal.category}>
        <ModalHeader>
          <div>
            <h3>Insertar Nueva Categoria</h3>
          </div>
        </ModalHeader>
        <ModalBody onSubmit={(e) => handlerSubmitCategory(e)}>
          <FormGroup>
            <label>Nombre de categoria</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={category.name}
              onChange={(e) => handlerCategory(e)}
            />
            {!category.name ? <output> ✏</output> : <output> ✔</output>}
          </FormGroup>
          <FormGroup>
            <label>Descripción de categoria</label>
            <input
              className="form-control"
              name="description"
              type="textarea"
              value={category.description}
              onChange={(e) => handlerCategory(e)}
            />
            {!category.description ? <output> ✏</output> : <output> ✔</output>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handlerSubmitCategory(e)}>
            Insertar
          </Button>
          <Button className="btn btn-danger" onClick={() => closeCategory()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal.diet}>
        <ModalHeader>
          <div>
            <h3>Insertar Nueva Dieta</h3>
          </div>
        </ModalHeader>
        <ModalBody onSubmit={(e) => handlerSubmitDiet(e)}>
          <div>
            <label>Nombre de Dieta</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={diet.name}
              onChange={(e) => handlerDiet(e)}
            />
            {!diet.name ? <output> ✏</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Descripción de la Dieta</label>
            <input
              className="form-control"
              name="description"
              type="textarea"
              value={diet.description}
              onChange={(e) => handlerDiet(e)}
            />
            {!diet.description ? <output> ✏</output> : <output> ✔</output>}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handlerSubmitDiet(e)}>
            Insertar
          </Button>
          <Button className="btn btn-danger" onClick={() => closeDiet()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
