import { combineReducers } from 'redux'
import reducerDavid from "./reducerDavid";
import reducerPablo from "./reducerPablo";
import reducerRocio from './reducerRocio';

export default combineReducers({
    reducerDavid,
    reducerPablo, 
    reducerRocio,
    // Agregar Aqui nuevos reducers
  })