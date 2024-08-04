import { useState, useEffect, useContext } from "react";
import axios from "../app/axios/axios";
import AppContext from "../contexts/AppContextProvider";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from 'react-bootstrap';
import InputLine from "../widgets/form/InputLine";

export default function Register() {
    const { registerForm } = useContext(AppContext);

    return (
        <fieldset>
            <legend>회원 가입</legend>
            <Form style={{width:"60%", margin:"0"}}>
                {registerForm?.inputPieceList.map((piece, idx) => {
                    return <InputLine key = {idx} piece = {piece}/>;
                })}
            </Form>
    
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