import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './Components/Home';
import Detail from './Components/Detail.js';


import NavBar from './Components/NavBar';
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
