import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    let user = window.sessionStorage.getItem("nowUser");
    const [auth, setAuth] = useState(user ? JSON.parse(user) : {nick : "", roles : []});
    const [registerForm, setRegisterForm] = useState();

    console.log("여기는 언제 들어와?", registerForm);
    
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