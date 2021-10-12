import './App.css';
import {BrowserRouter,NavLink,Route} from 'react-router-dom'
import Home from './Components/Home';
import Detail from './Components/Detail.js';
import Creator from './Components/Creator';
import Search from './Components/Search';
import Footer from './Components/Footer';
import CreateUser from './Components/CreateUser';
import { Redirect, Switch } from 'react-router';
import Trolley from './Components/Trolley';
import {Image} from 'react-bootstrap'
import fondo from '../src/image/fondo1.jpg'
import { DataProvider } from './Contexts/DataProvider'
import Login from './Components/Login';
import Sidebar from './Components/AdminSideBar';
import UsersAdminDetail from './Components/UsersAdminDetail'
import OrderAdminDetail from './Components/OrdersAdminDetail';
import AdminDietAndCategory from './Components/TableDietAndCategory';
import { useSelector } from 'react-redux';
import Success from './Components/payment/success';
import Pendings from './Components/payment/pending';
import Failure from './Components/payment/failure';

function App() {

  const isAdmin = useSelector((state)=> state.reducerPablo.IsAdmin)

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
    <Route exact path='/Admin/filters' component={AdminDietAndCategory}/>
    


    </Switch>
    <Switch>
    <Route exact path='/payment/success' component={Success}/>
    <Route exact path='/payment/pending' component={Pendings}/>
    <Route exact path='/payment/failure' component={Failure}/>
    </Switch>
    {/* <Footer/> */}
    </DataProvider>
    </BrowserRouter>
    
  );
}

export default App;
