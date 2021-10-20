
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { REVIEW_URL } from "../Actions/index";
import { useSelector, useDispatch } from 'react-redux'
import { getById, allowReview,postReview } from '../Actions/index'
import styles from './Detail.css'
import { Container, Row, Col, Image, Form, Button, ListGroup, ListGroupItem, Card, Accordion } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import NavBar from './NavBar'





// import { DiscussionEmbed } from 'disqus-react';


import { Rating } from "@material-ui/lab";
import swal from "sweetalert";
import postCarrito from '../Utils/postCarrito';
import postFavorites from '../Utils/postFavorites';
import { useHistory } from 'react-router';
import usePath from '../Hooks/UsePaths';
const cookies = new Cookies();


function Detail({ match }) {
  const [counter, setCounter] = useState(1);
  const id = JSON.parse(match.params.id);
  const dispatch = useDispatch();
  const history = useHistory();
  const  { pushPath } = usePath();
  const myStorage = window.localStorage;


  useEffect(() => {
    dispatch(getById(id))
    dispatch(allowReview(id,myStorage.getItem('jwt')))
  }, [dispatch])

  const producto = useSelector(state => state.reducerRocio.detail)
  const allowR = useSelector(state => state.reducerRocio.allowR)
  const { isLogin, token } = useSelector(state => state.reducerPablo)

  async function addFavorite(e){
    console.log('hola')
    if (!isLogin){
      pushPath();
      history.push('/login');
    };
    await postFavorites(id,token);
  }

  function handleClickTrolley(e) {
    e.preventDefault();
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : []; /// trolley : []
    if (!trolley.find(x => x.id === id)) {
      let quantity = counter;
      trolley.push({ id, quantity });
      if (isLogin) postCarrito(token, { id, quantity });
    }
    cookies.set('trolley', trolley)
    dispatch({
      type: 'COMODIN',
    })
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


  function handleSubmit(e) {
    e.preventDefault()
   dispatch(postReview(input,id,token))
   window.location.reload()
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



  if (producto?.stock === 0) {
    if(isLogin===true&&allowR===true){
    return (
      <div>
        <NavBar />
        <Container id="CantainerDetails">
          <Row id="row1">
            <Col id="detalle" md={8} xs={12}>
              <div class="overflow-auto" id="CrearComentario">
                <div id="imgProduct">
                  <Image src={producto?.image} alt='none' fluid />
                </div>
                <hr />
                <Card id="CrearComentario1">
                  <Card.Body >
                    <Form onSubmit={e => { handleSubmit(e) }} >
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
                <Card id="titulosComentario">
                  <Card.Body>
                    <Card.Title>Comentarios anteriores:</Card.Title>
                    <ListGroup>
                      {producto?.reviews?.map((elemento) => {
                        return (
                          <ListGroupItem>
                            <Card.Title> Calificación: </Card.Title>
                            <Rating
                              id="simple-controlled"
                              name="calification"
                              value={elemento.calification} />
                            <Card.Title>{elemento.title} </Card.Title>
                            <p>{elemento.description}</p>
                          </ListGroupItem>
                        )
                      })}
                    </ListGroup>
                  </Card.Body>
                </Card>
                {/* ---------------------------------Modo telefono---------------- */}
                <Card id="detallesTel">
                  <Card.Body>
                    <Card.Title>
                      <h1 id="nameProduct">{producto?.name?.toUpperCase()}</h1>
                    </Card.Title>
                    <Card.Text>
                      <span id="precioDetalle">${producto?.price} </span>
                    </Card.Text>
                    <hr />
                    <div id="btnsProduct">
                      <button onClick={addFavorite} type="button" class="btn btn-secondary">Agregar a favoritos</button>
                      <Card.Text>
                      <Card.Subtitle className="text-muted">Producto no disponible</Card.Subtitle>
                      
                    </Card.Text>
                    </div>
                    <hr />
                    <Card.Text>
                      <Card.Subtitle className="text-muted"> Sobre este producto: </Card.Subtitle>
                      {producto?.description}
                    </Card.Text>
                    <hr />
                    <Card.Text>
                      <Card.Subtitle className="text-muted">Categorias: </Card.Subtitle>
                      {producto?.categories?.map(category => { return <span>/{category.name}</span> })}
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/* -------------------------------------------------------------- */}
              </div>
            </Col>



            <Col md={4} xs={12}>
              <Row>
                <Col>
                  <Card id="det">
                    <Card.Body>
                      <Card.Title>
                        <h1 id="nameProduct">{producto?.name?.toUpperCase()}</h1>
                      </Card.Title>
                      <Card.Text>
                        <span id="precioDetalle"> ${producto?.price} </span>
                      </Card.Text>
                      <hr />
                      <div id="btnsProduct">
                        <button onClick={addFavorite} type="button" class="btn btn-secondary">Agregar a favoritos</button>
                        <Card.Text>
                        <Card.Subtitle className="text-muted">Producto no disponible </Card.Subtitle>
                      </Card.Text>
                      </div>
                      <hr />
                      <Card.Text>
                        <Card.Subtitle className="text-muted"> Sobre este producto: </Card.Subtitle>
                        {producto?.description}
                      </Card.Text>
                      <hr />
                      <Card.Text>
                        <Card.Subtitle className="text-muted">Categorias: </Card.Subtitle>
                        {producto?.categories?.map(category => { return <span>/{category.name}</span> })}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {/* --------------------------Modo Telefono------------------ */}
                  <Card id="CrearComentarioTel">
                    <Card.Body >
                      <Form onSubmit={e => { handleSubmit(e) }} >
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
                  <Card id="titulosComentarioTel">
                    <Card.Body>
                      <Card.Title>Comentarios anteriores:</Card.Title>
                      <ListGroup>
                        {producto?.reviews?.map((elemento) => {
                          return (
                            <ListGroupItem>
                              <Card.Title> Calificación: </Card.Title>
                              <Rating
                                id="simple-controlled"
                                name="calification"
                                value={elemento.calification} />
                              <Card.Title>{elemento.title} </Card.Title>
                              <p>{elemento.description}</p>
                            </ListGroupItem>
                          )
                        })}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                  {/* --------------------------------------------------------- */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } else{
    return (
      <div>
        <NavBar />
        <Container id="CantainerDetails">
          <Row id="row1">
            <Col id="detalle" md={8} xs={12}>
              <div class="overflow-auto" id="CrearComentario">
                <div id="imgProduct">
                  <Image src={producto?.image} alt='none' fluid />
                </div>
                <hr />
                <Card id="titulosComentario">
                  <Card.Body>
                    <Card.Title>Comentarios anteriores:</Card.Title>
                    <ListGroup>
                      {producto?.reviews?.map((elemento) => {
                        return (
                          <ListGroupItem>
                            <Card.Title> Calificación: </Card.Title>
                            <Rating
                              id="simple-controlled"
                              name="calification"
                              value={elemento.calification} />
                            <Card.Title>{elemento.title} </Card.Title>
                            <p>{elemento.description}</p>
                          </ListGroupItem>
                        )
                      })}
                    </ListGroup>
                  </Card.Body>
                </Card>
                {/* ---------------------------------Modo telefono---------------- */}
                <Card id="detallesTel">
                  <Card.Body>
                    <Card.Title>
                      <h1 id="nameProduct">{producto?.name?.toUpperCase()}</h1>
                    </Card.Title>
                    <Card.Text>
                      <span id="precioDetalle">${producto?.price} </span>
                    </Card.Text>
                    <hr />
                    <div id="btnsProduct">
                      <button onClick={addFavorite} type="button" class="btn btn-secondary">Agregar a favoritos</button>
                      <Card.Text>
                      <Card.Subtitle className="text-muted">Producto no disponible</Card.Subtitle>
                      
                    </Card.Text>
                    </div>
                    <hr />
                    <Card.Text>
                      <Card.Subtitle className="text-muted"> Sobre este producto: </Card.Subtitle>
                      {producto?.description}
                    </Card.Text>
                    <hr />
                    <Card.Text>
                      <Card.Subtitle className="text-muted">Categorias: </Card.Subtitle>
                      {producto?.categories?.map(category => { return <span>/{category.name}</span> })}
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/* -------------------------------------------------------------- */}
              </div>
            </Col>



            <Col md={4} xs={12}>
              <Row>
                <Col>
                  <Card id="det">
                    <Card.Body>
                      <Card.Title>
                        <h1 id="nameProduct">{producto?.name?.toUpperCase()}</h1>
                      </Card.Title>
                      <Card.Text>
                        <span id="precioDetalle"> ${producto?.price} </span>
                      </Card.Text>
                      <hr />
                      <div id="btnsProduct">
                        <button onClick={addFavorite} type="button" class="btn btn-secondary">Agregar a favoritos</button>
                        <Card.Text>
                        <Card.Subtitle className="text-muted">Producto no disponible </Card.Subtitle>
                      </Card.Text>
                      </div>
                      <hr />
                      <Card.Text>
                        <Card.Subtitle className="text-muted"> Sobre este producto: </Card.Subtitle>
                        {producto?.description}
                      </Card.Text>
                      <hr />
                      <Card.Text>
                        <Card.Subtitle className="text-muted">Categorias: </Card.Subtitle>
                        {producto?.categories?.map(category => { return <span>/{category.name}</span> })}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {/* --------------------------Modo Telefono------------------ */}
                  <Card id="titulosComentarioTel">
                    <Card.Body>
                      <Card.Title>Comentarios anteriores:</Card.Title>
                      <ListGroup>
                        {producto?.reviews?.map((elemento) => {
                          return (
                            <ListGroupItem>
                              <Card.Title> Calificación: </Card.Title>
                              <Rating
                                id="simple-controlled"
                                name="calification"
                                value={elemento.calification} />
                              <Card.Title>{elemento.title} </Card.Title>
                              <p>{elemento.description}</p>
                            </ListGroupItem>
                          )
                        })}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                  {/* --------------------------------------------------------- */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  } else {
    if (isLogin===true&&allowR===true){
    return (
      <div>
        <NavBar />
        <Container id="CantainerDetails">
          <Row id="row1">
            <Col id="detalle" md={8} xs={12}>
              <div class="overflow-auto" id="CrearComentario">
                <div id="imgProduct">
                  <Image src={producto?.image} alt='none' fluid />
                </div>
                <hr />
                <Card id="CrearComentario1">
                  <Card.Body >
                    <Form onSubmit={e => { handleSubmit(e) }} >
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
                <Card id="titulosComentario">
                  <Card.Body>
                    <Card.Title>Comentarios anteriores:</Card.Title>
                    <ListGroup>
                      {producto?.reviews?.map((elemento) => {
                        return (
                          <ListGroupItem>
                            <Card.Title> Calificación: </Card.Title>
                            <Rating
                              id="simple-controlled"
                              name="calification"
                              value={elemento.calification} />
                            <Card.Title>{elemento.title} </Card.Title>
                            <p>{elemento.description}</p>
                          </ListGroupItem>
                        )
                      })}
                    </ListGroup>
                  </Card.Body>
                </Card>
                {/* ---------------------------------Modo telefono---------------- */}
                <Card id="detallesTel">
                  <Card.Body>
                    <Card.Title>
                      <h1 id="nameProduct">{producto?.name?.toUpperCase()}</h1>
                    </Card.Title>
                    <Card.Text>
                      <span id="precioDetalle">${producto?.price} </span>
                    </Card.Text>
                    <hr />
                    <div id="btnsProduct">
                      <button onClick={addFavorite} type="button" class="btn btn-secondary">Agregar a favoritos</button>
                      <button onClick={handleClickTrolley} type="button" class="btn btn-success">Agregar al carrito</button>
                    </div>
                    <hr />
                    <Card.Text>
                      <Card.Subtitle className="text-muted"> Sobre este producto: </Card.Subtitle>
                      {producto?.description}
                    </Card.Text>
                    <hr />
                    <Card.Text>
                      <Card.Subtitle className="text-muted">Categorias: </Card.Subtitle>
                      {producto?.categories?.map(category => { return <span>/{category.name}</span> })}
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/* -------------------------------------------------------------- */}
              </div>
            </Col>



            <Col md={4} xs={12}>
              <Row>
                <Col>
                  <Card id="det">
                    <Card.Body>
                      <Card.Title>
                        <h1 id="nameProduct">{producto?.name?.toUpperCase()}</h1>
                      </Card.Title>
                      <Card.Text>
                        <span id="precioDetalle"> ${producto?.price} </span>
                      </Card.Text>
                      <hr />
                      <div id="btnsProduct">
                        <button onClick={addFavorite} type="button" class="btn btn-secondary">Agregar a favoritos</button>
                        <button onClick={handleClickTrolley} type="button" class="btn btn-success">Agregar al carrito</button>
                      </div>
                      <hr />
                      <Card.Text>
                        <Card.Subtitle className="text-muted"> Sobre este producto: </Card.Subtitle>
                        {producto?.description}
                      </Card.Text>
                      <hr />
                      <Card.Text>
                        <Card.Subtitle className="text-muted">Categorias: </Card.Subtitle>
                        {producto?.categories?.map(category => { return <span>/{category.name}</span> })}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {/* --------------------------Modo Telefono------------------ */}
                  <Card id="CrearComentarioTel">
                    <Card.Body >
                      <Form onSubmit={e => { handleSubmit(e) }} >
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
                  <Card id="titulosComentarioTel">
                    <Card.Body>
                      <Card.Title>Comentarios anteriores:</Card.Title>
                      <ListGroup>
                        {producto?.reviews?.map((elemento) => {
                          return (
                            <ListGroupItem>
                              <Card.Title> Calificación: </Card.Title>
                              <Rating
                                id="simple-controlled"
                                name="calification"
                                value={elemento.calification} />
                              <Card.Title>{elemento.title} </Card.Title>
                              <p>{elemento.description}</p>
                            </ListGroupItem>
                          )
                        })}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                  {/* --------------------------------------------------------- */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
    } else {
      return (
        <div>
          <NavBar />
          <Container id="CantainerDetails">
            <Row id="row1">
              <Col id="detalle" md={8} xs={12}>
                <div class="overflow-auto" id="CrearComentario">
                  <div id="imgProduct">
                    <Image src={producto?.image} alt='none' fluid />
                  </div>
                  <hr />
                  <Card id="titulosComentario">
                    <Card.Body>
                      <Card.Title>Comentarios anteriores:</Card.Title>
                      <ListGroup>
                        {producto?.reviews?.map((elemento) => {
                          return (
                            <ListGroupItem>
                              <Card.Title> Calificación: </Card.Title>
                              <Rating
                                id="simple-controlled"
                                name="calification"
                                value={elemento.calification} />
                              <Card.Title>{elemento.title} </Card.Title>
                              <p>{elemento.description}</p>
                            </ListGroupItem>
                          )
                        })}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                  {/* ---------------------------------Modo telefono---------------- */}
                  <Card id="detallesTel">
                    <Card.Body>
                      <Card.Title>
                        <h1 id="nameProduct">{producto?.name?.toUpperCase()}</h1>
                      </Card.Title>
                      <Card.Text>
                        <span id="precioDetalle">${producto?.price} </span>
                      </Card.Text>
                      <hr />
                      <div id="btnsProduct">
                        <button onClick={addFavorite} type="button" class="btn btn-secondary">Agregar a favoritos</button>
                        <button onClick={handleClickTrolley} type="button" class="btn btn-success">Agregar al carrito</button>
                      </div>
                      <hr />
                      <Card.Text>
                        <Card.Subtitle className="text-muted"> Sobre este producto: </Card.Subtitle>
                        {producto?.description}
                      </Card.Text>
                      <hr />
                      <Card.Text>
                        <Card.Subtitle className="text-muted">Categorias: </Card.Subtitle>
                        {producto?.categories?.map(category => { return <span>/{category.name}</span> })}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {/* -------------------------------------------------------------- */}
                </div>
              </Col>
  
  
  
              <Col md={4} xs={12}>
                <Row>
                  <Col>
                    <Card id="det">
                      <Card.Body>
                        <Card.Title>
                          <h1 id="nameProduct">{producto?.name?.toUpperCase()}</h1>
                        </Card.Title>
                        <Card.Text>
                          <span id="precioDetalle"> ${producto?.price} </span>
                        </Card.Text>
                        <hr />
                        <div id="btnsProduct">
                          <button onClick={addFavorite} type="button" class="btn btn-secondary">Agregar a favoritos</button>
                          <button onClick={handleClickTrolley} type="button" class="btn btn-success">Agregar al carrito</button>
                        </div>
                        <hr />
                        <Card.Text>
                          <Card.Subtitle className="text-muted"> Sobre este producto: </Card.Subtitle>
                          {producto?.description}
                        </Card.Text>
                        <hr />
                        <Card.Text>
                          <Card.Subtitle className="text-muted">Categorias: </Card.Subtitle>
                          {producto?.categories?.map(category => { return <span>/{category.name}</span> })}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* --------------------------Modo Telefono------------------ */}
                    <Card id="titulosComentarioTel">
                      <Card.Body>
                        <Card.Title>Comentarios anteriores:</Card.Title>
                        <ListGroup>
                          {producto?.reviews?.map((elemento) => {
                            return (
                              <ListGroupItem>
                                <Card.Title> Calificación: </Card.Title>
                                <Rating
                                  id="simple-controlled"
                                  name="calification"
                                  value={elemento.calification} />
                                <Card.Title>{elemento.title} </Card.Title>
                                <p>{elemento.description}</p>
                              </ListGroupItem>
                            )
                          })}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                    {/* --------------------------------------------------------- */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }



  }
}

export default Detail;