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
  handlerCategory,
  closeCategory,
  handlerSubmitDiet,
  diet,
  handlerDiet,  
  closeDiet,
  handlerSucursal, 
  sucu, 
  handlerSubmitSucursal, 
  closeSucursal, 
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
                      />
                      {e.name}
                    </label>
                  </div>
                ))}
                <output>
                  {" "}
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
                      />
                      {e.name}
                    </label>
                  </div>
                ))}
                <output> seleccionaste: {input.ids_diets.length} dietas</output>
              </fieldset>
            </div>
          </FormGroup>

          <br />
          <FormGroup>
            <label> Inserte Imagen</label>
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
      {/* Crear Sucursal */}
      <Modal isOpen={modal.sucursal}>
        <ModalHeader>
          <div>
            <h3>Insertar Nueva Sucursal</h3>
          </div>
        </ModalHeader>
        <ModalBody onSubmit={(e) => handlerSubmitSucursal(e)}>
          <div>
            <label>Nombre de Sucursal</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={sucu.name}
              onChange={(e) => handlerSucursal(e)}
            />
            {!sucu.name ? <output> ✏</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Insertar Enlace GoogleMaps</label>
            <input
              className="form-control"
              name="src"
              type="textarea"
              value={sucu.src}
              onChange={(e) => handlerSucursal(e)}
            />
            {!sucu.src ? <output> ✏</output> : <output> ✔</output>}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handlerSubmitSucursal(e)}>
            Insertar
          </Button>
          <Button className="btn btn-danger" onClick={() => closeSucursal()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
