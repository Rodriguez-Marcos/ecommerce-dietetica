import './App.css';
import {BrowserRouter,NavLink,Route} from 'react-router-dom'
import Home from './Components/Home';
import Detail from './Components/Detail.js';
import Creator from './Components/Creator';
import Search from './Components/Search';
import { Redirect, Switch } from 'react-router';
import { DataProvider } from './Contexts/DataProvider'
import Login from './Components/Login';
import UsersAdminDetail from './Components/UsersAdminDetail'
import TableOrders from './Components/TableOrders';
import AdminDietAndCategory from './Components/TableDietAndCategory';
import { useSelector } from 'react-redux';
import Success from './Components/payment/success';
import Pendings from './Components/payment/pending';
import Failure from './Components/payment/failure';
import CreateAddress from './Components/CreateAddress';
import UserProfile from './Components/UserProfile'
import Form from './Components/formbefore';
import Grafics from './Components/Grafics';
import Sucursal from './Components/sucursal/sucursal';
import LandingPage from './Components/landingPage.js';

function App() {

  const isAdmin = useSelector((state)=> state.reducerPablo.IsAdmin)

  return (
    <BrowserRouter>
    <DataProvider>
     {/* <Image id="fondo" src={fondo} fluid /> */}
    <Switch>
    <Route exact path ='/' component = {LandingPage} />
    <Route exact path='/products' component={Home}/>
    <Route exact path='/Detail/:id' component={Detail}/>
    <Route exact path='/search' component={Search}/>
    {/* <Route exact path='/trolley' component={Trolley}/> */}
    {/* <Route exact path='/CreateUser' component={CreateUser}/> */}
    <Route exact path='/Login' component={Login}/>
    <Route exact path='/newaddress' component={CreateAddress}/>
    <Route exact path='/Admin' render={() => isAdmin ? <Creator></Creator>: <Redirect to='/'/>}/>
    <Route exact path='/Admin' render={() => isAdmin ? <Creator></Creator>: <Redirect to='/'/>}/>
    <Route exact path='/Admin/user'  render={() => isAdmin ? <UsersAdminDetail/>: <Redirect to='/'/>}/>
    <Route exact path='/Admin/user'  render={() => isAdmin ? <UsersAdminDetail/>: <Redirect to='/'/>}/>
    <Route exact path='/Admin/orders'  render={() => isAdmin ? <TableOrders/>: <Redirect to='/'/>}/>
    <Route exact path='/Admin/filters' render={() => isAdmin ? <AdminDietAndCategory/>: <Redirect to='/'/>}/>
      <Route exact path='/Admin/grafics' render={()=> isAdmin? <Grafics/> :<Redirect to='/'/> }/>
    <Route exact path='/userprofile'component={UserProfile}/>
    <Route exact path='/envio' component={Form}/>
    <Route exact path='/payment/success' component={Success}/>
    <Route exact path='/payment/pending' component={Pendings}/>
    <Route exact path='/payment/failure' component={Failure}/>
    <Route exact path='/Admin/sucursal' render={() => isAdmin ? <Sucursal/>: <Redirect to='/'/>}/>
 
   

    </Switch>
    {/* <Footer/> */}
    </DataProvider>
    </BrowserRouter>
    
  );
}

export default App;
