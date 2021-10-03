import axios from 'axios'
import { OrderByPrice } from '../Utils/OrderFunctions';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_DIETS = 'GET_DIETS';
export const GET_BY_ID_CATEGORY = 'GET_BY_ID_CATEGORY';
export const GET_BY_ID_DIET = 'GET_BY_ID_DIET';
export const ORDER_PRICE = 'ORDER_PRICE';
export const GET_PRODUCTS_FILTERED = 'GET_PRODUCTS_FILTERED';
export const GET_BY_PRICE = 'GET_BY_PRICE';
export const GET_BY_DIET_AND_CATEGORY = 'GET_BY_DIET_AND_CATEGORY';
export const PAGINATE = 'PAGINATE';
export const FAIL_TO_LOAD = 'FAIL_TO_LOAD'
export const SET_LOADING = 'SET_LOADING';

export const paginate = (recipes) => {
    return {
        type: PAGINATE,
        payload: recipes,
    };
};

export function getProducts() {

    return async function (dispatch) {
        return axios.get(`http://localhost:3001/products/`)
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: GET_PRODUCTS
                })
            })
    }
}

export function getProductbyName(name) {
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/products?name=${name}`)
            .then((response) => {
                dispatch({
                    type: GET_PRODUCTS_FILTERED,
                    payload: response.data
                })
            })
            .catch(err=>{
                dispatch({
                    type: FAIL_TO_LOAD,
                })
            })
    }
}
export function deleteProductByID(id) {
    return async function(dispatch) {
        try {
            const res = await axios.delete('http://localhost:3001/products/' + id);
            console.log(res)
            return dispatch({
                type: 'DELETE_PRODUCT_BY_ID',
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};


export function getById(id) {
    return async function(dispatch) {
        try {
            const res = await axios.get('http://localhost:3001/products/' + id);
            console.log(res)
            return dispatch({
                type: 'GET_ID',
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

export function postProduct(payload){
    return async function (dispatch) {
        await axios.post("http://localhost:3001/products", payload);
       
           return dispatch({
             type: "POST_PRODUCTS",
             payload,
           });
         };
       }

   

export function postCategory(payload){
    return async function (dispatch) {
        await axios.post("http://localhost:3001/categories", payload);
       
           return dispatch({
             type: "POST_CATEGORY",
             payload,
           });
         };
       }
       export function postDiet(payload){
        return async function (dispatch) {
            await axios.post("http://localhost:3001/diets", payload);
           
               return dispatch({
                 type: "POST_DIET",
                 payload,
               });
             };
           }

export function getByIdCategory(id){
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/products?id_category=${id}`);
            console.log(res)
            return dispatch({
                type: GET_BY_ID_CATEGORY,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};



export function getByIdDiet(id){
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/products?id_diet=${id}`);
            console.log(res)
            return dispatch({
                type: GET_BY_ID_DIET,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};


export function getByIdDietAndCategory(CategoryId,DietId){
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/products?id_category=${CategoryId}&id_diet=${DietId}`);
            return dispatch({
                type: GET_BY_DIET_AND_CATEGORY,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};




export function getCategories() {
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/categories`)
            .then((response) => {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: response.data
                })
            })
    }
}


export function getDiets() {
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/diets`)
            .then((response) => {
                dispatch({
                    type: GET_DIETS,
                    payload: response.data
                })
            })
    }
}


export function orderPrice(orderTarget, products) {
    return async function (dispatch) {
        console.log(orderTarget,products)
        OrderByPrice(orderTarget, products)
        
        .then((orderTarget) => {
            return dispatch({
                    type: ORDER_PRICE,
                    payload: orderTarget,
                })
            })
    }
}


export function setLoading(){
    return function(dispatch) {
        return dispatch({
            type: SET_LOADING,
        })
    }
}


export function getByPrice(priceL,priceH){
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/products?priceL=${priceL}&priceH=${priceH}`);
            return dispatch({
                type: GET_BY_PRICE,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

