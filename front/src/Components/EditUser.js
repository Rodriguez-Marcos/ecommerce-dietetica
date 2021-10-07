import React from "react";
import { useState } from "react";
import "bootstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export default function EditUser({input,editmodal,handlerIsAdmin,handlerSubmitUser,editUserClose}){

return(

    <Modal isOpen={editmodal.name}>
    <ModalHeader>
      <div>
        <h3>Editar Usuario: {input.name} </h3>
      </div>
    </ModalHeader>
    <ModalBody>
      <FormGroup>
        <select
        className="form-control"
        value={input.isAdmin}
        name="isadmin"
        onChange={(e) => handlerIsAdmin(e)}>
         <option value={true}>Si</option>
        <option value={false}>No</option> 
        </select>
       
        {!input.isAdmin ? <output> ✏</output> : <output> ✔</output>}
      </FormGroup>
      <br />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={(e) => handlerSubmitUser(e)}>
        Editar
      </Button>
      <Button className="btn btn-danger" onClick={(e) => editUserClose(e)}>
        Cancelar
      </Button>
    </ModalFooter>
  </Modal>
)
}