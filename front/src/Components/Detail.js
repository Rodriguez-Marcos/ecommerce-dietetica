
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { REVIEW_URL } from "../Actions/index";
import { useSelector, useDispatch } from 'react-redux'
import {  getById } from '../Actions/index'
import styles from './Detail.module.css'
// import { DiscussionEmbed } from 'disqus-react';


import { Rating } from "@material-ui/lab";
import swal from "sweetalert";


function Detail({ match }) {
    const { id } = match.params
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch] )

    const producto = useSelector(state => state.reducerRocio.detail)
  

    const [input, setInput] = useState({
        title: "",
        description: "",
        calification: 4,
        productId: id
      });

      function handleInputChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }

      
      function handleSubmit(e) {
        e.preventDefault();
        return axios
          .post(REVIEW_URL, input)
          .then((r) => {
            e.target.reset();
            setInput({
              title: "",
              description: "",
              calification: "",
            });
            swal("Creado", "Comentario enviado con éxito!", "success")
            // .then( () => window.location.href="/" );
          })
          .catch((error) => swal("Error", error, "error"));
      }
      

    
    return (
        <div className={styles.fondo}>
        <div className={styles.container}>
           
            </div>
                
            <div className={styles.detail}>
                <div ></div>
                <div >
                <img className={styles.Image} src={producto?.image } alt='none'/>
                </div>
                {/* <section className={styles.comentarios}> 
                
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
             
              
               </section>  */}
                
              
                <div className={styles.detalles}>
                <div class = "col-md-20">
               
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
                
                
    <div className={styles.main}>
      
        <form onSubmit={e => {handleSubmit(e)}} className={styles.root}>
        {console.log(handleSubmit)}

          <div className={styles.titles}>
            ¡Dejanos tu opinión!
          </div>
          <div >
            
              <div className={styles.calif}>Calificación</div>
              <Rating
                id="simple-controlled"
                name="calification"
                value={input.calification}
                onChange={handleInputChange}
              />
            
            <br />
            

            <div className={styles.aca}>Título</div>
            <input
              name="title"
              placeholder= "Escribe un título..."
              value={input.title}
              onChange={handleInputChange}
              label="Titulo"
              className={styles.campotitulo}
              required={true}
              
            />
          </div>


        <div className={styles.aca}>Descripción</div>                   
          <input
            className={styles.inputs}
            placeholder= "Escribe una descripción"
            label="Descripción"
            name="description"
            onChange={handleInputChange}
            required={true}
            
          />
          
          <button type='submit' class="btn btn-outline-success">
              Enviar</button>
       
        
        </form>
    
         
                </div>
            </div>
         </div>
    </div>
</div>
)}

    
    
export default Detail;