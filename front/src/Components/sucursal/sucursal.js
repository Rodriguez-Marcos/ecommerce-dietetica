import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FormGroup, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Sidebar from '../AdminSideBar'
import Topbar from '../AdminTopBar'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useDispatch } from 'react-redux';
import { putSucursal,deleteSucursal } from '../../Actions/index.js';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sucursal() {
    const myStorage = window.localStorage;
    let dispatch = useDispatch();
    const [sucursal, setSucursal] = useState([])
    const [modal, setModal] = useState({
        id: '',
        name: '',
        src: '',
        edit: false,
        delet: false,
    })


    useEffect(() => {
        axios.get('http://localhost:3001/sucursal').then(function (response) {
            setSucursal(response.data.data);
        })
    }, [dispatch])


    const copyToClipboard = (text) => {
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    function putSucu(e) {
        setModal({ ...modal, name: e.name, src: e.src, id: e.id, edit: true })

    }
    function deletSucu(e){
        setModal({ ...modal, name: e.name, src: e.src, id: e.id, delet: true })
    }
    function handlePut(e) {

        setModal({
            ...modal,
            [e.target.name]: e.target.value
        })
    }
    function closeEdit() {
        setModal({
            id: '',
            name: '',
            src: '',
            edit: false,
            delet: false,
        })
    }
    function editSucu(e) {
        const jwt = myStorage.getItem("jwt");
        dispatch(putSucursal(modal, modal.id, jwt))
        setModal({
            id: '',
            name: '',
            src: '',
            edit: false,
            delet: false,
        })
        axios.get('http://localhost:3001/sucursal').then(function (response) {
            setSucursal(response.data.data);
        })
    }

    function deleteSucu(){
        const jwt = myStorage.getItem("jwt");
        dispatch(deleteSucursal(modal.id, jwt))
        setModal({
            id: '',
            name: '',
            src: '',
            edit: false,
            delet: false,
        })

    }

    console.log(modal)
    return (
        <div>
            <Topbar />
            <Sidebar />
            <h3>Lista de Sucursales</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Locacion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {sucursal.map((e) => (
                    <tbody key={e.id}>
                        <td>{e.id} </td>
                        <td>{e.name}</td>
                        <td>{e.src.slice(0, 30) + '...'}
                            <Button onClick={() => { copyToClipboard(e.src) }} styles={{ hover: 'blue' }}>Copiar Link</Button>
                        </td>
                        <td>
                            <Button color="danger" onClick={() => putSucu(e)}>
                                🖋
                            </Button>
                            <Button color="danger"  onClick={()=> deletSucu(e)}>
                                🗑
                            </Button>
                        </td>
                    </tbody>
                ))}
            </table>
            <Modal isOpen={modal.edit} >
                <ModalHeader> ¿Desea editar la Sucursal {modal.name} ?</ModalHeader>
                <ModalBody>Esta acción no se puede revertir </ModalBody>
                <FormGroup>
                    <input
                        className="form-control"
                        type="text"
                        value={modal.name}
                        name="name"
                        onChange={(e) => handlePut(e)}
                    />
                    {!modal.name ? <output> ✏</output> : <output> ✔</output>}
                </FormGroup>
                <FormGroup>
                    <input
                        className="form-control"
                        type="text"
                        value={modal.src}
                        name="src"
                        onChange={(e) => handlePut(e)}
                    />
                    {!modal.src ? <output> ✏</output> : <output> ✔</output>}
                </FormGroup>
                <ModalFooter>
                    <Button color="danger" onClick={(e) => editSucu(e)}>
                        Editar
                    </Button>
                    <Button color="primary" onClick={() => closeEdit()} >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal.delet} >
                <ModalHeader> ¿Desea eliminar la Sucursal {modal.name} ?</ModalHeader>
                <ModalBody>Esta acción no se puede revertir </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={()=> deleteSucu()} >
                        Borrar
                    </Button>
                    <Button color="primary" onClick={() => closeEdit()} >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}