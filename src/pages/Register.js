import { useState, useEffect, useContext } from "react";
import axios from "../app/axios/axios";
import AppContext from "../contexts/AppContextProvider";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from 'react-bootstrap';

export default function Register() {
    const { registerForm } = useContext(AppContext);

    return (
        <fieldset>
            <legend>회원 가입</legend>
            <Form style={{width:"60%", margin:"0"}}>
                <InputGroup className="mb-3" style={{
                    display: "inline-block",
                    align: "center", width: "60%", backgroundColor: ""
                }}/>

                {registerForm?.inputPieceList.map((piece, idx) => {
                    return <Button key = {idx}>{piece.title}</Button>
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