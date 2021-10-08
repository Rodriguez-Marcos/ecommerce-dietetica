import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import TableUser from "./TableUser";
import { getClients,deleteClients, updateClients } from "../Actions/index";


export default function UserDetail() {

    const clients = useSelector((state) => state.reducerPablo.clients);

    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getClients())
    },[])

    function HandleDelete(id){
        dispatch(deleteClients(id))
        alert('Usuario eliminado con exito')
    }

       function handlerUpdateUser(e){
        dispatch(updateClients(e))
        alert("Modificacion exitosa");
         dispatch(getClients())
      }



    return(
        <div>
            <TableUser clients={clients} borrar={HandleDelete} handlerUpdateUser={handlerUpdateUser}/>
        </div>
    )
}

