import { useGoogleLogout } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { getProductbyName, setLoading } from '../Actions/index'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap'
// import ProductsFilters from './Filters'
import useUser from '../Hooks/UseUser'; //hook para loguearse y ver si esta logueado el usuario
import Logo from '../image/SALVATORE-grande.png'
import lupa from '../image/buscar.png'
import { ShoppingCart} from '@material-ui/icons';
import { AccountCircle } from '@material-ui/icons';
import { ExitToApp } from '@material-ui/icons';
import Cookies from "universal-cookie";
import Sesion from '../image/usuario.png'
import { DataContext } from "../Contexts/DataProvider"
import Trolley from './Trolley'
import { decode } from "jsonwebtoken";
import 'boxicons';



const jwt = require('jsonwebtoken')
const cookies = new Cookies();







function NavBar({ getProductbyName, setLoading, isLogin, token }) {
  let comodin = useSelector(state => state.reducerPablo.comodin);
  let isAdmin = useSelector(state => state.reducerPablo.IsAdmin);
  let { productsCart } = useSelector(state=>state.cart)// no sacar, sirve para contar la cantidad en el carrito
  const value = useContext(DataContext)
  const [menu, setMenu] = value.menu;
  
  function onLogoutSuccess() {
    console.log("logout success")
  }
  function onFailure() {
    console.log("algo fallo")
  }
  const dispatch = useDispatch();
  const [ActualState, setActualState] = useState('')
  const { logout } = useUser();
  const myStorage = window.localStorage;
  useEffect(() => {
    const jwt = myStorage.jwt.jwt;
    var isadmin = decode(jwt)

    if (!!jwt) {
      dispatch({ type: 'LOGIN', payload: jwt })
      dispatch({ type: 'SET_LOGIN_USER', payload: isadmin.isAdmin })
    }
  }, [myStorage])
  let history = useHistory();
  useEffect(() => {
    let isArray = Array.isArray(cookies.get('trolley'))
    if(!isArray){
      cookies.set('trolley',[])
    }
  }, [])




  function handleSubmit(e) {
    e.preventDefault();
    if (ActualState) {
      getProductbyName(ActualState);
      setLoading();
      history.push("/search");
    } else {
      history.push("/home");
    }
  }

  function handleChange(event) {
    setActualState(event.target.value)
  }
  if(cookies.get('trolley')){
    var cookie = cookies.get('trolley')
  }

  return (
    <div className="content">
      <Navbar classname="navbar" expand="lg">
        <Navbar.Brand href="#"><NavLink to="/home" ><img className="Logo" src={Logo} /></NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav id="navScroll"
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            id="Links"
          >
            <Nav.Link >
              <NavLink to="/home" className='navlink1' >Inicio</NavLink>
            </Nav.Link>

            <Nav.Link >
              
            <div className="cart">
            
              <NavLink to='' onClick={e=>{e.preventDefault() ;setMenu(true) }} className='navlink1'>
              <box-icon name="cart"></box-icon>
                {/* <ShoppingCart fontSize="large" id="iconoCarrito"/> */}
                <span className="item__total">{cookie?.length}</span>
              </NavLink>
               </div>
            </Nav.Link>
            {isAdmin ?
            <NavLink to='/Admin'>Admin</NavLink> : null}
          </Nav>
          <Nav id="busqueda">
            <Form className="d-flex" id="d-flex" onSubmit={(e) => handleSubmit(e)}>
              <FormControl
                type="search"
                placeholder="Buscar"
                className="mr-2"
                aria-label="Search"
                value={ActualState} type='text' id='inputSearch' onChange={handleChange}
              />
              <button id="lupabtn" onSubmit={(e) => handleSubmit(e)} onClick={(e) => handleSubmit(e)}><img id="lupaimg" src={lupa} /></button>
            </Form>
            {isLogin ? <div id="sesion">
               <p><AccountCircle/> Bienvendido {jwt?.decode(token)?.name} </p>
               <GoogleLogout
              clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
              buttonText="Cerrar Sesión"
              onLogoutSuccess={logout}
              onFailure={() => { console.log('fallo') }}
            >
              <span id='cerrarSesion'><ExitToApp/> Cerrar Sesión</span>
            </GoogleLogout> {/* <button onClick={()=>{logout(),signOut()}}> Salir </button> */} 
            </div>
              : <div id="btnsSesionRegistro">
                <NavLink id="btnSesion" to='/Login'><Image id="imgSesion" src={Sesion} /><span>Inicia Sesion</span> </NavLink>
              </div>}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {menu?<Trolley/>:false}

    </div>
  )

};

const mapStateToProps = (state) => {
  return {
    product: state.product,
    loading: state.reducerPablo.loading,
    token: state.reducerPablo.token,
    isLogin: state.reducerPablo.isLogin,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProductbyName: name => {
      dispatch(getProductbyName(name))
    },

    setLoading: () => {
      dispatch(setLoading())
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
