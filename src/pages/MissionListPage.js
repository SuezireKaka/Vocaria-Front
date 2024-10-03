import { useContext, useState } from "react";
import AppContext from "../contexts/AppContextProvider";
import { useLocation, useNavigate, useParams } from "react-router";
import { AxiosAuth } from "../shared/hooks/Fetch";
import MissionList from "../entities/mission/MissionList";

export default function MissionListPage({page = 1}) {
    const {auth} = useContext(AppContext);

    const location = useLocation();
    const state = location.state;

    const param = useParams();

    const buildMissionListUri = (param) => (page) => {
        console.log(auth.id === param.testerId);

        console.log(auth.id === param.testerId
            ? "ToMe"
            : ("FromMe/" + param.testerId));

        return `/mission/listAllMission${
            auth.id === param.testerId
                ? "ToMe"
                : ("FromMe/" + param.testerId)
        }`
        + `/${param.datestring}/${page}`;
    }

    const renderSuccess = (resp) => {
        const nowData = resp?.data;

        console.log("뭐왔니?", nowData)

        return <MissionList
            initData={nowData}
            state={state}
            buildUrl={buildMissionListUri(param)}
        />
    }

    console.log("어디다가 보내고 있어?", buildMissionListUri(param)(1))

    return <AxiosAuth
        uri={buildMissionListUri(param)(1)}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}
