import { useState, useEffect, useContext } from "react";
import axios from "../app/axios/axios";
import AppContext from "../contexts/AppContextProvider";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from 'react-bootstrap';
import InputLine from "../widgets/form/InputLine";

export default function Register() {
    const { registerForm } = useContext(AppContext);

    const [regiStatus, setRegiStatus] = useState({});

    const changeProp = (model, propName, propVal) => {
        let copy = {...model};
        copy[propName] = propVal;
        setRegiStatus(copy);
    }

    return (
        <fieldset>
            <legend>회원 가입</legend>
            <Form style={{width:"60%", margin:"0"}}>
                {registerForm?.inputPieceList.map((piece, idx) => {
                    if (! regiStatus[piece.title]) {
                        regiStatus[piece.title] = "";
                    }

                    return <InputLine
                        key = {idx} piece = {piece}
                        model={regiStatus}
                        callback={changeProp}
                    />;
                })}
            </Form>

            {console.log("회원가입 상태 좀 볼까", regiStatus)}
    
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