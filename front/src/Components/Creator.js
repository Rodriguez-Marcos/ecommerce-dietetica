import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { postProduct } from "../Actions";
import { postCategory } from "../Actions";

export default function Creator() {
  let dispatch = useDispatch();

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
  function handlerProduct(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handlerCategory(e) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  }
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
      setInput({
        name: "",
        description: "",
      });
      alert(" Categoria creada con exito");
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }
  return (
    <div>
      <form onSubmit={(e) => handlerSubmitProduct(e)}>
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
            value={input.image}
            name="image"
            onChange={(e) => handlerProduct(e)}
          />
          {!input.image ? <output> ❌</output> : <output> ✔</output>}
        </div>
        <button> Crear producto </button>
      </form>

      <form onSubmit={(e) => handlerSubmitCategory(e)}>
        <h2> agregar nueva categoria</h2>
        <div>
          <label>Nombre de categoria</label>
          <input
            name='name'
            type="text"
            value={category.name}
            onChange={(e) => handlerCategory(e)}
          />
          {!category.name ? <output> ❌</output> : <output> ✔</output>}
        </div>
        <div>
          <label>Descripción de categoria</label>
          <input
            name='description'
            type="textarea"
            value={category.description}
            onChange={(e) => handlerCategory(e)}
          />
          {!category.description ? <output> ❌</output> : <output> ✔</output>}
          <button> Crear Categoria</button>
        </div>
      </form>
    </div>
  );
}



/*

name, price, description, image, stock 
*/
