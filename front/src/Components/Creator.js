import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postProduct, postCategory, postDiet, getDiets, getCategories } from "../Actions";
import Table from "./Table";
import { getProducts } from "../Actions";
import './Creator.css'

export default function Creator() {
  const s = useSelector((state) => state.reducerPablo.products);
    const diets = useSelector(state => state.reducerPablo.diets)
    const categories = useSelector(state => state.reducerPablo.categories)


  useEffect(() => {
    dispatch(getProducts());
    dispatch(getDiets());
    dispatch(getCategories());
  }, []);

  let dispatch = useDispatch();



  // estados locales
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    stock: "",
    ids_categories:[],
    ids_diets:[],
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
      setInput({
        name: "",
        image: "",
        price: "",
        description: "",
        stock: "",
        ids_diets:[],
        ids_categories:[],
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
    <div className='soloprueba'>
      <h1> Add products</h1>
      <div >
      <div>
        <form onSubmit={(e) => handlerSubmitProduct(e)}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.name ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={input.price}
              name="price"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.price ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Description </label>
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
            <label> image</label>
            <input
              type="file"
              accept="image/png, .jpeg, .jpg"
              name="image"
              onChange={(e) => handlerProduct(e)}
            />
            {!input.image ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Diet type: </label>
            <input type="text" name="ids_diets" value={input.ids_diets} placeholder='Diets' />
            <select onChange={handleDietsSelection}>
              <option value=''>Select a diets</option>
              {
                diets?.map((item, i) => {
                  return  <option value={item.name} key={i} >{item.name}</option>;
                })
              }
            </select>
              {!input.ids_diets.length ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <div>
            <label>Category: </label>
            <input type="text" name="ids_categories" value={input.ids_categories} placeholder='Category' />
            <select onChange={handleCategorySelection}>
              <option value=''>Select a category</option>
              {
                categories?.map((item, i) => {
                  return  <option value={item.name} key={i} >{item.name}</option>;
                })
              }
            </select>
              {!input.ids_categories.length ? <output> ❌</output> : <output> ✔</output>}
          </div>
          <button> Crear producto </button>
        </form>
      </div>
      {/* //////////////////////////////////////////////////////////////////
     ///////////////////////    CATEGORIA
     ////////////////////////////////////////////////// */}
      <div>
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
      </div>
      {/* //////////////////////////////////////////////////////////////////
     ///////////////////////    DIETA
     ////////////////////////////////////////////////// */}
      <div>
        <form onSubmit={(e) => handlerSubmitDiet(e)}>
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
        </form>
      </div>
      {s.map((e) => {
        return (
          <div key={e.id}>
            <Table
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
    </div>

  );
}

/*

name, price, description, image, stock
*/
