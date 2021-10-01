import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import { getProductbyName, setLoading } from '../Actions/index'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import Logo from '../image/SALVATORE-grande.png'
import lupa from '../image/buscar.png'





function NavBar({ getProductbyName, setLoading }) {

  const [ActualState, setActualState] = useState('')



  let history = useHistory();




  function handleSubmit(e) {
    e.preventDefault();
    getProductbyName(ActualState);
    setLoading();
    history.push("/search");
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
            <Nav.Link ><NavLink to="/home" className='navlink1' >Home</NavLink></Nav.Link>
            <Nav.Link ><NavLink to="/trolley" className='navlink1' >Carrito</NavLink></Nav.Link>
            <Nav.Link>About</Nav.Link>
          </Nav>
          <Nav id="busqueda">
            <Form className="d-flex" id="d-flex" onSubmit={(e) => handleSubmit(e)}>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                value={ActualState} type='text' id='inputSearch' onChange={handleChange}
              />
              <button id="lupabtn" onSubmit={(e) => handleSubmit(e)} onClick={(e) => handleSubmit(e)}><img  id="lupaimg" src={lupa}/></button>
            </Form>
           <NavLink to='/CreateUser'> Crear Cuenta  </NavLink>
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
