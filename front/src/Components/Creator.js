import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { postProduct, postCategory, postDiet } from "../Actions";
import Tables from "./Table";
import { getProducts, getCategories , getDiets } from "../Actions";
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

export default function Creator() {
  const p = useSelector((state) => state.reducerPablo.products);
  const c = useSelector((state) => state.reducerPablo.categories);
  const d = useSelector((state) => state.reducerPablo.diets);


  let dispatch = useDispatch();
 // Renderizados
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // estados locales
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    stock: "",
    ids_categories: [],
    ids_diets: [],
  });
  console.log(input);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });


  const [diet, setDiet] = useState({
    name: "",
    description: "",
  });


  // handlers de seteo
  async function handlerProduct(e) {
    if (e.target.name == "image") {
      let file = e.target.files;

      let formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", "imgsalvatore");
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/salvatorehnery/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const fire = await res.json();

      setInput({
        ...input,
        image: fire.secure_url,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handlerCategories(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        ids_categories: [...input.ids_categories, e.target.value],
      });
    }
    else{
      setInput({
        ...input,
        ids_categories: [],
      });

    }
  }

  function handlerDiets(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        ids_diets: [...input.ids_diets, e.target.value],
      });
    }
    else {
      setInput({
        ...input,
        ids_diets: [],
      });

    }
  }

  function handlerCategory(e) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  }


  function handlerDiet(e) {
    setDiet({
      ...diet,
      [e.target.name]: e.target.value,
    });
  }



  function handleDietsSelection(event) {

    if(event.target.value === ''){
      return
    }

    const dietsExists = input.ids_diets.find(
      (item) => item === event.target.value
    );

    if (!dietsExists) {

      setInput({
        ...input,
        ids_diets: [...input.ids_diets, event.target.value],
      });
    }
  }
  function handleCategorySelection(event) {

    if(event.target.value === ''){
      return
    }

    const categoryExists = input.ids_categories.find(
      (item) => item === event.target.value
    );

    if (!categoryExists) {

      setInput({
        ...input,
        ids_categories: [...input.ids_categories, event.target.value],
      });
    }
  }




  // handlers de submit

  function handlerSubmitProduct(e) {
    e.preventDefault();
    if (
      input.name &&
      input.price &&
      input.stock &&
      input.description &&
      input.image &&
      input.ids_diets &&
      input.ids_categories
    ) {
      dispatch(postProduct(input));
      alert(" Producto creado con exito");
      closeProduct();
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }

  function handlerSubmitCategory(e) {
    e.preventDefault();
    if (category.name && category.description) {
      dispatch(postCategory(category));

      alert(" Categoria creada con exito");
      closeCategory();
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }


  function handlerSubmitDiet(e) {
    e.preventDefault();
    if (diet.name && diet.description) {
      dispatch(postDiet(diet));

      alert(" Dieta creada con exito");
      closeDiet();
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }

  // Modales

  const [modal, setModal] = useState({
    product: false,
    category: false,
    diet: false,
  });
  function openProduct() {
    setModal({
      ...modal,
      product: true,
    });
  }
  function closeProduct() {
    setModal({
      ...modal,
      product: false,
    });
    setInput({
      name: "",
      image: "",
      price: "",
      description: "",
      stock: "",
    });
  }
  //

  function openCategory() {
    setModal({
      ...modal,
      category: true,
    });
  }

  function closeCategory() {
    setModal({
      ...modal,
      category: false,
    });
    setCategory({
      name: "",
      description: "",
    });
  }

  //

  function openDiet() {
    setModal({
      ...modal,
      diet: true,
    });
  }

  function closeDiet() {
    setModal({
      ...modal,
      diet: false,
    });
    setDiet({
      name: "",
      description: "",
    });
  }

  // INICIO DEL COMPONENTE
  return (
    <div>
      <h1> .</h1>
      <h1>.</h1>
      <h1>.</h1>
      <Button color="success" onClick={() => openProduct()}>
        {" "}
        Insertar Producto
      </Button>{" "}
      {"    "}
      <Button color="warning" onClick={() => openCategory()}>
        {" "}
        Insertar Categoria
      </Button>{" "}
      {"    "}
      <Button color="info" onClick={() => openDiet()}>
        {" "}
        Insertar Dieta
      </Button>{" "}
      {"    "}
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
            />
            {!input.name ? <output> ❌</output> : <output> ✔</output>}
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
            {!input.price ? <output> ❌</output> : <output> ✔</output>}
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
            {!input.description ? <output> ❌</output> : <output> ✔</output>}
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
            {!input.stock ? <output> ❌</output> : <output> ✔</output>}
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
            {!input.image ? <output> ❌</output> : <output> ✔</output>}
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
      </Modal>{" "}
      {"    "}
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
            {!category.name ? <output> ❌</output> : <output> ✔</output>}
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
            {!category.description ? <output> ❌</output> : <output> ✔</output>}
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
            {!diet.name ? <output> ❌</output> : <output> ✔</output>}
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
            {!diet.description ? <output> ❌</output> : <output> ✔</output>}
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
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
          
              <th>Precio</th>
              <th>Stock</th>
              <th>Acción</th>
            </tr>
          </thead>
          {p.map((e) => (
            <Tables
          
              id={e.id}
              product={e.name}
              stock={e.stock}
              price={e.price}
              stock={e.stock}
              img={e.image}
            />
          ))}
        </Table>
      </Container>
    </div>
    

  );
}
