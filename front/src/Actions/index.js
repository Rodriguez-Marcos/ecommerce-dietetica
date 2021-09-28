import axios from 'axios'
export const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts() {

    return async function (dispatch) {
        return axios.get(`http://localhost:3001/products`)
            .then((response) => {
                console.log(response)
                dispatch({
                    type: GET_PRODUCTS,
                    payload: response.data
                })
            })
    }
}
