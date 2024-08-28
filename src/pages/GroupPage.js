import { useParams } from "react-router";
import { AxiosAuth, Fetch } from "../shared/hooks/Fetch";
import VocaDetails from "../entities/voca/VocaDetails";
import GroupDetails from "../entities/account/GroupDetails";

export default function GroupPage({page = 1}) {
    const param = useParams();
    const groupId = param.groupId;

    const buildGroupUri = () => {
        return `/party/getGroupById/${groupId}`;
    }

    const buildAccountUri = () => {
        return `/party/listAllAccount/${groupId}/${page}`;
    }

    const renderSuccess = (groupResp) => (accountResp) => {
        const groupData = groupResp?.data;
        const accounData = accountResp?.data;

        console.log("뭐왔니?", groupData, accounData)

        return <GroupDetails
            groupData={groupData}
            accounData={accounData}
        />
    }

    return <AxiosAuth
        uri={buildGroupUri()}
        renderSuccess={(groupRest) => {
            return <AxiosAuth
                uri={buildAccountUri()}
                renderSuccess={(accountResp) => {
                    return renderSuccess(groupRest)(accountResp)
                }}
                renderError={(e) => <p>{JSON.stringify(e)}</p>}
            />
        }}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}
