import axios from "../../app/axios/axios";

export default async function loginRequest(e, loginStatus, navigate = f => f) {
    e.preventDefault();

    console.log("보내기 전에 확인 좀 할게요", loginStatus)

    try {
        const response = await axios.post(
            `/party/anonymous/signin`,
            loginStatus
        );

        console.log("성공 했니?", response);

        navigate("/")
    }
    catch (err) {
        alert("요청 실패");
    }
}