import axios from 'axios'
export const GET_PRODUCTS = 'GET_PRODUCTS';

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
