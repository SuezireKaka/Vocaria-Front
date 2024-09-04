import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContextProvider";
import { Button } from "react-bootstrap";
import axios from "../../app/axios/axios";

async function fetch1(auth, setData = f => f, setError = f => f) {
    await axios.get("/party/tokentest",
    {
        headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth?.accessToken}`
        }
    }
    ).then(setData)
    .catch(e => setError(e.message));
}

async function fetch2(auth, setData = f => f, setError = f => f) {
    await axios.get("/party/speltest/0000",
    {
        headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth?.accessToken}`
        }
    }
    ).then(setData)
    .catch(e => setError(e.message));
}

async function fetch3(auth, setData = f => f, setError = f => f) {
    await axios.get("/mission/testSpel/rwccm3241-samplestudent",
    {
        headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth?.accessToken}`
        }
    }
    ).then(setData)
    .catch(e => setError(e.message));
}

export default function TokenTest() {
    const {auth} = useContext(AppContext);

    console.log("이용자", auth);

    const [data, setData] = useState();
    const [error, setError] = useState("");

    console.log("데이터", data)
    
    

    return <>
        <Button
            onClick={() => fetch1(auth, setData, setError)}
        >
            {data ? data.data : error}
        </Button>
        <br/>
        <Button
            onClick={() => fetch2(auth, setData, setError)}
        >
            {data ? data.data : error}
        </Button>
        <br/>
        <Button
            onClick={() => fetch3(auth, setData, setError)}
        >
            {data ? data.data : error}
        </Button>
    </>;
}