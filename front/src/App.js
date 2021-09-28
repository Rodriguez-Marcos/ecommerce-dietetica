import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/Home';
import Detail from './components/Detail.js';

import NavBar from './components/NavBar';
import { Switch } from 'react-router';
 
function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Switch>
    <Route exact path='/home' component={Home}/>
    <Route exact path='/Detail/:id' component={Detail}/>
    </Switch>
    </BrowserRouter>
    
  );
}

export default App;
