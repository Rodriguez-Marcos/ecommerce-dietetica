import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getDiets, getCategories, getProducts, orderPrice, getByPrice, getByIdDietAndCategory } from "../Actions";
import { Form, Button, Overlay, Tooltip, Tab, Tabs, Sonnet } from 'react-bootstrap'
import './Filters.css'


function ProductsFilters({ getDiets, getCategories, getProducts, categories, diets, orderPrice, products, getByIdDiet, getByIdDietAndCategory, getByPrice }) {


    const [sliderValmin, setSliderValmin] = useState('');


    const [sliderValmax, setSliderValmax] = useState('');


    const [categoryfilter, setCategoryFilter] = useState('');


    const [dietsfilter, setDietsFilter] = useState('');





    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getDiets()
    }, [])



    function handleCategory(event) {
        if (event.target.value === 'Category') {
            return getProducts()
        }
        setCategoryFilter(event.target.value)
        return getByIdDietAndCategory(categoryfilter, dietsfilter)
    };

    function handleDiet(event) {
        if (event.target.value === 'Diets') {
            return getProducts()
        }
        setDietsFilter(event.target.value)
        return getByIdDietAndCategory(categoryfilter, dietsfilter)
    };




    function handlePrice(event) {

        if (event.target.value === 'Price') {
            return getProducts();
        }
        orderPrice(products, { tipe: event.target.value })

    }


    function handleName(event) {

        if (event.target.value === 'Order By Name') {
            return getProducts();
        }
        orderPrice(products, { tipe: event.target.value })

    }



    function handleByPriceMin(event) {
        setSliderValmin(event.target.value);
    }


    function handleByPriceMax(event) {
        setSliderValmax(event.target.value);
    }

    function HandleChangeOnSubmit(event) {
        event.preventDefault();
        if (sliderValmin > sliderValmax && sliderValmax > 0) {
            return alert('min es mayor')
        }
        getByPrice(sliderValmin, sliderValmax);
    }



    return (
        <Tabs defaultActiveKey="default" transition={false} >
            <Tab id="title" title="Filtros" disabled />
            <Tab id="titleFilter" eventKey="home" title="Categories">
                {/* <Form> */}
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                className="checkRadio"
                                inline
                                label="All"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handleName}
                                value='Order By Name'
                            />
                            {categories.map((cat, i) => (
                                <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    id="op" key={i} value={cat.id} label={cat.name}
                                    onChange={handleCategory}
                                >
                                </Form.Check>
                            ))}
                        </div>
                    ))}
                {/* </Form> */}
            </Tab>
            <Tab id="titleFilter" eventKey="Diet" title="Diet">
                {/* <Form> */}
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="All"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handleName}
                                value='Order By Name'
                            />
                            {diets.map((diet, i) => (
                                <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    onChange={handleDiet}
                                    id="op" key={i} value={diet.id} label={diet.name}>
                                </Form.Check>
                            ))}
                        </div>
                    ))}
                {/* </Form> */}
            </Tab>
            <Tab id="titleFilter" eventKey="order" title="Order A<->Z">
                {/* <Form> */}
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="All"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handleName}
                                value='Order By Name'
                            />
                            <Form.Check
                                inline
                                label="Ascendent"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handleName}
                                value='Ascendent'
                            />
                            <Form.Check
                                inline
                                label="Descendent"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handleName}
                                value='Descendent'
                            />
                        </div>
                    ))}
                {/* </Form> */}
            </Tab>
            <Tab id="titleFilter" eventKey="Price" title="Price">
                {/* <Form> */}
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="All"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handleName}
                                value='Order By Name'
                            />
                            <Form.Check
                                inline
                                label="Ascendent"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handlePrice}
                                value='Ascendent'
                            />
                            <Form.Check
                                inline
                                label="Descendent"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handlePrice}
                                value='Descendent'
                            />
                        </div>
                    ))}
                {/* </Form> */}
            </Tab>
            <Tab id="titleFilter" eventKey="Pri" title="Precio">
                        <Form onSubmit={HandleChangeOnSubmit}>
                            <label>Search By Price Range</label>
                            <input
                                type="text"
                                placeholder='Min'
                                value={sliderValmin}
                                onChange={handleByPriceMin}
                            />
                            <input
                                type="text"
                                placeholder='Max'
                                value={sliderValmax}
                                onChange={handleByPriceMax}
                            />
                            <input type="submit" value='Search' className='enviarformulario' />

                        </Form>
            </Tab>
        </Tabs>

        // <div className="Selects">
        //      <Form.Control id="select" size="sm" as="select"     onChange={handleCategory}>
        //      <option id="op" label='Categories' value='Categories'></option>
        //         {categories.map((cat, i) => (
        //                 <option id="op" key={i} value={cat.id} label={cat.name}></option>
        //             )) }   

        //     </Form.Control>

        //     <Form.Control id="select" size="sm" as="select" onChange={handleDiet}>
        //     <option id="op" label='Diets' value='Diets'></option>
        //         {diets.map((diet, i) => (
        //                 <option id="op" key={i} value={diet.id} label={diet.name}></option>
        //             )) }
        //     </Form.Control>

        //     <Form.Control id="select" size="sm" as="select" onChange={handleName}>
        //     <option id="op" label='Order By Name' value='Order By Name'></option>
        //             <option id="op" value='Ascendent' >Ascendent</option>
        //             <option id="op" value='Descendent' >Descendent</option>
        //     </Form.Control>

        //     <Form.Control id="select" size="sm" as="select" onChange={handlePrice}>
        //     <option id="op" label='Price' value='Price'></option>
        //             <option id="op" value='Ascendent' >Ascendent</option>
        //             <option id="op" value='Descendent' >Descendent</option>
        //     </Form.Control>

        //     <div className="range-slider">


        //     <form onSubmit={HandleChangeOnSubmit}>
        //         <label>Search By Price Range</label>
        //        <input
        //            type="text"
        //            placeholder='Min'
        //            value={sliderValmin}
        //            onChange={handleByPriceMin}
        //        />

        //        <input
        //            type="text"
        //            placeholder='Max'
        //            value={sliderValmax}
        //            onChange={handleByPriceMax}
        //        />
        //      <input type="submit" value='Search' className='enviarformulario'/>

        //        </form>
        //    </div>

        // </div>
    )
}

const mapStateToProps = ((state) => {

    return {
        products: state.reducerPablo.products,
        categories: state.reducerPablo.categories,
        diets: state.reducerPablo.diets,
        productsbyprice: state.reducerPablo.productsbyprice,

    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories()),
        getDiets: () => dispatch(getDiets()),
        getProducts: () => dispatch(getProducts()),
        orderPrice: (orderTarget, product) => dispatch(orderPrice(orderTarget, product)),
        getByPrice: (priceL, priceH) => dispatch(getByPrice(priceL, priceH)),
        getByIdDietAndCategory: (CategoryId, DietId) => dispatch(getByIdDietAndCategory(CategoryId, DietId))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilters)