import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router"


export default function usePath(){
    let paths = useSelector(state=>state.reducerPablo.paths)

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const getPath = useCallback(()=>{
        return location.pathname;
    },[]);

    const pushPath = useCallback(()=>{
        console.log([location.pathname,...paths.slice(1)])
        return dispatch({type:'SET_PATH',  payload: [location.pathname,...paths.slice(1)]})
    },[]);

    /* const getPaths = useCallback(()=>{
        return paths;
    },[]) */

    const goBack = useCallback(()=>{
        console.log(paths)
        if(paths[0] !== null){
            history.push(paths[0])
        };
    },[])
    return {
        getPath,
        pushPath,
        goBack,
        paths
    }

}