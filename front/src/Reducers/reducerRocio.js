const InitialState = {
    detail: {},
}

export default function reducerRocio(state = InitialState, action)  {
    switch (action.type) {
        case 'GET_ID':
            return {
                ...state,
                detail: action.payload
            }
            default:
                return {
                    state
                }
        }
    }
    