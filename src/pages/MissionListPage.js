import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import AppContext from "../contexts/AppContextProvider";
import { useLocation, useNavigate, useParams } from "react-router";
import { AxiosAuth } from "../shared/hooks/Fetch";
import MissionList from "../entities/mission/MissionList";
import { useAuth } from "../shared/hooks/useFetch";
import axios from "../app/axios/axios";

export default function MissionListPage({page = 1}) {
    const {auth} = useContext(AppContext);

    const location = useLocation();
    const state = location.state;

    const param = useParams();

    const navigate = useNavigate();

    const [nowStatus, setNowStatus] = useState({
        data : {firstVal : [], secondVal : {}},
        open : [],
        hajime : []
    });

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

    useMemo(() => {
        axios.get(buildMissionListUri(param)(1),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }).then(resp => {
                console.log("잘 들어왔니?", resp);
                datePatch(resp?.data);
            })
    }, [param])
    
    const datePatch = (newData = {firstVal: []}) => {
        console.log("날짜 변경 확인", newData);
        setNowStatus({
            data: {...newData},
            open: newData.firstVal.map(() => false),
            hajime: newData.firstVal.map(() => true)
        });
    }

    console.log("어디다가 보내고 있어?", buildMissionListUri(param)(1))

    console.log("이제 뭐 그리는 거야?", nowStatus)

    return  <MissionList
        totalStatus={{...nowStatus}}
        state={state} auth={auth} param={param}
        setNowStatus={setNowStatus}
        setDataUri={buildMissionListUri(param)}
        buildUrl={buildMissionListUri(param)}
        navigate={navigate}
        buildOtherDateUri={buildOtherDateUri}
    />

    //AxiosAuth로 리렌더링 조절은 할 게 아니다 진짜
    {/**return <AxiosAuth
        uri={buildMissionListUri(param)(1)}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />*/}
}
