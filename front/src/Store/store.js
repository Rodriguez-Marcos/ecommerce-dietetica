import{createStore, applyMiddleware} from 'redux';
import{composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import Reducer from '../Reducers/index'

export const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)) )

/*
console.log(store.getState())


{reducerDavid: 'hola mundo', reducerPablo: Array(0)}

*/ 