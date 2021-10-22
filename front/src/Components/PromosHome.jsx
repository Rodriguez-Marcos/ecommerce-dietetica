import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import { Link } from 'react-router-dom'
import banner1 from '../image/Banners_promocionales1.jpg'
import banner2 from '../image/Banners_promocionales2.jpg'
import banner3 from '../image/Banners_promocionales3.jpg'
import './promosHome.css'

export default function Example(props) {

  return (
    <Carousel interval="5000">
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
var items = [
  {
    // name: "Lanzamiento: Aceite de coco EXTRA VIRGEN",
    // description: "¡Conoce nuestro producto!",
    link: "/Detail/2",
    img: banner2
  },
  {
    // name: "¡Envío gratis en tu primera compra!",
    // description: "Aprovechá y hace tu compra hoy",
    link: "/",
    img: banner3
  },
  {
    // name: "Lanzamiento: Barrita de arroz CROWIE",
    // description:
    //   "Conoce las nuevas barritas Crowie recién llegadas a nuestra web",
    link: "/Detail/40",
    img: banner1
  },
];
function Item(props) {
  return (
    <Paper className="paperContainer">
      <Link to={props.item.link}>
        <img src={props.item.img} className="img_banner" />
      </Link>
      {/* <div className="bannerTexto"> 
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>
        {(props.item.link !== "") ? <Link to={props.item.link}>
          <button type="button" class="btn btn-dark">Click aquí</button> */}
      {/* <Button className="CheckButton" style={styles.btn}>
      //   CLICK AQUÍ
      // </Button> */}
      {/* </Link> : <p></p>} */}
      {/* </div> */}

    </Paper>
  );
}