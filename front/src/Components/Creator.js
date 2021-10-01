import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { postProduct, postCategory, postDiet } from "../Actions";
import Tables from "./Table";
import { getProducts } from "../Actions";
import 'bootstrap'
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
  const s = useSelector((state) => state.reducerPablo.products);
  console.log(s);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let dispatch = useDispatch();
  // estados locales
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    stock: "",
  });
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
      console.log(fire.secure_url);

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
  // handlers de submit

  function handlerSubmitProduct(e) {
    e.preventDefault();
    if (
      input.name &&
      input.price &&
      input.stock &&
      input.description &&
      input.image
    ) {
      dispatch(postProduct(input));
      setInput({
        name: "",
        image: "",
        price: "",
        description: "",
        stock: "",
      });
      alert(" Producto creado con exito");
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }
  function handlerSubmitCategory(e) {
    e.preventDefault();
    if (category.name && category.description) {
      dispatch(postCategory(category));
      setCategory({
        name: "",
        description: "",
      });
      alert(" Categoria creada con exito");
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }
  function handlerSubmitDiet(e) {
    e.preventDefault();
    if (diet.name && diet.description) {
      dispatch(postDiet(diet));
      setDiet({
        name: "",
        description: "",
      });
      alert(" Dieta creada con exito");
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }
  return (
    <div>
      <h1> .</h1>
      <h1>.</h1>
      <h1>.</h1>
      <Button color = 'success'> Insertar Producto</Button> {'    '}
      <Button color = 'warning'> Insertar Categoria</Button>  {'    '}
      <Button color = 'info'> Insertar Dieta</Button>  {'    '}
      <Modal>
        <ModalHeader>
          <div>
            <h3>
              Insertar Nuevo Producto
            </h3>
          </div>
        </ModalHeader>
        <form >          
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.name ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Precio</label>
            <input
              type="number"
              value={input.price}
              name="price"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.price ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Descripción </label>
            <input
              type="textarea"
              value={input.description}
              name="description"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.description ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Stock </label>
            <input
              type="number"
              value={input.stock}
              min="0"
              name="stock"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.stock ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label> imagen</label>
            <input
              type="file"
              accept="image/png, .jpeg, .jpg"
              name="image"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.image ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <button> Crear producto </button>
        </form>
      </Modal> {'    '}
      <ModalFooter>
            <Button
              color="primary"
              onSubmit={(e) => handlerSubmitProduct(e)} 
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
           
            >
              Cancelar
            </Button>
          </ModalFooter>
      <Modal>
      <ModalHeader>
          <div>
            <h3>
              Insertar Nueva Categoria
            </h3>
          </div>
        </ModalHeader>
        <form onSubmit={(e) => handlerSubmitCategory(e)}>
          <h2> agregar nueva categoria</h2>
          <div>
            <label>Nombre de categoria</label>
            <input
              name="name"
              type="text"
              value={category.name}
              onChange={(e) => handlerCategory(e)}
            />
            {!category.name ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Descripción de categoria</label>
            <input
              name="description"
              type="textarea"
              value={category.description}
              onChange={(e) => handlerCategory(e)}
            />
            {!category.description ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <button> Crear Categoria</button>
        </form>
      </Modal> {'    '}
      <Modal>
      <ModalHeader>
          <div>
            <h3>
              Insertar Nueva Dieta
            </h3>
          </div>
        </ModalHeader>
        <ModalBody onSubmit={(e) => handlerSubmitDiet(e)}>


          <h2> agregar nueva Dieta</h2>
          <div>
            <label>Nombre de Dieta</label>
            <input
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
              name="description"
              type="textarea"
              value={diet.description}
              onChange={(e) => handlerDiet(e)}
            />
            {!diet.description ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <button> Crear Dieta</button>
        </ModalBody>
      </Modal>
      {s.map((e) => {
        return (
          <div key={e.id}>
            <Tables
              id={e.id}
              product={e.name}
              stock={e.stock}
              price={e.price}
              stock={e.stock}
            />
          </div>
        );
      })}
    </div>
  );
}

/*

name, price, description, image, stock 
*/
