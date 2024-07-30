import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    let user = window.sessionStorage.getItem("nowUser");
    console.log(user ? JSON.parse(user) : "야");
    const [auth, setAuth] = useState(user ? JSON.parse(user) : {nick : "", roles : []});
    const [registerForm, setRegisterForm] = useState();
    
    return (
        <AppContext.Provider value={{
            auth, setAuth,
            registerForm, setRegisterForm
        }}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContext;