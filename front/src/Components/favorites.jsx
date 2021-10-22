import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import Cookies from "universal-cookie"
import { getProducts } from "../Actions"
import { DataContext } from "../Contexts/DataProvider"
import deleteFav from "../Utils/deleteFav"
import getFavorites from "../Utils/getFavorites"
import postCarrito from "../Utils/postCarrito"

const myStorage = window.localStorage
let cookies = new Cookies();

export default function Favorites() {
    const { token, comodin, isLogin } = useSelector(state => state.reducerPablo)
    const { productsFavs } = useSelector(state => state.favs)
    const dispatch = useDispatch();
    const history = useHistory();
    const value = useContext(DataContext)
    const [favs, setFavs] = value.favs;
    useEffect(() => {
        if (!isLogin) {
            history.push('/login')
            setFavs(false)
        }
    }, [])

    function addFavsToCart() {
        let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : []; /// trolley : []
        productsFavs.forEach(({ id }) => {
            if (!trolley.find(x => x.id === id)) {
                trolley.push({ id, quantity: 1 });
                if (isLogin) postCarrito(token, { id, quantity: 1 });
            }
            cookies.set('trolley', trolley)
            dispatch({
                type: 'COMODIN',
            })
        })
    }

 

    return (
        <div className="carritos show">
            <div className="carrito show">
                <div className="carrito__close">
                    <box-icon onClick={() => { setFavs(false) }} name="x"></box-icon>
                </div>
                <h2>Sus favoritos:</h2>
                {productsFavs?.map((producto) => (
                    <div className="carrito__center">
                        <div className="carrito__item" key="">
                            <img className="img" src={producto.image} alt=""></img>
                            <div >
                                <h3>{producto.name}</h3>
                                <p className="price">${producto.price}</p>
                            </div>
                            <div>


                            </div>
                            {/* <div className="remove__item">
                                <box-icon id="trash" onClick={() => handleClose(producto.id)} name="trash"></box-icon>
                            </div> */}
                        </div>


                    </div>
                ))}
                <div className="carrito__footer">
                    <br /> <br />
                    {isLogin ? <button className="btn" onClick={addFavsToCart}>Agregar productos al carrito</button> : false}
                </div>





            </div>


        </div>



    )
}