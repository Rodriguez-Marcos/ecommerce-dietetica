import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { postProduct } from "../Actions";

export default function Creator() {
  let dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    stock: "",
  });
  function handlerSave(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handlerSubmit(e){
      e.preventDefault()
      if(input.name&& input.price && input.stock &&  input.description && input.image){

        dispatch(postProduct(input))
setInput({
            name: "",
            image: "",
            price: "",
            description: "",
            stock: "",
          })
      }else{
      alert("falta informacion requerida en el formulario")

      }
    }  return (
    <div>
      <form onSubmit= {(e)=>handlerSubmit(e)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handlerSave(e)}
          />
          {!input.name ? (
            <output> Requerido</output>
          ) : (
            <output> Aceptado</output>
          )}
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            value={input.price}
            name="price"
            onChange={(e) => handlerSave(e)}
          />
          {!input.price ? (
            <output> Requerido</output>
          ) : (
            <output> Aceptado</output>
          )}
        </div>
        <div>
          <label>Descripción </label>
          <input
            type="textarea"
            value={input.description}
            name="description"
            onChange={(e) => handlerSave(e)}
          />
          {!input.description ? (
            <output> Requerido</output>
          ) : (
            <output> Aceptado</output>
          )}
        </div>
        <div>
          <label>Stock </label>
          <input
            type="number"
            value={input.stock}
            min="0"
            name="stock"
            onChange={(e) => handlerSave(e)}
          />
           {!input.stock ? (
            <output> Requerido</output>
          ) : (
            <output> Aceptado</output>
          )}
        </div>
        <div>
          <label> imagen</label>
          <input
            type="file"
            accept="image/png, .jpeg, .jpg"
            value={input.image}
            name="image"
            onChange={(e) => handlerSave(e)}
          />
           {!input.image ? (
            <output> Requerido</output>
          ) : (
            <output> Aceptado</output>
          )}
        </div>
        <button> Crear producto </button>
      </form>
    </div>
  );
}

/*
    name,
            price,
            description,
            image,
            stock,
*/
