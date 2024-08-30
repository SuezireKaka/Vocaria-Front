import { useState, useContext } from "react";
import AppContext from "../contexts/AppContextProvider";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import inputSetup from '../features/login/inputSetup';
import loginRequest from "../features/login/loginRequest";
import FormButton from "../widgets/form/FormButton";
import DEFAULT_STYLE from "../shared/design/DefaultStyle";

export const LOGIN_PROP_ARRAY = ["loginId", "rawPassword"]

export default function Login() {
    const { registerForm } = useContext(AppContext);

    const [loginStatus, setLoginStatus] = useState({});
    const [validaty, setValidaty] = useState({});

    const navigate = useNavigate();

    return (
        <fieldset style={DEFAULT_STYLE}>
            <legend>로그인</legend>
            <Form>
                {registerForm?.inputPieceList
                    .filter(piece => LOGIN_PROP_ARRAY.includes(piece.propName))
                    .map((piece, idx) => {
                    return inputSetup(piece, idx, loginStatus, validaty, setLoginStatus, setValidaty)
                })}
            </Form>

            {console.log("로그인 상태 좀 볼까", loginStatus)}
    
            <br/>
            <FormButton
                message="Login"
                status={{...loginStatus}}
                validaty={{...validaty}}
                request={loginRequest}
                navigate={navigate}
            />
        </fieldset>
    );
}
