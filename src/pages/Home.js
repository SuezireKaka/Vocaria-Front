import { useContext } from "react";
import AppContext from "../contexts/AppContextProvider";

export default function Home() {
    const {auth} = useContext(AppContext);

    return <>
        <h1>Hello, {auth.nick ? auth.nick : "world"}!</h1>
    </>
}
