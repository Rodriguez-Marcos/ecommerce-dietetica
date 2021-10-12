import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import TableUser from "./TableUser";
import { getClients,deleteClients, updateClients,resetPassword } from "../Actions/index";
import { Redirect } from "react-router";



export default function UserDetail() {

    const clients = useSelector((state) => state.reducerPablo.clients);
    const isadmin= useSelector((state)=> state.reducerPablo.IsAdmin)

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
    
      function handleChangePassword(e){
          dispatch(resetPassword(e))
          alert('Se forzo un password reset')
      }



    return(
        <div>
            {isadmin ?
            <TableUser clients={clients} borrar={HandleDelete} handlerUpdateUser={handlerUpdateUser}  handleChangePassword={handleChangePassword}/> : <Redirect to='/home'/>}
        </div>
    )
}

