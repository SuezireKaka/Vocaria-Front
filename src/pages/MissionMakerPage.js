import { useContext } from "react";
import AppContext from "../contexts/AppContextProvider";
import { useNavigate } from "react-router";

export default function MissionMaker() {
    const { auth } = useContext(AppContext);

    const [groupStatus, setGroupStatus] = useState({id: "----", name: "", groupName: "",
        providingRoleList: []
    });
    const [validaty, setValidaty] = useState({});

    const navigate = useNavigate();

    console.log(groupForm);

    return (
        <fieldset style={DEFAULT_STYLE}>
            <legend>그룹 생성</legend>
            <Form>
                {groupForm?.inputPieceList
                    .map((piece, idx) => {
                    return inputSetup(piece, idx, groupStatus, validaty, setGroupStatus, setValidaty)
                })}
                {/*롤 메이커는 나중에*/}
            </Form>

            {console.log("그룹 상태 좀 볼까", groupStatus)}
    
            <br/>
            <FormButton
                message="Commit"
                status={{...groupStatus, name: groupStatus.groupName}}
                validaty={{...validaty}}
                isAuth={true}
                request={groupRequest}
                navigate={navigate}
            />
        </fieldset>
    );
}
