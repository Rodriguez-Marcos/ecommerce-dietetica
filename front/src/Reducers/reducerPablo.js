import { GET_PRODUCTS } from "../Actions/index"


const InitialState = {
    products: [],
}



export default function reducerPablo(state = InitialState, action) {

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };


        default:
            return {...state}
    }
}

