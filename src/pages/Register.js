import { useState, useEffect, useContext } from "react";
import axios from "../app/axios/axios";
import AppContext from "../contexts/AppContextProvider";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from 'react-bootstrap';
import InputLine from "../widgets/form/InputLine";

export const REGISTER_TAG = "status";

export default function Register() {
    const { registerForm } = useContext(AppContext);

    const [regiStatus, setRegiStatus] = useState({});
    const [isValid, setValid] = useState({});

    const changeProp = (model, propName, propVal, type) => {
        let copy = {...model};
        copy[propName] = propVal;
        if (type === REGISTER_TAG) {
            setRegiStatus(copy);
        }
        else {
            setValid(copy);
        }
    }

    return (
        <fieldset>
            <legend>회원 가입</legend>
            <Form style={{width:"60%", margin:"0"}}>
                {registerForm?.inputPieceList.map((piece, idx) => {
                    if (! regiStatus[piece.title]) {
                        regiStatus[piece.title] = "";
                    }
                    if (isValid[piece.title] === undefined) {
                        isValid[piece.title] = false;
                    }

                    return <InputLine
                        key={idx} piece={piece}
                        model={regiStatus}
                        check={isValid}
                        callback={changeProp}
                    />;
                })}
            </Form>

            {console.log("회원가입 상태 좀 볼까", regiStatus, isValid)}
    
            <br/>
            <Button
                variant="outline-primary"
                //onClick={handleSubmit}
                disabled={ !(true)
                }
            >
                Sign Up
            </Button>
            </fieldset>
      );
};