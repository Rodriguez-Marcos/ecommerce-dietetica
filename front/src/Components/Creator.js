import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postProduct, postCategory, postDiet , putProduct} from "../Actions";
import "bootstrap/dist/css/bootstrap.min.css";
import FormEdit from "./FormEdit";
import FormCreator from "./FormCreator";
import { getProducts, getCategories, getDiets } from "../Actions";
import { Table, Button, Container } from "reactstrap";

export default function Creator() {
  //estados
  const p = useSelector((state) => state.reducerPablo.products);
  const c = useSelector((state) => state.reducerPablo.categories);
  const d = useSelector((state) => state.reducerPablo.diets);
  let dispatch = useDispatch();
  // Renderizados
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getDiets());
  }, []);

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
    } else {
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
    } else {
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

  // handles edit
  function handlerSubmitProductEdit(e) {
    e.preventDefault();
    if (
      input.name &&
      input.price &&
      input.stock &&
      input.description &&
      input.image &&
      input.ids_diets.length !=0 &
      input.ids_categories.length !=0
    ) {

      dispatch(putProduct(input, input.id ));
      alert('Modificacion exitosa');
      editProductClose();
    } else {
      alert("falta informacion requerida en el formulario");
    }
  }
  console.log(input)

  // handlers de submit

  function handlerSubmitProduct(e) {
    e.preventDefault();
    if (
      input.name &&
      input.price &&
      input.stock &&
      input.description &&
      input.image &&
      input.ids_diets.length !=0 &&
      input.ids_categories.length !=0
    ) {
      console.log(input)
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

  // Modales de Producto

  const [modal, setModal] = useState({
    product: false,
    category: false,
    diet: false,
  });
  const [editModal, setEditModal] = useState({
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
      ids_categories: [],
      ids_diets: [],
    });
  }

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
  // Modales de Categoria

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

  // Modales de Dieta

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
        Insertar Producto
      </Button>{" "}
      {"    "}
      <Button color="warning" onClick={() => openCategory()}>
        Insertar Categoria
      </Button>
      {"    "}
      <Button color="info" onClick={() => openDiet()}>
        Insertar Dieta
      </Button>
      <FormCreator
        modal={modal}
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
        diet={diet}
        handlerCategory={handlerCategory}
        closeCategory={closeCategory}
        handlerSubmitDiet={handlerSubmitDiet}
        handlerDiet={handlerDiet}
        closeDiet={closeDiet}
      />
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
            <tbody key={e.id}>
              <td>
                <img src={e.image} height="60" width="80" />
              </td>
              <td>{e.name}</td>
              <td>{e.price}</td>
              <td>{e.stock}</td>
              <td>
                <Button color="primary" onClick={() => editProductOpen(e)}>
                  ✏
                </Button>
                <Button color="danger">🗑</Button>
              </td>
            </tbody>
          ))}
        </Table>
      </Container>
    </div>
  );
}
