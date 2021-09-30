import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './Components/Home';
import Detail from './Components/Detail.js';
import Creator from './Components/Creator';
import Search from './Components/Search';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { Switch } from 'react-router';
 
function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Switch>
    <Route exact path='/home' component={Home}/>
    <Route exact path='/Detail/:id' component={Detail}/>
    <Route exact path='/Admin' component={Creator}/>
    <Route exact path='/search' component={Search}/>
    </Switch>
    <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
