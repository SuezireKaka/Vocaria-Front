import { Button } from "react-bootstrap"
import { useContext } from "react";
import AppContext from "../../contexts/AppContextProvider";

export default function FormButton({message = "", status = {}, validaty = {},
    request = f => f, navigate = f => f
}) {
    const {setAuth} = useContext(AppContext);

    return <Button
        variant="outline-primary"
        onClick={(e) => request(e, {...status}, navigate, setAuth)}
        disabled={! Object.values(validaty).reduce((f, s) => f && s, true)}
    >
        {message}
    </Button>
}