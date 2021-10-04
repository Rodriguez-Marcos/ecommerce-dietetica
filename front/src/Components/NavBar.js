import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import { getProductbyName, setLoading } from '../Actions/index'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
// import ProductsFilters from './Filters'
import useUser from '../Hooks/UseUser'; //hook para loguearse y ver si esta logueado el usuario

import Logo from '../image/SALVATORE-grande.png'
import lupa from '../image/buscar.png'





function NavBar({ getProductbyName, setLoading, login_user, user }) {

  const [ActualState, setActualState] = useState('')
  const {isLogin, logout} = useUser()



  let history = useHistory();




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
            <Nav.Link ><NavLink to="/home" className='navlink1' >Inicio</NavLink></Nav.Link>
            <Nav.Link ><NavLink to="/trolley" className='navlink1' >Carrito</NavLink></Nav.Link>
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
            {isLogin && (user.data  || login_user.data) ? <div> <p> Bienvendido {user.data?.name ? user.data.name : login_user.data.name} </p> <button onClick={logout}> Salir </button> </div> 
            :  <div><NavLink to='/CreateUser'> Crear Cuenta  </NavLink> <NavLink to='/Login'> Login </NavLink> </div> }
            

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
    user: state.reducerPablo.user,
    login_user: state.reducerPablo.login_user,
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
