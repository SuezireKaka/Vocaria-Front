import { useNavigate, useParams } from "react-router";
import { AxiosAuth, Fetch } from "../shared/hooks/Fetch";
import VocaDetails from "../entities/voca/VocaDetails";

export default function VocaDetailsPage() {
    const param = useParams();
    const vocaId = param.vocaId;

    const navigate = useNavigate();

    const buildUri = () => {
        return `/voca/getVocaById/${vocaId}`;
    }

    const renderSuccess = (response) => {
        console.log("뭐왔니?", response)

        return <VocaDetails
            data={response.data}
        />
    }

    return <AxiosAuth
        uri={buildUri()}
        renderSuccess={renderSuccess}
        renderError={() => {
            alert("접근이 금지되었습니다.");
            navigate("/voca");
        }}
    />
}
