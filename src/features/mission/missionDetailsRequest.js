import axios from "../../app/axios/axios";

export function missionDetailsRequest(e, data, idx, auth, patchURI = f => f, patcher = f => f) {
    e.preventDefault();

    if (data.isViewed) {
        axios.get(patchURI(data), {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": `Bearer ${auth?.accessToken}`
            }
        })
        .then((resp) => {patcher(idx, resp)})
        .catch((err) => alert(err))
        return;
    }
    else {
        console.log("숙제... 해야겠지?");
    }
}