import axios from 'axios'
import { OrderByPrice } from '../Utils/OrderFunctions';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_DIETS = 'GET_DIETS';
export const GET_BY_ID_CATEGORY = 'GET_BY_ID_CATEGORY';
export const GET_BY_ID_DIET = 'GET_BY_ID_DIET';
export const ORDER_PRICE = 'ORDER_PRICE';

export function getProducts() {

    return async function (dispatch) {
        return axios.get(`http://localhost:3001/products/`)
            .then((response) => {
                dispatch({
                    type: GET_PRODUCTS,
                    payload: response.data
                })
            })
    }
}

export function getProductbyName() {
    return 0
}

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


export function orderPrice(orderTarget, product) {
    return async function (dispatch) {
        OrderByPrice(orderTarget, product)
        .then((orderTarget) => {
            return dispatch({
                    type: ORDER_PRICE,
                    payload: orderTarget,
                })
            })
    }
}


