import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    let user = window.sessionStorage.getItem("nowUser");
    const [auth, setAuth] = useState(user ? JSON.parse(user) : {id : "", nick : "", roles : []});
    const [registerForm, setRegisterForm] = useState();

    console.log("여기는 언제 들어와?", registerForm);
    console.log("유저 확인좀 하자", auth)
    
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