import React, { useEffect } from "react";
import { Image } from 'react-bootstrap'
import banner from '../image/BANNER-SALVATORE.jpg'
import Example from './PromosHome'
import NavBar from './NavBar'
import { useSelector, useDispatch } from "react-redux";
import ProductsCards from './Products';
import './Home.css'
import { getBestSellers } from "../Actions";
import Footer from './Footer'



export default function LandingPage() {
    const dispatch = useDispatch();
    let bestsellers = useSelector((state) => state.reducerPablo.bestseller)
    const myStorage = window.localStorage;
    let token = myStorage.getItem("jwt");
    bestsellers = bestsellers.data;
    
    console.log(bestsellers)
    // estados
  
    useEffect(() => {
      dispatch(getBestSellers(token));
    }, [dispatch]);


    return (
        <div>
            <div >
                <NavBar />
                <Image id="banner" src={banner} fluid />
                <Example></Example>
            </div>
            <h2>PRODUCTOS MAS VENDIDOS</h2>
            <div className='home'>
                <ProductsCards
                    products={bestsellers} />
            </div>
           
        </div>
    )
}