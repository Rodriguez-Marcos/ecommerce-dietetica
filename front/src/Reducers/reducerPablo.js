import { GET_PRODUCTS,GET_CATEGORIES,GET_DIETS,GET_BY_ID_CATEGORY ,ORDER_PRICE,GET_BY_ID_DIET, GET_PRODUCTS_FILTERED, PAGINATE} from "../Actions/index"


const InitialState = {
    products: [],
    categories:[],
    diets:[],
    productsFiltered: [],
}



export default function reducerPablo(state = InitialState, action) {

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsFiltered: action.payload,
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
                };

            case GET_BY_ID_CATEGORY:
                return{
                    ...state,
                    products:action.payload
                };

            case GET_BY_ID_DIET:
                return{
                    ...state,
                    products:action.payload
                };

            case ORDER_PRICE:
                return{
                    ...state,
                    products:action.payload.slice()
                }
        case GET_PRODUCTS_FILTERED:
            return{
                ...state,
                productsFiltered: action.payload,
            }
            case PAGINATE:
                return {
                    ...state,
                    productsFiltered: action.payload,
                }
        default:
            return {...state}
    }
}

