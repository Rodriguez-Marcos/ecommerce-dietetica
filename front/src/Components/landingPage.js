import React, { useEffect } from "react";
import { Image } from 'react-bootstrap'
import banner from '../image/BANNER-SALVATORE.jpg'
import Example from './PromosHome'
import NavBar from './NavBar'

export default function landingPage() {

   


    return (
        <div >
            <NavBar />
            <Image id="banner" src={banner} fluid />
            <Example></Example>
        </div>
    )
}