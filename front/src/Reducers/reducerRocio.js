import { REVIEW_URL, GET_ID} from "../Actions/index"


const InitialState = {
    detail: {},
    comentario: [],

}

export default function reducerRocio(state = InitialState, action)  {
    switch (action.type) {
        case GET_ID:
            return {
                ...state,
                detail: action.payload
            }
        case REVIEW_URL:
            return{
                ...state,
                comentario: action.payload
                
            }
            default:
                return {
                    state
                }
        }
    }
    