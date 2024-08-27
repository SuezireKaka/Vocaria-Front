import { useLocation } from "react-router";
import { AxiosAuth } from "../shared/hooks/Fetch";
import VocaList from "../entities/voca/VocaList";

export default function SubscribePage({page}) {
    const location = useLocation();
    const state = location.state;

    console.log("지금 상태 보여 줘", state);

    const buildUri = () => {
        return `/voca/listAllSubscribes/${page}`;
    }

    const renderSuccess = (response) => {
        let nowData = response?.data ? response.data : response

        console.log("뭐왔니?", response, nowData)

        return <VocaList
            isGeneral={false}
            data={nowData}
            state={state}
            buildUrl={buildUri}
        />
    }

    return <AxiosAuth
        uri={buildUri(page)}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}
