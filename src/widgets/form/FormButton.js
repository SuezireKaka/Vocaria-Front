import { Button } from "react-bootstrap"
import { useContext } from "react";
import AppContext from "../../contexts/AppContextProvider";

export default function FormButton({message = "", status = {}, validaty = {}, isAuth = false,
    request = f => f, navigate = f => f
}) {
    const {auth, setAuth} = useContext(AppContext);

    return <Button
        variant="outline-primary"
        onClick={(e) => {if (isAuth) {
            request(e, {...status}, auth, navigate, () => {});
        }
        else {
            request(e, {...status}, navigate, setAuth);
        }
        }}
        disabled={! Object.values(validaty).reduce((f, s) => f && s, true)}
    >
        {message}
    </Button>
}