import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './Components/Home';
import Detail from './Components/Detail.js';
import Creator from './Components/Creator';
import Search from './Components/Search';
import Footer from './Components/Footer';
import CreateUser from './Components/CreateUser';
import { Switch } from 'react-router';
import Trolley from './Components/Trolley';
import {Image} from 'react-bootstrap'
import fondo from '../src/image/fondo1.jpg'
import { DataProvider } from './Contexts/DataProvider'
import Login from './Components/Login';
import Sidebar from './Components/AdminSideBar';
import UsersAdminDetail from './Components/UsersAdminDetail'
import OrderAdminDetail from './Components/OrdersAdminDetail';

function App() {
  return (
    <BrowserRouter>
    <DataProvider>
     {/* <Image id="fondo" src={fondo} fluid /> */}
    <Switch>
    <Route exact path='/home' component={Home}/>
    <Route exact path='/Detail/:id' component={Detail}/>
    <Route exact path='/search' component={Search}/>
    {/* <Route exact path='/trolley' component={Trolley}/> */}
    {/* <Route exact path='/CreateUser' component={CreateUser}/> */}
    <Route exact path='/Login' component={Login}/>
    <Route exact path='/Admin' component={Creator}/>
    <Route exact path='/Admin/user' component={UsersAdminDetail}/>
    <Route exact path='/Admin/orders' component={OrderAdminDetail}/>


    </Switch>
    {/* <Footer/> */}
    </DataProvider>
    </BrowserRouter>
    
  );
}

export default App;
