
// import axios from 'axios';
import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {  getById } from '../Actions/index'
import styles from './Detail.module.css'

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
        <div className={styles.main}>
                
            <div className={styles.dogDetail}>
                <br />
                
                <p className={styles.dogName}><br /> Name: {producto?.name.toUpperCase()}</p>

                <br />
                <br />

                <img className={styles.dogImage} src={producto?.image  || 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2019/08/07/5e998395e126a.jpeg'} alt='none'/>

                <br />
                <br />
   
                <br />

                <p className={styles.dogWeight}>Price:  {producto?.price} </p>

              

                <p className={styles.dogWeight}>description: {producto?.description} </p>

               

                <p className={styles.dogWeight}>Stock:  {producto?.stock}</p>
              

            </div>
      
        </div>
    

    )

        
                    }





    
export default Detail;