import React, {useState} from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import { getProductbyName } from '../Actions/index'
import {Navbar, Nav, NavDropdown,Form, FormControl, Button} from 'react-bootstrap'
import FilterRecipes from './Filters'
import { useAuth0 } from "@auth0/auth0-react";
import {LoginButton} from './Login'
import {LogoutButton} from './Logout'
import {Profile} from './Profile'


function NavBar({getProductbyName}) {

  const [ActualState, setActualState] = useState('')
  const {isAuthenticated} = useAuth0();


  function handleChange(event) {
  
    setActualState(event.target.value)
}


function handleClik() {
    getProductbyName(ActualState)

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
      />
      <Button variant="outline-success">Search</Button>
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
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)