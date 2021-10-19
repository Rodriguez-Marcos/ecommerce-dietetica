

const InitialState = {
    productsFavs: [],
}



export default function favs(state = InitialState, action) {

    switch (action.type) {
        case 'GET_PRODUCTS_FAVS':
            return{
                ...state,
                productsFavs: action.payload
            }
        case 'ADD_FAVS':
            return{
                ...state,
                productsFavs: state.productsFavs.some(x=>x.id===action.payload.id)?[...state.productsFavs]:[...state.productsFavs,action.payload]
            }
        case 'REMOVE_FAVS':
            return{
                ...state,
                productsFavs: state.productsFavs.filter(x=>x.id!==action.payload)
            }
        case 'REMOVE_ALL_FAVS':
            return{
                ...InitialState
            }
        default:
            return {...state}
    }
}