import { REVIEW_URL, GET_ID} from "../Actions/index"


const InitialState = {
    detail: {},
    comentario: [],
    allowR:""

}

export default function reducerRocio(state = InitialState, action)  {
    switch (action.type) {
        case GET_ID:
            return {
                ...state,
                detail: action.payload[0]
            }
            case REVIEW_URL:
                return{
                    ...state,
                    
                }
            case "ALLOW_REVIEW":
                return {
                    ...state,
                    allowR: action.payload
                }
            default:
                return {
                    ...state
                }
        }
    }
    