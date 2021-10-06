
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { REVIEW_URL } from "../Actions/index";
import { useSelector, useDispatch } from 'react-redux'
import { getById } from '../Actions/index'
import styles from './Detail.css'
import { Container, Row, Col, Image, Form, Button, ListGroup, ListGroupItem, Card, Accordion } from 'react-bootstrap'
import Cookies from 'universal-cookie';



// import { DiscussionEmbed } from 'disqus-react';


import { Rating } from "@material-ui/lab";
import swal from "sweetalert";
const cookies = new Cookies();


function Detail({ match }) {
  const { id } = match.params
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getById(id))
  }, [dispatch])

  const producto = useSelector(state => state.reducerRocio.detail)

  function handleClickTrolley(e) {
    e.preventDefault();
    let add = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : []; /// trolley : []
    if (!add.find(x => x.id === producto.id))
      add.push(producto);
    cookies.set('trolley', add)
  }


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


  // function handleSubmit(e) {
  //   e.preventDefault();
  //   return axios
  //     .post(REVIEW_URL + id, input)
  //     .then((r) => {
  //       e.target.reset();
  //       setInput({
  //         title: "",
  //         description: "",
  //         calification: "",
  //       });
  //       swal("Creado", "Comentario enviado con éxito!", "success")
  //       .then( () => window.location.href="/" );
  //       console.log('rompieste todo juancito')
  //     })
  //     .catch((error) => swal("Error", error, "error"));
  // }
  
      function handleSubmit(e) {
        e.preventDefault()
        return axios.post(REVIEW_URL+id, input)
          .then((r) => {
            e.target.reset()
            setInput({
              title: "",
              description: "",
              calification: "",
            });
            swal("Creado", "Comentario enviado con éxito!", "success")
            .then( () => window.location.reload() );
          })
          .catch((error) => swal("Error", error, "error"));
        }

        {/*             
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
      return (
    <Container>
      <Row id="row1">
        <div id="nameProduct"><h1>{producto?.name.toUpperCase()}</h1></div>
        <Col id="img" md={6}>
          <Image id="imgProduct" src={producto?.image} alt='none' fluid />
        </Col>
        <Col md={6}>
          <Row>
            <Col>
              <label>Precio:</label>
              <p>${producto?.price} </p>
              <label>Sobre este producto:</label>
              <p> {producto?.description} </p>

              <label>Stock:</label>
              <p> {producto?.stock} unidades</p>

              <label>Categorias:</label>
              {producto?.categories.map(category => { return <p>{category.name}</p> })}
            </Col>
          </Row>
        </Col>
        <Row>
          <Col id="btnsProduct">
            <button type="button" class="btn btn-secondary">Agregar a favoritos</button>
            <button type="button" class="btn btn-success">Agregar al carrito</button>
          </Col>
        </Row>
      </Row>
      <hr />
      <Row>
        <Col>
        <Accordion defaultActiveKey="0">
          <Card id="CrearComentario">
            <Card.Body >
              <Form onSubmit={e => { handleSubmit(e) }} >
                {console.log(handleSubmit)}
                <Card.Title id="titleOpinion">¡Dejanos tu opinión!</Card.Title>
                <Card.Title>Calificanos    
                  <Rating
                    id="simple-controlled"
                    name="calification"
                    value={input.calification}
                    onChange={handleInputChange}
                  />
                </Card.Title>
                <Form.Group >
                  <Form.Label>Título</Form.Label>
                  <Form.Control rows={3}
                    name="title"
                    placeholder="Escribe un título..."
                    value={input.title}
                    required={true}
                    onChange={handleInputChange}
                    label="Titulo"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    placeholder="Escribe una descripción"
                    label="Descripción"
                    name="description"
                    onChange={handleInputChange}
                    required={true}

                  />
                </Form.Group>
                <Form.Group id="btnComentario">
                  <Button type='submit' class="btn btn-outline-success">
                    Enviar
                  </Button>
                </Form.Group>

              </Form>
            </Card.Body>
          </Card>
            </Accordion>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <Card id="titulosComentario">
            <Card.Body>
                  <Card.Title>Comentarios anteriores:</Card.Title>
                  <ListGroup>
                    {producto?.reviews.map((elemento) =>{
                      return(
                      <ListGroupItem>
                         <Card.Title> Calificación: </Card.Title>
                          <Rating
                            id="simple-controlled"
                            name="calification"
                            value={elemento.calification}/>
                          <Card.Title>{elemento.title} </Card.Title>
                            <p>{elemento.description}</p>
                          </ListGroupItem>
                      )})}
                      </ListGroup>
              </Card.Body>  
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Detail;