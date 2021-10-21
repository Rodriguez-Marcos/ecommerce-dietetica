import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCategories, getDiets,  deleteCategory,  deleteDiets,} from "../Actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AdminSideBar from './AdminSideBar'
import AdminTopBar from './AdminTopBar'
import './TableUser.css'



export default function AdminDietAndCategory() {
  const c = useSelector((state) => state.reducerPablo.categories);
  const d = useSelector((state) => state.reducerPablo.diets);
  const [sucursal, setSucursal] = useState([])
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDiets());
    }, []);

  const [esther, setEsther] = useState({
    id: "",
    name: "",
    modalCategory: false,
    modalDiet: false,
  });
  
  function openDeleteDiet(e) {
    setEsther({
      ...esther,
      id: e.id,
      name: e.name,
      modalDiet: true,
    });
  }
  function openDeleteCategory(e) {
    setEsther({
      ...esther,
      id: e.id,
      name: e.name,
      modalCategory: true,
    });
  }
  function handlerDeleteDiet(e) {
    dispatch(deleteDiets(esther.id));
    setEsther({
      ...esther,
      name: "",
      id: "",
      modalDiet: false,
    });
    dispatch(getDiets());
  }
  function handlerDeleteCategory(e){
    dispatch(deleteCategory(esther.id));
    setEsther({
      ...esther,
      name: "",
      id: "",
      modalCategory: false,
    });
    dispatch(getCategories());

  }

  function closeModal() {
    setEsther({
      ...esther,
      modalDiet: false,
      modalCategory: false,
    });
  }
  return (
    <div className='coint'>
      <AdminTopBar />
      <div className="tab-sidebar">
        <AdminSideBar />
        <div className='contenedor'  >
      <div>
        <h3>Lista de Dietas</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>descripcion</th>
              <th>Borrar</th>
            </tr>
          </thead>
          {d.map((e) => (
            <tbody key={e.id}>
              <td>{e.id} </td>
              <td>{e.name}</td>
              <td>{e.description}</td>

              <td>
                <Button color="danger" onClick={() => openDeleteDiet(e)}>
                  🗑
                </Button>
              </td>
            </tbody>
          ))}
        </table>
        <Modal isOpen={esther.modalDiet}>
          <ModalHeader> ¿Desea eliminar la Dieta {esther.name} ?</ModalHeader>
          <ModalBody>Esta acción no se puede revertir </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={(e) => handlerDeleteDiet(e)}>
              Borrar
            </Button>
            <Button color="primary" onClick={(e) => closeModal(e)}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* Tabla Categorias */}
      <div>
        <h3>Lista de Categorias</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>descripcion</th>
              <th>Borrar</th>
            </tr>
          </thead>
          {c.map((e) => (
            <tbody key={e.id}>
              <td>{e.id} </td>
              <td>{e.name}</td>
              <td>{e.description}</td>

              <td>
                <Button color="danger" onClick ={()=>openDeleteCategory(e)} >
                 🗑
                </Button>
              </td>
            </tbody>
          ))}
        </table>
        <Modal isOpen={esther.modalCategory}>
          <ModalHeader>
            {" "}
            ¿Desea eliminar la categoria {esther.name} ?
          </ModalHeader>
          <ModalBody>Esta acción no se puede revertir </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={(e) => handlerDeleteCategory(e)}>
              Borrar
            </Button>
            <Button color="primary" onClick={(e) => closeModal(e)}>
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
