import React, { useState } from "react";

const Context = React.createContext({});

export function UserContextProvider ({children}){
    const [jwt, setJWT] = useState(null);
    const [counter, setCounter] = useState(0);


    return <Context.Provider value={{counter, setCounter}}>
        {children}
        </Context.Provider>
}

export default Context;