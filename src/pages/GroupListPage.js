import { useLocation, useParams } from "react-router";
import { AxiosAuth, Fetch } from "../shared/hooks/Fetch";
import VocaDetails from "../entities/voca/VocaDetails";
import GroupDetails from "../entities/account/GroupDetails";
import GroupList from "../entities/account/GroupList";

export default function GroupListPage({page = 1}) {
    const location = useLocation();
    const state = location.state;

    console.log("지금 상태 보여 줘", state);

    const buildGroupListUri = (page) => {
        return `/party/listAllGroup/${page}`;
    }

    const renderSuccess = (groupResp) => {
        const nowData = groupResp?.data;

        console.log("뭐왔니?", nowData)

        return <GroupList
            data={nowData}
            state={state}
            buildUrl={buildGroupListUri}
        />
    }

    return <AxiosAuth
        uri={buildGroupListUri(page)}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}
