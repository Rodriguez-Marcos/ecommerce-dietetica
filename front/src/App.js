import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './Components/Home';
import Detail from './Components/Detail.js';
import Creator from './Components/Creator';
import Search from './Components/Search';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import CreateUser from './Components/CreateUser';
import { Switch } from 'react-router';
import Trolley from './Components/Trolley';
import {Image} from 'react-bootstrap'
import fondo from '../src/image/fondo1.jpg'
import { UserContextProvider } from './Contexts/UserContext';
import Login from './Components/Login';
import Sidebar from './Components/AdminSideBar';

function App() {
  return (
    <BrowserRouter>
    <UserContextProvider>
     <Image id="fondo" src={fondo} fluid />
    <NavBar/>
    <Switch>
    <Route exact path='/home' component={Home}/>
    <Route exact path='/Detail/:id' component={Detail}/>
    <Route exact path='/search' component={Search}/>
    <Route exact path='/trolley' component={Trolley}/>
    <Route exact path='/CreateUser' component={CreateUser}/>
    <Route exact path='/Login' component={Login}/>
    <Route exact path='/Admin' component={Creator}/>


    </Switch>
    {/* <Footer/> */}
    </UserContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
