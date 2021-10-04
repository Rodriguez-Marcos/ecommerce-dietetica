

const InitialState = {
    products: [],
}



export default function reducerDavid(state = InitialState, action) {

    switch (action.type) {
        case 'POST_PRODUCTS':
            return {
                ...state,};
        case 'POST_CATEGORY':
            return {
                ...state
            }
            case 'POST_DIET':
                return {
                    ...state
                }
        case 'DELETE_PRODUCT_BY_ID':
            return {
                ...state,
                products: action.payload, 
            }
            case 'PUT_ PRODUCTS':
                return{
                    ...state
                }
            
        default:
            return {...state}
    }
}