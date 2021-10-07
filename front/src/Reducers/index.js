import { combineReducers } from 'redux'
import reducerDavid from "./reducerDavid";
import reducerPablo from "./reducerPablo";
import reducerRocio from './reducerRocio';
import cart from './cart'

export default combineReducers({
    reducerDavid,
    reducerPablo, 
    reducerRocio,
    cart,
    
    // Agregar Aqui nuevos reducers
  })