import { useState, useContext } from "react";
import AppContext from "../contexts/AppContextProvider";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import loginRequest from "../features/login/loginRequest";
import FormButton from "../widgets/form/FormButton";
import DEFAULT_STYLE from "../shared/design/DefaultStyle";
import inputSetup from "../features/group/inputSetup";

export const LOGIN_PROP_ARRAY = ["loginId", "rawPassword"]

export default function GroupMaker() {
    const { groupForm, actList } = useContext(AppContext);

    const [groupStatus, setGroupStatus] = useState({id: "----", name: "",
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
                status={{...groupStatus}}
                validaty={{...validaty}}
                request={loginRequest}
                navigate={navigate}
            />
        </fieldset>
    );
}
