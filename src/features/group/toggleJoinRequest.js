import axios from "../../app/axios/axios";

export default async function toggleJoinRequest(e, auth, groupId, pastValue, index, setter = f => f) {
    e.preventDefault();

    try {
        const response = await axios.post(
            `/party/toggleJoin/${groupId}`,
            "",
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }
        );

        console.log("성공 했니?", response);
        
        setter([...pastValue].map((data, i) => {
            // 이미 가입된 경우 true ^ true => false, true ^ false => true
            // 가입되지 않은 경우 false ^ true => true, false ^ false => false
            return {...data, joined: data.joined ^ (i === index)}
        }));
    }
    catch (err) {
        alert("요청 실패");
    }
}