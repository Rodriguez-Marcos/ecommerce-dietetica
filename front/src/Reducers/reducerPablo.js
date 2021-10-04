import { GET_PRODUCTS, GET_BY_DIET_AND_CATEGORY, GET_BY_PRICE, GET_CATEGORIES, GET_DIETS, GET_BY_ID_CATEGORY, ORDER_PRICE, GET_BY_ID_DIET, GET_PRODUCTS_FILTERED, PAGINATE, FAIL_TO_LOAD, SET_LOADING, SET_NEW_USER, SET_LOGIN_USER } from "../Actions/index"


const InitialState = {
    products: [],
    categories: [],
    diets: [],
    productsFiltered: [],
    loading: false,
    error: false,
    productsbyprice: [],
    comodin: false,
    user: '0',
}



export default function reducerPablo(state = InitialState, action) {

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsFiltered: action.payload,
                user: '0',
            };


        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            };

        case GET_BY_ID_CATEGORY:
            return {
                ...state,
                products: action.payload
            };

        case GET_BY_ID_DIET:
            return {
                ...state,
                products: action.payload
            };

        case GET_BY_DIET_AND_CATEGORY:
            return {
                ...state,
                products: action.payload
            };

        case ORDER_PRICE:
            return {
                ...state,
                products: action.payload.slice()
            }
        case GET_PRODUCTS_FILTERED:
            return {
                ...state,
                productsFiltered: action.payload,
                loading: false,
                error: false,
            }
        case PAGINATE:
            return {
                ...state,
                productsFiltered: action.payload,
            }
        case FAIL_TO_LOAD:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case GET_BY_PRICE:
            return {
                ...state,
                products: action.payload.slice()
            }
        case 'COMODIN':
            return {
                ...state,
                comodin: !state.comodin,
            }
        case SET_NEW_USER:
            return {
                ...state,
                user: action.payload.message
            }
        case SET_LOGIN_USER:
            return {
                ...state,
                user: action.payload.message
            }
        default:
            return { ...state }
    }
}

