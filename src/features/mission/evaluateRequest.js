import axios from "../../app/axios/axios";

export default async function evaluateRequest(e, auth, data = {questionIdList: [], chooseList: []},
    setter = f => f,
    navigate = f => f
) {
    e.preventDefault();

    console.log("이제 이거 보낼 거야", data)

    try {
        const response = await axios.post(
            `/mission/evaluate`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }
        );

        console.log(response);

        setter(response?.data);

        navigate("/mission");
    }
    catch (err) {
        alert("요청 실패");
    }
}