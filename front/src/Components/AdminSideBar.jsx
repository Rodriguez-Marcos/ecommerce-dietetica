import { React, useState } from "react";
import "./AdminSideBar.css";
import FormCreator from "./FormCreator";

import { useSelector, useDispatch } from "react-redux";
import {
  postProduct,
  getProductsAdmin,
  postCategory,
  postDiet,
} from "../Actions";

import {

  BarChart,

  DynamicFeed,

  Report,
  
} from "@material-ui/icons";

import { NavLink } from "react-router-dom";
import {Navbar, Container} from 'react-bootstrap'

export default function Sidebar() {
  const c = useSelector((state) => state.reducerPablo.categories);
  const d = useSelector((state) => state.reducerPablo.diets);
  const myStorage = window.localStorage;
  let token = myStorage.getItem("jwt");
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
    description: "",
    stock: "",
    ids_categories: [],
    ids_diets: [],
  });
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [diet, setDiet] = useState({
    name: "",
    description: "",
  });



 


  async function handlerProduct(e) {
    if (e.target.name === "image") {
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
    } else {
      setInput({
        ...input,
        ids_categories: [
          ...input.ids_categories.filter((a) => a !== e.target.value),
        ],
      });
    }
  }

  function handlerDiets(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        ids_diets: [...input.ids_diets, e.target.value],
      });
    } else {
      setInput({
        ...input,
        ids_diets: [...input.ids_diets.filter((a) => a !== e.target.value)],
      });
    }
  }

  function handlerSubmitProduct(e) {
    e.preventDefault();
    if (
      input.name &&
      input.price &&
      input.stock &&
      input.description &&
      input.image &&
      input.ids_diets.length !== 0 &&
      input.ids_categories.length !== 0
    ) {
      dispatch(postProduct(input, token));
      alert(" Producto creado con exito");
      console.log(token, "este es el token del action");
      dispatch(getProductsAdmin());
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

  function handlerDiets(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        ids_diets: [...input.ids_diets, e.target.value],
      });
    } else {
      setInput({
        ...input,
        ids_diets: [...input.ids_diets.filter((a) => a !== e.target.value)],
      });
    }
  }



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
  function openCategory() {
    setModal({
      ...modal,
      category: true,
    });
  }
  function openDiet() {
    setModal({
      ...modal,
      diet: true,
    });
  }

  function closeProduct() {
    setModal({
      ...modal,
      product: false,
    })
    setInput({
      id: "",
      name: "",
      image: "",
      price: "",
      description: "",
      stock: "",
      ids_categories: [],
      ids_diets: [],
    
    })
    
    ;}
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


  return (
    <Navbar bg="light" expand="lg" id="ContenedorNav">
    <Container id="navResponsive">
      <Navbar.Brand href="#home">Menu</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
       
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Agregar Elementos</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Usuarios
            </li> */}
            
            <li className="sidebarListItem" onClick={() => openProduct()}>
              <button className="sidebarIcon"  />
              Productos
            </li>

            <li className="sidebarListItem" onClick={() => openCategory()}>
              <BarChart className="sidebarIcon" />
              Categorias
            </li>
            <li className="sidebarListItem"  onClick={() => openDiet()}>
              <BarChart className="sidebarIcon" />
              Dietas
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tablas</h3>
          <ul className="sidebarList">
          <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/grafics'>Graficas</NavLink>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/user'>Usuarios</NavLink>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin'> Productos</NavLink>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/orders'>Ordenes</NavLink>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/filters'>Categorias y Dietas</NavLink>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/sucursal'>Sucursales</NavLink>
            </li>

          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Finalizar</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li> */}
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              <NavLink to='/home'>Salir</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
      </Navbar.Collapse>
    </Container>
    <FormCreator
    modal ={modal}
    input={input}
    handlerProduct={handlerProduct}
    c={c}
    d={d}
    handlerCategories={handlerCategories}
  handlerDiets={handlerDiets}
  handlerSubmitProduct={handlerSubmitProduct}
  closeProduct={closeProduct}
  handlerSubmitCategory={handlerSubmitCategory}
  category={category}
  handlerCategory={handlerCategory}
  closeCategory={closeCategory}
  handlerSubmitDiet={handlerSubmitDiet}
  diet={diet}
  handlerDiet={handlerDiet}
  closeDiet={closeDiet}













    





    />
  </Navbar>

  );
}