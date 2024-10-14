import { useLocation, useParams } from "react-router";
import { AxiosAuth, Fetch } from "../shared/hooks/Fetch";
import ListViewer from "../shared/util/ListViewer";
import QuestionManager from "../layout/question/QuestionManager";

export default function TestMissionPage() {
    const param = useParams();
    
    console.log("어디보자아", param)

    const buildGroupListUri = (param) => {
        return `/mission/listAllQuestionIn/${param.missionId}`;
    }

    const renderSuccess = (resp) => {
        const nowData = resp?.data;

        console.log("뭐왔니?", nowData)

        return <QuestionManager data={{...nowData, }}/>
    }

    return <AxiosAuth
        uri={buildGroupListUri(param)}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}
