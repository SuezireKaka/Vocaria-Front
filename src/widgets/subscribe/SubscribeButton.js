import { useContext, useState } from "react"
import { Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import AppContext from "../../contexts/AppContextProvider";

export default function SubscribeButton({status = false, vocaId,
    request = f => f
}) {
    const {auth} = useContext(AppContext);

    const [isSubscribe, setSubscribe] = useState(status);

    return <Button
        variant="info"
        onClick={(e) => request(e, auth, {isSubscribe, vocaId}, setSubscribe)}
    >
        구독 {isSubscribe
        ? <FaStar color="#ffff00"/>
        : <FaStar color="#777777"/>}
    </Button>
}