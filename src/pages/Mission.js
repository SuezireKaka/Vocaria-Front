import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContextProvider";
import { useNavigate } from "react-router";
import { AxiosAuth } from "../shared/hooks/Fetch";

export default function Mission() {
    const {auth} = useContext(AppContext);
    const navigate = useNavigate();

    const MISSION_LIST_URI = `/voca/getMission/${auth.id}/2024-08-15`

    const renderSuccess = (response) => {
        let nowData = response?.data ? response.data : response

        console.log("뭐왔니?", nowData)

        return <p>{JSON.stringify(nowData)}</p>
    }
    
    console.log("유저 확인중...", auth);

    useEffect(() => {
        if (! auth.nick) {
            navigate("/login");
        }
    })

    return <AxiosAuth
        uri={MISSION_LIST_URI}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}
