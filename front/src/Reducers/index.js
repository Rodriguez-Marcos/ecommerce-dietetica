import { combineReducers } from 'redux'
import reducerDavid from "./reducerDavid";
import reducerPablo from "./reducerPablo";
import reducerRocio from './reducerRocio';
import cart from './cart'
import loading from './loading'

export default combineReducers({
    reducerDavid,
    reducerPablo, 
    reducerRocio,
    cart,
    loading
    
    // Agregar Aqui nuevos reducers
  })