import { useSelector } from "react-redux";
import ProductsCards from "./Products";
import Cookies from "universal-cookie";
import './Trolley.css'

const cookies = new Cookies();

export default function Trolley() {
    useSelector(state => state.reducerPablo.comodin)
    if (!cookies.get('trolley')?.length)
    return (
    <div id="carritoCompras">
      <a href='/home'>ir al home</a>
      <h1>No hay nada en el carrito aun</h1>
    </div>)
    return (
        <>
            <ProductsCards products={cookies.get('trolley')} />
        </>
    )
}