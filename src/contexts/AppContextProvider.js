import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    let user = window.sessionStorage.getItem("nowUser");
    const [auth, setAuth] = useState(user ? JSON.parse(user) : {id : "", nick : "", roles : []});
    const [registerForm, setRegisterForm] = useState();
    const [groupForm, setGroupForm] = useState();
    const [actList, setActList] = useState();

    console.log("유저 확인좀 하자", auth)
    
    return (
        <AppContext.Provider value={{
            auth, setAuth,
            registerForm, setRegisterForm,
            groupForm, setGroupForm,
            actList, setActList
        }}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContext;