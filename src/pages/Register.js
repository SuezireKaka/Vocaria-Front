import { useState, useEffect, useContext } from "react";
import axios from "../app/axios/axios";
import AppContext from "../contexts/AppContextProvider";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from 'react-bootstrap';
import InputLine from "../widgets/form/InputLine";

export const REGISTER_TAG = "status";
export const CHECK_SUFFIX = "Check";
export const PASSWORD_TYPE_NAME = "password";

export const CHECK_HOLDER = "비밀번호를 한 번 더 입력해주세요";

export const INTRO_PROP_NAME = "introduce";

export default function Register() {
    const { registerForm } = useContext(AppContext);

    const [regiStatus, setRegiStatus] = useState({});
    const [isValid, setValid] = useState({});

    return (
        <fieldset>
            <legend>회원 가입</legend>
            <Form style={{width:"60%", margin:"0"}}>
                {registerForm?.inputPieceList.map((piece, idx) => {
                    if (! regiStatus[piece.propName]) {
                        regiStatus[piece.propName] = "";
                    }
                    if (isValid[piece.propName] === undefined) {
                        isValid[piece.propName] = piece.propName === "introduce";
                    }
                    if (piece.type === PASSWORD_TYPE_NAME && ! regiStatus[piece.propName + CHECK_SUFFIX]) {
                        regiStatus[piece.propName + CHECK_SUFFIX] = "";
                        isValid[piece.propName + CHECK_SUFFIX] = false;
                    }

                    return <>
                        <InputLine
                            key={idx} piece={piece}
                            model={regiStatus}
                            check={isValid}
                            setRegiStatus={setRegiStatus}
                            setValid={setValid}
                        />
                    </>;
                })}
            </Form>

            {console.log("회원가입 상태 좀 볼까", regiStatus, isValid)}
    
            <br/>
            <Button
                variant="outline-primary"
                //onClick={handleSubmit}
                disabled={ ! Object.values(isValid).reduce((f, s) => f && s, true)}
            >
                Sign Up
            </Button>
            </fieldset>
      );
};