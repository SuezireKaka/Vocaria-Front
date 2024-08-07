import axios from "../../app/axios/axios";

export default async function checkUniqueValue(paramName, value, callback = f => f) {
    if (value === "") {
        return false;
    }

    console.log("백엔드에 이미 있는지 물어보자", paramName, value);

    try {
        const response = await axios.get(
            `/party/anonymous/check/${paramName}/${value}`,
        );

        console.log("백엔드야 뭘 줬니", response);

        callback(response?.data);
    }
    catch (err) {
        alert("요청 실패");
    }
};