import { useGoogleLogout } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import React, { useState, useEffect } from 'react';
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
import Cookies from "universal-cookie";
import Sesion from '../image/usuario.png'

const jwt = require('jsonwebtoken')
const cookies = new Cookies();







function NavBar({ getProductbyName, setLoading, isLogin, token }) {
  let comodin = useSelector(state => state.reducerPablo.comodin);
  let { productCart} = useSelector(state=>state.cart)// no sacar, sirve para contar la cantidad en el carrito
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
    const jwt = myStorage.jwt;
    if (!!jwt) {
      dispatch({ type: 'LOGIN', payload: jwt })
    }
  }, [myStorage])
  let history = useHistory();
  useEffect(() => {

  }, [comodin,])




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
              <NavLink to="/trolley" className='navlink1'>
                <ShoppingCart fontSize="large" id="iconoCarrito"/>
                <span id="ContCarrito">
                  {cookie?.length
                }
                </span>
              </NavLink>
            </Nav.Link>
            <Nav.Link>About</Nav.Link>
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

            {console.log(isLogin)}
            {isLogin ? <div> <p> Bienvendido {jwt?.decode(token)?.name} </p><GoogleLogout
              clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}
              onFailure={() => { console.log('fallo') }}
            >
            </GoogleLogout> {/* <button onClick={()=>{logout(),signOut()}}> Salir </button> */} </div>
              : <div id="btnsSesionRegistro">
                <NavLink id="btnRegistro" to='/CreateUser'>Registrate</NavLink>
                <NavLink id="btnSesion" to='/Login'><Image id="imgSesion" src={Sesion} /><span>Inicia Sesion</span> </NavLink>
              </div>}

          </Nav>
        </Navbar.Collapse>
      </Navbar>

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
