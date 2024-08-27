import { AxiosAuth } from "../../shared/hooks/Fetch";
import SubscribeButton from "../../widgets/subscribe/SubscribeButton";
import toggleSubscribeRequest from "../../features/subscribe/toggleSubscribeRequest";

export default function SubscribeManager({vocaId = ""}) {
    const SUBSCRIBE_CHECK_URI = `/voca/isSubscribing/${vocaId}`;
    
    const renderSuccess = (response) => {
        let nowData = response?.data ? response.data : response

        console.log("뭐왔니?", response, nowData)

        return <SubscribeButton
            status={nowData === true ? nowData : nowData.data}
            vocaId={vocaId}
            request={toggleSubscribeRequest}
        />
    }

    return <AxiosAuth
        uri={SUBSCRIBE_CHECK_URI}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}