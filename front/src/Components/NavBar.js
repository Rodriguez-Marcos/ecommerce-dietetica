import React, { useState } from 'react';
import { Link,NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import { getProductbyName, resetFilters} from '../Actions/index'
import {Navbar, Nav, NavDropdown,Form, FormControl, Button} from 'react-bootstrap'
import ProductsFilters from './Filters'
import { useAuth0 } from "@auth0/auth0-react";
import {LoginButton} from './Login'
import {LogoutButton} from './Logout'
import {Profile} from './Profile'


function NavBar({ getProductbyName, resetFilters }) {

  const [ActualState, setActualState] = useState('')
  const {isAuthenticated} = useAuth0();



  let history = useHistory();

  
  
  
  function handleSubmit(e) {
    e.preventDefault();
    getProductbyName(ActualState);
    history.push("/search");
    
  }
  
  function handleChange(event) {
    setActualState(event.target.value)
  }
  
  return(
    <Navbar classname="navbar" expand="md">
  <Nav.Link ><NavLink to="/home" className='navlink' >Salvatore</NavLink></Nav.Link>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse className="link-search" >
    <Nav className="navbar-nav">
      <Nav.Link ><NavLink to="/home" className='navlink1' >Home</NavLink></Nav.Link>
      <Nav.Link ><NavLink to="/products" className='navlink1'>Create Product</NavLink></Nav.Link>
      <NavDropdown title="Categories">
        <NavDropdown.Item >1 Category</NavDropdown.Item>
        <NavDropdown.Item >2 Category</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#" disabled>
        About
      </Nav.Link>
    </Nav>
    <div>
    <ProductsFilters/>
    </div>
   <div>
          { isAuthenticated ? <>
            <LogoutButton/>
          <Profile/>
          </> 
         : <LoginButton/>
}
          </div>
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
        value={ActualState} type='text' placeholder='buscador' className='inputsearch' onChange={handleChange} 
      />
      <Button onSubmit={(e) => handleSubmit(e)} onClick={(e) => handleSubmit(e)} variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>

</Navbar>
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
    resetFilters:() => {
      dispatch(resetFilters())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)