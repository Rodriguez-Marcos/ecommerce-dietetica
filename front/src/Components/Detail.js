
// import axios from 'axios';
import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {  getById } from '../Actions/index'
import styles from './Detail.module.css'
import { DiscussionEmbed } from 'disqus-react';

function Detail({ match }) {
    const { id } = match.params
    const dispatch = useDispatch()
    console.log(match.params)

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch] )

    const producto = useSelector(state => state.reducerRocio.detail)
    console.log(producto)


    return (
        <div className={styles.fondo}>
        <div className={styles.container}>
           
            </div>
                
            <div className={styles.detail}>
                <div class = "row"></div>
                <div class= "col-md-6">
                <img className={styles.Image} src={producto?.image } alt='none'/>
                </div>
                <section className={styles.comentarios}> 
                
                <DiscussionEmbed
                   shortname='salvatoredietetica'
                   config={
                           {
                               url: "http://localhost:3000",
                               identifier: "http://localhost:3000/Detail/" + id,
                               // como hacer para que me tome cada
                               title: "Comentarios",
                               language: 'es_MX' 
                           }
                           }
                           />
             
              
               </section> 
                
              
                <div className={styles.detalles}>
                <div class = "col-md-25">
               
                <p className={styles.titulo}>Detalle del producto</p>
                <p className={styles.title}>
                 </p> <p className={styles.producto}>{producto?.name.toUpperCase()}</p>
               
               
   
                <br />

                <div className={styles.title}>
                    Precio:  
                    </div>
                    <p className={styles.producto}>${producto?.price} </p>
          

                <p className={styles.title}>Sobre este producto:  
                <p className={styles.producto}> {producto?.description} </p></p>

                <p className={styles.title}>Stock:
                <p className={styles.producto}> {producto?.stock} unidades</p></p>
                <p className={styles.title}>Categorias:{producto?.ids_category}</p>
                <button type="button" class="btn btn-secondary">Agregar a favoritos</button>
                <br />
                <br />
                <button type="button" class="btn btn-success">Agregar al carrito</button>
                
               
                

               
                </div>

            </div>
            </div>
      </div>
       
    

    )

        
                    }





    
export default Detail;