import axios from "../../app/axios/axios";

export default async function loginRequest(e, loginStatus, navigate = f => f, setter = f => f) {
    e.preventDefault();

    console.log("보내기 전에 확인 좀 할게요", loginStatus)

    try {
        const response = await axios.post(
            `/party/anonymous/signin`,
            loginStatus
        );

        console.log(response)

        const data = response.data;

        console.log(data)

        if (data.code === 0) {
            const accessToken = data.token;
            const userId = data.userId;
            const roles = data.roles;
            const nick = data.userNick;
            const loginId = data.userLoginId;
            const accountType = data.accountType;
            const loginCode = data?.loginResultCode;
            setter({ roles, nick, accessToken, loginId, userId, accountType, loginCode });
            window.sessionStorage.setItem("nowUser", JSON.stringify({ nick, roles, accessToken, loginId, userId, accountType, loginCode }));
            navigate("/")
        }
        else {
            alert("아이디 또는 패스워드가 바르지 않습니다!");
        };
    }
    catch (err) {
        alert("요청 실패");
    }
}