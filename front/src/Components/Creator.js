import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  putProduct } from "../Actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Creator.css";
import FormEdit from "./FormEdit";

import TableProducts from "./TableProducts";
import Topbar from "./AdminTopBar";
import Sidebar from "./AdminSideBar";
import {
  getProductsAdmin,
  getCategories,
  getDiets,
  deleteProductByID,
} from "../Actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { decode } from "jsonwebtoken";


export default function Creator() {
  //estados
  const p = useSelector((state) => state.reducerPablo.products);
  const c = useSelector((state) => state.reducerPablo.categories);
  const d = useSelector((state) => state.reducerPablo.diets);
  const isAdmin = useSelector((state) => state.reducerPablo.IsAdmin);
  const myStorage = window.localStorage;

  let token = myStorage.getItem("jwt");
  let dispatch = useDispatch();

  // Renderizados

  useEffect(() => {
    const jwt = myStorage.getItem("jwt");
    var isadmin = decode(jwt);
    if (!!jwt) {
      dispatch({ type: "LOGIN", payload: jwt });
      dispatch({ type: "SET_LOGIN_USER", payload: isadmin.isAdmin });
    }
  }, [myStorage]);

  useEffect(() => {
    dispatch(getProductsAdmin());
    dispatch(getCategories());
    dispatch(getDiets());
  }, [dispatch, deleteProductByID]);

  // estados locales
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

  // handlers de seteo

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
      if(!input.ids_categories.includes( parseInt(e.target.value) )){
        setInput({
        ...input,
        ids_categories: [...input.ids_categories, parseInt(e.target.value) ],
      });
      }
    } else {
      setInput({
        ...input,
        ids_categories: [
          ...input.ids_categories.filter((a) => a !==  parseInt(e.target.value) )
        ],
      });
    }
  }
    console.log(input)

  function handlerDiets(e) {
 
    if (e.target.checked) {
      if(!input.ids_diets.includes(  parseInt(e.target.value) )){
        setInput({
        ...input,
        ids_diets: [...input.ids_diets, parseInt(e.target.value) ],
      });
      }
      
    } else {
      setInput({
        ...input,
        ids_diets: [...input.ids_diets.filter((a) => a !== parseInt(e.target.value) )],
      });
    }
  }

  // function handlerCategory(e) {
  //   setCategory({
  //     ...category,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  // function handlerDiet(e) {
  //   setDiet({
  //     ...diet,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  // handles edit
  function handlerSubmitProductEdit(e) {

    e.preventDefault();
    if (
      input.name &&
      input.price &&
      input.stock &&
      input.description &&
      input.image &&
      (input.ids_diets.length !== 0) & (input.ids_categories.length !== 0)
    ) {
      dispatch(putProduct(input, input.id));
      alert("Modificacion exitosa");
      editProductClose();
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }

  // Eliminar

  function deleteProduct() {
    dispatch(deleteProductByID(input.id, token));

    setInput({
      ...input,
      name: "",
      id: "",
    });
    setDeleteModal({
      ...deleteModal,
      product: false,
    });

    dispatch(getProductsAdmin());
  }



  const [editModal, setEditModal] = useState({
    product: false,
    category: false,
    diet: false,
  });
  const [deleteModal, setDeleteModal] = useState({
    product: false,
    category: false,
    diet: false,
  });

  function editProductOpen(e) {

    setEditModal({
      ...editModal,
      product: true,
    });

    setInput({
      ...input,
      id: e.id,
      name: e.name,
      image: e.image,
      price: e.price,
      description: e.description,
      stock: e.stock,
      ids_categories : e.categories.map(e=>e.id),
      ids_diets: e.diets.map(e=>e.id)

    });
  }
  function editProductClose() {
    setEditModal({
      ...editModal,
      product: false,
    });
    setInput({
      name: "",
      image: "",
      price: "",
      description: "",
      stock: "",
      ids_categories: [],
      ids_diets: [],
    });
  }

  function openDeleteProduct(e) {
    setDeleteModal({
      ...deleteModal,
      product: true,
    });
    setInput({
      ...input,
      name: e.name,
      id: e.id,
    });
  }
  function closeDeleteProduct() {
    setDeleteModal({
      ...deleteModal,
      product: false,
    });
    setInput({
      ...input,
      name: "",
      id: "",
    });
  }

 
  return (
    <div className="creator">
      <Topbar />
      <div className="others">
        <div className="screem">
          <Sidebar />
        </div>
        <div>
          {/* 
      Modales de Edicion 
      
      */}
          <FormEdit
            d={d}
            c={c}
            editModal={editModal}
            input={input}
            handlerProduct={handlerProduct}
            handlerCategories={handlerCategories}
            handlerDiets={handlerDiets}
            handlerSubmitProduct={handlerSubmitProductEdit}
            editProductClose={editProductClose}
          />
          <div>
            <TableProducts
              p={p}
              editProductOpen={editProductOpen}
              openDeleteProduct={openDeleteProduct}
            />
          </div>
          <div>
            <Modal isOpen={deleteModal.product}>
              <ModalHeader>Eliminar Producto</ModalHeader>
              <ModalBody>
                Desea eliminar :{" "}
                <strong class="badge bg-primary text-wrap  w: 10rem">
                  {" "}
                  {input.name}
                </strong>{" "}
                de la Lista ?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => deleteProduct()}>
                  {" "}
                  Aceptar
                </Button>
                <Button color="danger" onClick={(e) => closeDeleteProduct(e)}>
                  {" "}
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
