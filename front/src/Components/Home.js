






function ProductsHome({ recipe, getProducts }) {

  
    useEffect(() => {
        getProducts()
     //eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])


    return (
        <div >
                <div className='home'>
                <RecipesCards
                    products={products} /> 
            </div> 

        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHome)