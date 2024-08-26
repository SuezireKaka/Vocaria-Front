import { useParams } from "react-router";
import { Fetch } from "../shared/hooks/Fetch";
import VocaDetails from "../entities/voca/VocaDetails";

export default function VocaDetailsPage() {
    const param = useParams();
    const vocaId = param.vocaId;

    const buildUri = () => {
        return `/voca/anonymous/getVocaById/${vocaId}`;
    }

    const renderSuccess = (response) => {
        console.log("뭐왔니?", response)

        return <VocaDetails
            data={response}
        />
    }

    return <Fetch
        uri={buildUri()}
        renderSuccess={renderSuccess}
        renderError={(e) => <p>{JSON.stringify(e)}</p>}
    />
}
