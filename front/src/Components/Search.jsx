import { useSelector } from 'react-redux'
import ProductsCards from './Products';
import { Spinner } from 'react-bootstrap'
import './Search.css'
import NavBar from './NavBar';


function Search() {
    const productsFiltered = useSelector(state => state.reducerPablo.productsFiltered)
    const loading = useSelector(state => state.reducerPablo.loading)
    const error = useSelector(state => state.reducerPablo.error)

    if (!error && !loading)
        return (
        <div id="contenedor">
            <NavBar/>
            <div id="s">
            {!productsFiltered.length? <h1>No se encontro ningun resultado</h1>:null}
            </div>
            <div id="s1">
                <ProductsCards
                    products={productsFiltered} />
            </div>
        </div>
        )
    if (loading)
        return (
            <div id="contenedor">
                <div id="s">
                    <h3> Cargando..
                        <Spinner animation="border" variant="success" />
                        <Spinner animation="border" variant="danger" />
                        <Spinner animation="border" variant="warning" />
                    </h3>

                </div>
            </div>

        )
    if (error && !loading)
        return (
            <h1 style={{ marginTop: '79px' }}>Error interno</h1>
        )
}

export default Search;