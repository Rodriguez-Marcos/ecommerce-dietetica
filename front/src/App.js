import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './Components/Home';
import axios from 'axios';

import ProductsHome from './Components/Home';
import NavBar from './Components/NavBar';
import { Switch } from 'react-router';
 
function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Switch>
    <Route path='/' component={ProductsHome}/>
    </Switch>
    </BrowserRouter>
    
  );
}

export default App;
