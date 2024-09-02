import { useContext } from "react";
import axios from "../../app/axios/axios";
import AppContext from "../../contexts/AppContextProvider";

export default async function checkUniqueValue(paramName, value, isAnonym, auth, callback = f => f) {
    if (value === "") {
        return false;
    }

    console.log("백엔드에 이미 있는지 물어보자", paramName, value);

    try {
        const response = await axios.get(
            `/party${isAnonym ? "/anonymous" : ""}/check/${paramName}/${value}`,
            isAnonym
            ? ""
            : {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }
        );

        console.log("백엔드야 뭘 줬니", response);

        callback(response?.data);
    }
    catch (err) {
        alert("요청 실패");
    }
};