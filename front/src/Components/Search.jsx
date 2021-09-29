import { useSelector } from 'react-redux'
import ProductsCards from './Products';


function Search() {
    const productsFiltered = useSelector(state => state.reducerPablo.productsFiltered)
    const loading = useSelector(state => state.reducerPablo.loading)
    const error = useSelector(state => state.reducerPablo.error)

    if (!error && !loading)
        return (<>
            {productsFiltered.length || <h1>No se encontro ningun resultado</h1>}
            <div className='home'>
                <ProductsCards
                    products={productsFiltered} />
            </div>
        </>
        )
    if (loading)
        return (
            <h1>Cargando...</h1>
        )
    if (error && !loading)
            return(
                <h1>Error interno</h1>
            )
}

export default Search;