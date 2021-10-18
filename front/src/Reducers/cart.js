

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
        case 'REMOVE':
            return{
                ...state,
                productsCart: state.productsCart.filter(x=>x.id!==action.payload)
            }
        case 'REMOVE_ALL':
            return{
                ...InitialState,
            }
        default:
            return {...state}
    }
}