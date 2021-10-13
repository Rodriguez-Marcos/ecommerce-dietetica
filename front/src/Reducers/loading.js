
const InitialState = {
    loading: false,
    error: false,
}



export default function loading(state = InitialState, action) {

    switch (action.type) {
        case 'LOADING':
            return{
                ...state,
                loading: action.payload,
            }
        case 'ERROR':
            return{
                ...state,
                error: action.payload,
            }
        default:
            return {...state}
    }
}