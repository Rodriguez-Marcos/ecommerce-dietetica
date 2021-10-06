import { useSelector } from "react-redux";
import ProductsCards from "./Products";
import Cookies from "universal-cookie";
import './Trolley.css'
import { Link } from "react-router-dom";

const cookies = new Cookies();

export default function Trolley() {
    useSelector(state => state.reducerPablo.comodin)
    const isLogin = useSelector(state => state.reducerPablo.isLogin)

    if (!cookies.get('trolley')?.length){
        return (
    <div id="carritoCompras">
      <a href='/home'>ir al home</a>
      <h1>No hay nada en el carrito aun</h1>
      {!isLogin?<h1><Link to='/Login'>Logueate para empezar a comprar </Link></h1>:false}
    </div>)
}else{
    return (
            <div id="cardCarrito">
                {!isLogin?<h1><Link to='/Login'>Logueate para empezar a comprar </Link></h1>:false}
            <h1>Productos agregados</h1>
            <ProductsCards id="card" products={cookies.get('trolley')} />
            </div>
    )
}
}