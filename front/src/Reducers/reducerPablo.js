import { GET_PRODUCTS,GET_PRODUCTS_ADMIN,GET_ORDERS,RESET_PASSWORD,FILTER_ORDERS, DELETE_CLIENTS, GET_CLIENTS, GET_BY_DIET_AND_CATEGORY, GET_BY_PRICE, GET_CATEGORIES, GET_DIETS, GET_BY_ID_CATEGORY, ORDER_PRICE, GET_BY_ID_DIET, GET_PRODUCTS_FILTERED, PAGINATE, FAIL_TO_LOAD, SET_LOADING, SET_NEW_USER, SET_LOGIN_USER, PUT_ORDERS, POST_ADDRESS,GET_ADDRESS } from "../Actions/index"



const InitialState = {
    products: [],
    productsAdmin:[],
    categories: [],
    diets: [],
    productsFiltered: [],
    loading: false,
    error: false,
    productsbyprice: [],
    comodin: false,
    user: {},
    IsAdmin: false,
    isLogin: false,
    token: {},
    clients: [],
    orders: [], 
    address:[],
    paths: [null,null,null],

}



export default function reducerPablo(state = InitialState, action) {

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsFiltered: action.payload,

            };
            case GET_PRODUCTS_ADMIN:
                return {
                    ...state,
                    products: action.payload
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
                productsFiltered: action.payload
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
                user: action.payload
            }
        case SET_LOGIN_USER:
            return {
                ...state,
                IsAdmin: action.payload,
            }
        case 'LOGIN':
            return {
                ...state,
                isLogin: true,
                token: action.payload,

            }
        case 'LOGOUT':
            return {
                ...state,
                token: '',
                isLogin: false,
            }
        case GET_CLIENTS:
            return {
                ...state,
                clients: action.payload,
            };
        case DELETE_CLIENTS:
            return {
                ...state,
                clients: action.payload.data,
            };
        case 'DELETE_CATEGORIES':
            return {
                ...state,

            };
        case 'DELETE_DIETS':
            return {
                ...state,

            };
        case 'UPDATE_CLIENTS':
            return {
                ...state,
            };
        case RESET_PASSWORD:
            return {
                ...state,
            };

        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };
        case PUT_ORDERS:
            return {
                ...state
            }
        case FILTER_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case 'SET_PATH':
            return{
                ...state,
                paths: action.payload
            }
            case 'FILTER_ORDERS':
                return {
                    ...state,
                    orders: action.payload,
                    
                }
        default:
            return { ...state }
    }
}

