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
