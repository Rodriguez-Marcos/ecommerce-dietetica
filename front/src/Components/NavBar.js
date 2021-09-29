import React, {useState} from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import { getProductbyName } from '../Actions/index'



function NavBar({getProductbyName}) {

  const [ActualState, setActualState] = useState('')



  function handleChange(event) {
  
    setActualState(event.target.value)
}


function handleClik() {
    getProductbyName(ActualState)

}



    return (
      <nav className='navbar'>
        <div className='navbar2'>
        <div className='navlink'>
          <NavLink to="/home" className='navlink1' >Home</NavLink>
          <NavLink to="/products" className='navlink1'>Create a New Product</NavLink>
          </div>
          <div className='busqueda'>
          <input value={ActualState} type='text' placeholder='buscador' className='inputsearch' onChange={handleChange}/>
          <NavLink to='/productname' ><button className='botonsearch' onClick={handleClik}>Search</button></NavLink>
          </div>


        </div>
  
      </nav>
    );
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