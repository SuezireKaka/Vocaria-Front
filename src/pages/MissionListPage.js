import { useContext, useState } from "react";
import AppContext from "../contexts/AppContextProvider";
import { useLocation, useNavigate, useParams } from "react-router";
import { AxiosAuth } from "../shared/hooks/Fetch";
import MissionList from "../entities/mission/MissionList";

export default function MissionListPage({page = 1}) {
    const location = useLocation();
    const state = location.state;

    console.log("지금 상태 보여 줘", state);

    const {auth} = useContext(AppContext);
    const [data, setData] = useState({firstVal : [], secondVal : {}});

    const navigate = useNavigate();

    const param = useParams();

    console.log("어디보자아", param);

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

    const buildOtherDateUri = (e) => {
        return param.testerId
            ? `/mission/${e.target.value}/${param.testerId}`
            : `/mission/${e.target.value}`
    }

    const renderSuccess = (resp) => {
        const nowData = resp?.data;

        console.log("뭐왔니?", nowData)

        setData(nowData)

        return <MissionList
            data={data}
            state={state}
            buildUrl={buildMissionListUri(param)}
        />
    }

    console.log("어디다가 보내고 있어?", buildMissionListUri(param)(1))

    return <>
        <input type={"date"}
            value={param.datestring}
            onChange={e => {
                navigate(buildOtherDateUri(e));
            }}
        />
        <AxiosAuth
            uri={buildMissionListUri(param)(1)}
            renderSuccess={renderSuccess}
            renderError={(e) => <p>{JSON.stringify(e)}</p>}
        />
    </>
}
