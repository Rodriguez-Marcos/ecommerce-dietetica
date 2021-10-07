

const InitialState = {
    productsCart: [],
}



export default function cart(state = InitialState, action) {

    switch (action.type) {
        case 'GET_PRODUCTS_CART':
            return{
                ...state,
                productsCart: action.payload
            }
        default:
            return {...state}
    }
}