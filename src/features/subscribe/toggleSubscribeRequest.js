import axios from "../../app/axios/axios";

export default async function toggleSubscribeRequest(e, auth, currrentStatus, setter = f => f) {
    e.preventDefault();

    try {
        const response = await axios.post(
            `/voca/toggleSubscribe/${currrentStatus.vocaId}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }
        );

        console.log(response);

        const data = response.data;

        console.log(data);

        if (data > 0) {
            setter(!currrentStatus.isSubscribe);
        }
        else {
            alert("");
        };
    }
    catch (err) {
        alert("요청 실패");
    }
}