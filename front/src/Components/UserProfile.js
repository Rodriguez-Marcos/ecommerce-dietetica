import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders}from "../Actions";
import { decode } from "jsonwebtoken";
import Cookies from "universal-cookie";
import  Navbar  from "./NavBar";
import { Button } from "reactstrap";
import UserOrders from "./UserOrders";
import AdminDetailsOrders from "./AdminDetailsOrders";




export default function UserProfile(){
    
const orders = useSelector((state) => state.reducerPablo.orders);

    

const cookies = new Cookies();
const dispatch = useDispatch();
const myStorage = window.localStorage;
const jwt = myStorage.jwt;
var isadmin = decode(jwt)
var id = isadmin.id

  useEffect(() => {
    if (!!jwt) {
      dispatch({ type: 'LOGIN', payload: jwt })
      dispatch({ type: 'SET_LOGIN_USER', payload: isadmin.isAdmin })
      dispatch(getOrders(jwt,id))
    }
  }, [myStorage])

  const [state, setstate] = useState({
    clientName: "",
    clientLastname: "",
    clientPhone: "",
    clientMail: "",
    productName: [],
    direccion: "",
    id: "",
    date: "",
    total: "",
    status: "",
    modal: false,
  });

  function handlerDetails(e) {
    setstate({
      ...state,
      modal: true,
      id: e.id,
      direccion: e.shippingAddress,
      date: e.createDate,
      total: e.ammount,
      status: e.status,
      clientName: e.client ? e.client.name : "No Found",
      clientLastname: e.client ? e.client.lastname : "No Found",
      clientPhone: e.client ? e.client.phone : "No Found",
      clientMail: e.client ? e.client.email : "No Found",
      productName: e.products ? e.products.filter((e) => e.name) : "No Found",
    });
  }
  function closeModal(e) {
    setstate({
      ...state,
      modal: false,
    });
  }



    return(
        <div>
            <Navbar/>
            <div>
           <UserOrders orders= {orders} handlerDetails = {handlerDetails}/>
            </div>
            <AdminDetailsOrders input={state} closeModal={closeModal} />
        </div>
    )
}