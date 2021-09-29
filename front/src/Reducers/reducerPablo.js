
import { GET_PRODUCTS,GET_CATEGORIES,GET_DIETS,GET_BY_ID_CATEGORY } from "../Actions/index"


const InitialState = {
    products: [],
    categories:[],
    diets:[],
}



export default function reducerPablo(state = InitialState, action) {

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
            

            case GET_CATEGORIES:
                return {
                    ...state,
                    categories: action.payload,
                };
            case GET_DIETS:
                return {
                    ...state,
                    diets:action.payload,
                }
            case GET_BY_ID_CATEGORY:
                return{
                    ...state,
                    products:action.payload
                }
    
    


        default:
            return {...state}
    }
}

