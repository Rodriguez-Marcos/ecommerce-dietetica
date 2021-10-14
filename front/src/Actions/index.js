import axios from 'axios'
import { OrderByPrice } from '../Utils/OrderFunctions';
import getTrolley from "../Utils/getTrolley";
import Cookies from 'universal-cookie'
import { ResponsiveEmbed } from 'react-bootstrap';
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
export const GET_ID = "GET_ID";
export const SET_NEW_USER = 'SET_NEW_USER';
export const SET_LOGIN_USER = 'SET_LOGIN_USER';
export const GET_CLIENTS = 'GET_CLIENTS';
export const UPDATE_CLIENTS = 'UPDATE_CLIENTS';
export const DELETE_CLIENTS = 'DELETE_CLIENTS';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const REVIEW_URL = "/reviews/";
export const GET_ORDERS = 'GET_ORDERS';
export const PUT_ORDERS = 'PUT_ORDERS';
export const FILTER_ORDERS = 'FILTER_ORDERS';


let cookies = new Cookies();






export const paginate = (recipes) => {
    return {
        type: PAGINATE,
        payload: recipes,
    };
};


export function getProducts() {

    return async function (dispatch) {
        return axios.get(`/products/`)
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
        return axios.get(`/products?name=${name}`)
            .then((response) => {
                dispatch({
                    type: GET_PRODUCTS_FILTERED,
                    payload: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: FAIL_TO_LOAD,
                })
            })
    }
}
export function deleteProductByID(id) {
    return async function (dispatch) {
        try {
            const res = await axios.delete('/products/' + id);
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
    return async function (dispatch) {
        try {
            const res = await axios.get('/products/' + id);
            return dispatch({
                type: 'GET_ID',
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

export function postProduct(payload,token) {
    return async function (dispatch) {
        console.log(token)
        await axios.post("/products", payload, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          });

        return dispatch({
            type: "POST_PRODUCTS",
            payload,
        });
    };
}
export function putProduct(payload, id) {
    return async function (dispatch) {
        await axios.put("/products/" + id, payload);

        return dispatch({
            type: "PUT_PRODUCTS",
            payload,
            id,
        });
    };
}




export function postCategory(payload) {
    return async function (dispatch) {
        await axios.post("/categories", payload);
        return dispatch({
            type: "POST_CATEGORY",
            payload,
        });
    };
}
export function postDiet(payload) {
    return async function (dispatch) {
        await axios.post("/diets", payload);

        return dispatch({
            type: "POST_DIET",
            payload,
        });
    };
}

export function getByIdCategory(id) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/products?id_category=${id}`);
            return dispatch({
                type: GET_BY_ID_CATEGORY,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};



export function getByIdDiet(id) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/products?id_diet=${id}`);
            return dispatch({
                type: GET_BY_ID_DIET,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};



export function getProductsFiltered(CategoryId, DietId, priceL, priceH, sortby) {
    return async function (dispatch) {

        try {
            const res = await axios.get(`/products?id_category=${CategoryId}&id_diet=${DietId}&priceL=${priceL}&priceH=${priceH}&sortby=${sortby}`);
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
        return axios.get(`/categories`)
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
        return axios.get(`/diets`)
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
        OrderByPrice(orderTarget, products)

            .then((orderTarget) => {
                return dispatch({

                    type: ORDER_PRICE,
                    payload: orderTarget,
                })
            })
    }
}

export function orderOrders() {
    return async function (dispatch) {
        axios.get()
            .then((response) => {
                return dispatch({
                    type: FILTER_ORDERS,
                    payload: response.data,
                })
            })
    }
}


export function setLoading() {
    return function (dispatch) {
        return dispatch({
            type: SET_LOADING,
        })
    }
}


export function getByPrice(priceL, priceH) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/products?priceL=${priceL}&priceH=${priceH}`);
            return dispatch({
                type: GET_BY_PRICE,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

export function review(payload) {
    return async function (dispatch) {
        await axios.post("/review", payload);

        return dispatch({
            type: "REVIEW_URL",
            payload,
        });
    };
}

export function loginUser(payload) {
    return async function (dispatch) {
            await axios.post(`/login/`,payload)
            return dispatch({
                type: 'SET_LOGIN_USER',
                payload
            })
    }
};


export function getClients() {

    return async function (dispatch) {
        return axios.get(`/clients`)
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: GET_CLIENTS
                })
            })
    }
}

export function updateClients(id) {
    return async function (dispatch) {
        return axios.put(`/clients/`+id)
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: UPDATE_CLIENTS
                })
            })
    }
}

export function resetPassword(id) {
    return async function (dispatch) {
        return axios.put(`/clients/resetpassword/${id}`)
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: RESET_PASSWORD
                })
            })
    }
}


export function deleteClients(id) {
    return async function (dispatch) {
        try {
            const res = await axios.delete('/clients/' + id);
            return dispatch({
                type: 'DELETE_CLIENTS',
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};
export function deleteCategory(id) {
    return async function (dispatch) {
        try {
            const res = await axios.delete('/categories/' + id);
            return dispatch({
                type: 'DELETE_CATEGORIES',
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};
export function deleteDiets(id) {
    return async function (dispatch) {
        try {
            const res = await axios.delete('/diets/' + id);
            return dispatch({
                type: 'DELETE_DIETS',
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};
export function getOrders() {

    return async function (dispatch) {
        return axios.get(`/orders`)
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: GET_ORDERS
                })
            })
    }
}
export function putOrders(payload, id ){
    return async function (dispatch) {
        await axios.put("/products/"+ id, payload);
       
           return dispatch({
             type: PUT_ORDERS,
             payload,
             id,
           });
         };
       }

export function postAdress(){
    return 0
}

export default function getTrolleyAction() {
    return async function (dispatch) {
        try {
            let cookieTrolley = cookies.get('trolley')?.map(x => {
                let id = x
                return {id}
            })
            let res = await getTrolley(cookieTrolley.map(x=>x.id))
            let payload = [];
            console.log(res.data)
            res.data.forEach(x=>{
                cookieTrolley.forEach(({id})=>{
                    if(x.id===id.id)
                    payload.push( {...x,cantidad: id.quantity})
                })
            })
            return dispatch({
                type: 'GET_PRODUCTS_CART',
                payload
            })
        } catch (err) {
            console.log(err)
        };
    };
}