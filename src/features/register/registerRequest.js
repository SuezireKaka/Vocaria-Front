import axios from "../../app/axios/axios";

export default async function registerRequest(e, regiStatus, navigate = f => f) {
    e.preventDefault();

    console.log("보내기 전에 확인 좀 할게요", regiStatus)

    try {
        const response = await axios.post(
            `/party/anonymous/createMember`,
            regiStatus
        );

        console.log("성공 했니?", response);

        navigate("/")
    }
    catch (err) {
        alert("요청 실패");
    }
}