import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { getProducts } from "../Actions"
import { DataContext } from "../Contexts/DataProvider"
import deleteFav from "../Utils/deleteFav"
import getFavorites from "../Utils/getFavorites"
import postCarrito from "../Utils/postCarrito"

const myStorage = window.localStorage

export default function Favorites() {
    const {token , comodin, isLogin} = useSelector(state=>state.reducerPablo)
    const dispatch = useDispatch();
    const history = useHistory();
    const value = useContext(DataContext)
    const [favs, setFavs] = value.favs;
    const [favorites, setFavorites] = value.favorites;
    useEffect(async ()=>{
        if(!isLogin){
        history.push('/login')
        setFavs(false)
    }
        console.log( myStorage.getItem('jwt'))
        let res = await getFavorites( myStorage.getItem('jwt'))
        console.log(res)
        setFavorites(res)
    },[comodin,getProducts])
    async function handleClose(id){
        await deleteFav(id,token)
        dispatch({type:'COMODIN'})
    }

    async function addFavsToCart(){
        await postCarrito(token,favorites.map(x=>{return {id: x.id,quantity:1}}))
        dispatch({type:'COMODIN'})
        
    }

    return (
        <div className="carritos show">
            <div className="carrito show">
                <div className="carrito__close">
                    <box-icon onClick={() => { setFavs(false) }} name="x"></box-icon>
                </div>
                <h2>Sus favoritos:</h2>
                {favorites?.map((producto) => (

                    // {console.log(e)}

                    <div className="carrito__center">
                        <div className="carrito__item" key="">
                            <img className="img" src={producto.image} alt=""></img>
                            <div >
                                <h3>{producto.name}</h3>
                                <p className="price">${producto.price}</p>
                            </div>
                            <div>


                            </div>
                            <div className="remove__item">
                                <box-icon id="trash" onClick={() => handleClose(producto.id)} name="trash"></box-icon>
                            </div>
                        </div>


                    </div>
                ))}
               <div className="carrito__footer">
            <br /> <br />
            {isLogin ? <button className="btn" onClick={addFavsToCart}>Agregar productos al carrito (beta)</button>:false}
          </div>





            </div>


        </div>



    )
}