import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDiets, getCategories, getByIdCategory, getProducts } from "../Actions";



function ProductsFilters({ getDiets, getCategories, getByIdCategory, getProducts,categories }) {


    useEffect(() => {
        getCategories()
        }, [])

    function handleCategory(event) {

        if (event.target.value === 'Categories') {
            return getProducts();
        }
        getByIdCategory(event.target.value)
    }


    return (
        <div>

            <select className='selectores' onChange={handleCategory}>
                <option label='Search by Categories' value='Categories'></option>
                {categories.length ? categories.map((cat, i) => (
                        <option key={i} value={cat.id} label={cat.name}></option>
                    )) : null}
            </select>
        </div>
    )
}

const mapStateToProps = ((state) => {

    return {
        products: state.reducerPablo.products,
        categories: state.reducerPablo.categories,
        diets: state.reducerPablo.diets,
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories()),
        getDiets: () => dispatch(getDiets()),
        getByIdCategory: (id) => dispatch(getByIdCategory(id)),
        getProducts: () => dispatch(getProducts()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilters)