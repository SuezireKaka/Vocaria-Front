import { useState, useContext } from "react";
import AppContext from "../contexts/AppContextProvider";
import Form from "react-bootstrap/Form";
import { Button } from 'react-bootstrap';
import inputSetup from "../features/register/inputSetup";

export const PASSWORD_TYPE_NAME = "password";

export const CHECK_HOLDER = "비밀번호를 한 번 더 입력해주세요";

export const INTRO_PROP_NAME = "introduce";

export default function Register() {
    const { registerForm } = useContext(AppContext);

    const [regiStatus, setRegiStatus] = useState({});
    const [validaty, setValidaty] = useState({});

    return (
        <fieldset>
            <legend>회원 가입</legend>
            <Form style={{width:"60%", margin:"0"}}>
                {registerForm?.inputPieceList.map((piece, idx) => {
                    return inputSetup(piece, idx, regiStatus, validaty, setRegiStatus, setValidaty)
                })}
            </Form>

            {console.log("회원가입 상태 좀 볼까", regiStatus, validaty)}
    
            <br/>
            <Button
                variant="outline-primary"
                //onClick={handleSubmit}
                disabled={! Object.values(validaty).reduce((f, s) => f && s, true)}
            >
                Sign Up
            </Button>
            </fieldset>
      );
};