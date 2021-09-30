import { useSelector } from "react-redux"
import ProductsCards from "./Products"
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Trolley() {
    useSelector(state => state.reducerPablo.comodin)
    if (!cookies.get('trolley')?.length)
    return (<>
      <h1>No hay nada en el carrito aun</h1>
      <a href='/home'>ir al home</a>
    </>)
    return (
        <>
            <ProductsCards products={cookies.get('trolley')} />
        </>
    )
}