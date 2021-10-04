import { useSelector } from 'react-redux'
import ProductsCards from './Products';


function Search() {
    const productsFiltered = useSelector(state => state.reducerPablo.productsFiltered)
    const loading = useSelector(state => state.reducerPablo.loading)
    const error = useSelector(state => state.reducerPablo.error)

    if (!error && !loading)
        return (<>
            {productsFiltered.length || <h1 style={{marginTop: '79px'}}>No se encontro ningun resultado</h1>}
            <div style={{marginTop: '79px'}} className='home'>
                <ProductsCards
                    products={productsFiltered} />
            </div>
        </>
        )
    if (loading)
        return (
            <h1 style={{marginTop: '79px'}}>Cargando...</h1>
        )
    if (error && !loading)
            return(
                <h1 style={{marginTop: '79px'}}>Error interno</h1>
            )
}

export default Search;