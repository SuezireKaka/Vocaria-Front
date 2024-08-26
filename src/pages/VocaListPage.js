import { useLocation } from "react-router";
import { Fetch } from "../shared/hooks/Fetch";
import VocaList from "../entities/voca/VocaList";

export default function VocaListPage({page}) {
    const location = useLocation();
    const state = location.state;

    console.log("지금 상태 보여 줘", state);

    const buildUri = () => {
        return `/voca/anonymous/listAllVoca/${page}`;
    }

    const renderSuccess = (response) => {
        let nowData = response?.data ? response.data : response

        console.log("뭐왔니?", response, nowData)

        return <VocaList
            data={nowData}
            state={state}
            buildUrl={buildUri}
        />
    }

    return <Fetch
        uri={buildUri(page)}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}
