import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AppContext from "../../contexts/AppContextProvider";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Button, Pagination, Table } from "react-bootstrap";
import { displayPagination } from "../../shared/util/Pagination";
import { missionDetailsRequest } from "../../features/mission/missionDetailsRequest";

export default function MissionList({
    totalStatus = {
        data : {firstVal : [], secondVal : {}},
        open : [],
        hajime : []
    },
    auth, state, param,
    setDataUri = f => f,
    buildUrl = f => f, navigate = f => f,
    buildOtherDateUri = f => f,
    setNowStatus = f => f
}) {
    const [date, setDate] = useState(param.datestring);

    const data = totalStatus.data;
    const open = totalStatus.open;
    const hajime = totalStatus.hajime;

    const patchData = (newData, newOpen, newHajime) => {
        setNowStatus({
            data: {...newData},
            open: [...newOpen],
            hajime: [...newHajime]
        })
    }
    
    const onView = (e, data, idx) => {
        if (data.isViewed) {
            if (hajime[idx]) {
                console.log("처음이구나?");
                missionDetailsRequest(e, data, idx, auth, patchURI, patcher);
            }
            else {
                console.log("처음이 아니구나?");
                toggleOpen(idx);
            }
        }   
    };

    const toggleOpen = (idx) => {
        let newOpen = open.map((o, i) => i === idx ? !o : o);
        setNowStatus({...totalStatus, open: [...newOpen]});
    }

    const patchURI = (data) => `/mission/getMissionOfStudentById/${auth?.userId}/${data.id}`;

    const patcher = (idx, resp) => {
        console.log("패치가 잘 되고 있는지", idx, resp);
        let patchedList = [...(data.firstVal)];
        patchedList[idx] = {...(resp.data)};
        patchData({...data, firstVal: patchedList},
            open.map((o, i) => i === idx ? !o : o),
            hajime.map((h, i) => i === idx ? false : h)
        );
    };

    const TABLE_STYLE = {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

    const TITLE_STYLE = {
        backgroundColor: "#81a327",
        color: "#ffffcc"
    }

    const DETAILS_STYLE = {
        ...TABLE_STYLE,
        textAlign: "center",
        backgroundColor: "#aa0000 !important"
    }

    const missionList = data.firstVal;

    const page = data.secondVal;

    console.log("지금 상태 보여 줘", totalStatus);

    console.log("데이터 한 번 보자", data, missionList, page);

    return <>
        <input type={"date"}
            value={date}
            onChange={e => {
                console.log("ssss", e.target.value);
                setDate(e.target.value);
            }}
            onBlur={e => {
                console.log("aaaa", e.target.value);
                navigate(buildOtherDateUri(e));
            }}
        />
        <Table className='react-bootstrap-table' style={{ width: "100%" }}>
            <thead>
                <tr><th colSpan={3} style={{ ...TABLE_STYLE, textAlign: "left", ...TITLE_STYLE }}>
                    그룹 목록
                </th></tr>
                {page?.lastPage >= 2
                ? <tr><td colSpan={3} style={{ ...TABLE_STYLE }}>
                    <div style={{ display: "inline-block" }}>
                        <Pagination>
                            {displayPagination(page, state, setDataUri, buildUrl)}<br />
                        </Pagination>
                    </div>
                </td></tr>
                : <></>}
                <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                    <th>기원</th>
                    <th>봤는지</th>
                    <th>완벽한지</th>
                </tr>
            </thead>
            <tbody>
                {missionList && missionList.length > 0
                ? missionList.map((data, i) => <>
                    <tr key={i}
                        style={{ ...TABLE_STYLE, textAlign: "center" }}
                        onClick={(e) => onView(e, data, i)}
                    >
                        <td>{data.maker.nick}</td>
                        <td>{data.isViewed ? <FaCheck color="#33aa33"/> : <FaX color="#aa3333"/>}</td>
                        <td>{data.isComplete ? <FaCheck color="#33aa33"/> : <FaX color="#aa3333"/>}</td>
                    </tr>
                    {open[i]
                    ? <>
                        {data.scorePieceList
                        .filter(quest => quest)
                        .map((quest, itt) => <tr key={quest.id + itt}
                            style={DETAILS_STYLE}
                            onClick={(e) => onView(e, data, i)}
                        >
                            <td colSpan={2}>{quest.question.question}</td>
                            <td>{quest.answer ? <FaCheck color="#33aa33"/> : <FaX color="#aa3333"/>}</td>
                        </tr>)}
                        <tr><td colSpan={3} style={DETAILS_STYLE}>
                            <Button variant="warning"
                                onClick={() => navigate(data.id + "/test")}
                            >
                                재시험
                            </Button>
                        </td></tr>
                    </>
                    : ""
                    }
                    {! data.isViewed
                    ? <tr><td colSpan={3} style={DETAILS_STYLE}>
                        <Button variant="warning"
                            onClick={() => navigate(data.id + "/test")}
                        >
                            시험
                        </Button>
                    </td></tr>
                    : ""
                    }
                </>)
                : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                    <td colSpan={4}>{"(해당 날짜에 만들어진 미션이 존재하지 않습니다.)"}</td>
                </tr>
                }
            </tbody>
        </Table>
    </>
}