import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import { getProductbyName, setLoading } from '../Actions/index'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import ProductsFilters from './Filters'
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from './Login'
import { LogoutButton } from './Logout'
import { Profile } from './Profile'
import Logo from '../image/SALVATORE-grande.png'



function NavBar({ getProductbyName, setLoading }) {

  const [ActualState, setActualState] = useState('')
  const { isAuthenticated } = useAuth0();



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
          >
            <Nav.Link ><NavLink to="/home" className='navlink1' >Home</NavLink></Nav.Link>
            <ProductsFilters />
            <Nav.Link>About</Nav.Link>
          </Nav>
          <Nav>
            <Form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                value={ActualState} type='text' id='inputSearch' onChange={handleChange}
              />
              <Button onSubmit={(e) => handleSubmit(e)} onClick={(e) => handleSubmit(e)} variant="success">Search</Button>
            </Form>
            {isAuthenticated ? <>
              <LogoutButton />
              <Profile />
            </>
              : <LoginButton />
            }
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