import axios from "../../app/axios/axios";

export default async function groupRequest(e, groupStatus, auth, navigate = f => f) {
    e.preventDefault();

    console.log("보내기 전에 확인 좀 할게요", groupStatus)

    try {
        const response = await axios.post(
            `/party/anonymous/createGroup`,
            groupStatus,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }
        );

        console.log("성공 했니?", response);

        navigate("/")
    }
    catch (err) {
        alert("요청 실패");
    }
}