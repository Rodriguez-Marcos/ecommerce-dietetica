import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import { getProductbyName } from '../Actions/index'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from './Login'
import { LogoutButton } from './Logout'
import { Profile } from './Profile'


function NavBar({ getProductbyName }) {

  const [ActualState, setActualState] = useState('')
  const { isAuthenticated } = useAuth0();


  function handleChange(event) {

    setActualState(event.target.value)
  }


  function handleClik() {
    getProductbyName(ActualState)

  }


  return (
    <div className="content">
      <Navbar classname="navbar" expand="lg">
        <Navbar.Brand href="#"><NavLink to="/home" className='logo' >Salvatore</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav id="navScroll"
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link ><NavLink to="/home" className='navlink1' >Home</NavLink></Nav.Link>
            <NavDropdown className="Dropdown" title="Product" id="navbarScrollingDropdown">
              <NavDropdown.Item><NavLink to="/products" >Create Product</NavLink></NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item>Category 1</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link>About</Nav.Link>
          </Nav>
          <Nav>
          <Form className="d-flex">
            <FormControl id="inputSearch" placeholder="Search"/>
            <Button variant="success">Search</Button>
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
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProductbyName: name => {
      dispatch(getProductbyName(name))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)