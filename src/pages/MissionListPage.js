import { useContext, useEffect, useMemo } from "react";
import AppContext from "../contexts/AppContextProvider";
import { useLocation, useNavigate, useParams } from "react-router";
import { AxiosAuth } from "../shared/hooks/Fetch";
import MissionList from "../entities/mission/MissionList";

export default function MissionListPage({page = 1}) {
    const location = useLocation();
    const state = location.state;

    console.log("지금 상태 보여 줘", state);

    const {auth} = useContext(AppContext);

    const navigate = useNavigate();

    const param = useParams();

    console.log("어디보자아", param);

    const buildMissionListUri = (param) => (page) => {
        let accountId = param.testerId
            ? param.testerId
            : auth.userId
        console.log("패러미터 까 봐", param.testerId, accountId)
        return `/mission/getMission/${accountId}/${param.datestring}/${page}`;
    }

    const buildOtherDateUri = (e) => {
        return param.testerId
            ? `/mission/${e.target.value}/${param.testerId}`
            : `/mission/${e.target.value}`
    }

    const renderSuccess = (resp) => {
        const nowData = resp?.data;

        console.log("뭐왔니?", nowData)

        return <MissionList
            data={nowData}
            state={state}
            buildUrl={buildMissionListUri(param)}
        />
    }

    return <>
        <input type={"date"}
            value={param.datestring}
            onChange={e => {
                navigate(buildOtherDateUri(e));
                window.location.reload();
            }}
        />
        <AxiosAuth
            uri={buildMissionListUri(param)(1)}
            renderSuccess={renderSuccess}
            renderError={(e) => <p>{JSON.stringify(e)}</p>}
        />
    </>
}
