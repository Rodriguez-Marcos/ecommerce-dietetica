import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import TableUser from "./TableUser";
import { getClients,deleteClients } from "../Actions/index";
import EditUser from "./EditUser";


export default function UserDetail() {

    const clients = useSelector((state) => state.reducerPablo.clients);

    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getClients())
    },[])

    const [input, setInput] = useState({
        isAdmin:false,
    })
    

    const [editModal, setEditModal] = useState({
        name: false,
      });


    function HandleDelete(id){
        dispatch(deleteClients(id))
        alert('Usuario eliminado con exito')
    }

    function editUserOpen(e) {
        setEditModal({
          ...editModal,
          name: true,
        });
    
        setInput({
          ...input,
          isAdmin: e.isAdmin,
        });
      }

      function editUserClose() {
        setEditModal({
          ...editModal,
          name: false,
        });
        setInput({
            ...input,
          isAdmin:false,
        });
      }

      function handlerIsAdmin(event){
          setInput({
              ...input,
              isAdmin: event.target.value
          })
      }

      function handlerSubmitUser(e){
        dispatch()
        alert("Modificacion exitosa");
        setEditModal({...editModal,name:false})
      }



    return(
        <div>
            <EditUser input={input} editmodal={editModal} handlerIsAdmin={handlerIsAdmin} handlerSubmitUser={handlerSubmitUser} editUserClose={editUserClose}/>
            <TableUser clients={clients} borrar={HandleDelete} editUserOpen={editUserOpen}/>
        </div>
    )
}

