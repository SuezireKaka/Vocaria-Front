import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AppContext from "../../contexts/AppContextProvider";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Button, Pagination, Table } from "react-bootstrap";
import { displayPagination } from "../../shared/util/Pagination";
import { missionDetailsRequest } from "../../features/mission/missionDetailsRequest";

export default function MissionList({
    initData = {firstVal : [], secondVal : {}}, state,
    setDataUri = f => f, buildUrl = f => f,
}) {
    const [data, setData] = useState({...initData,
        firstVal: initData.firstVal.map(d => {d.hajime = true; d.open = false; return d;})});

    const {auth} = useContext(AppContext);

    const missionList = data.firstVal;

    const page = data.secondVal;

    const patchURI = (data) => `/mission/getMissionOfStudentById/${auth?.userId}/${data.id}`;

    const patcher = (idx, resp) => {
        console.log(idx, resp);
        let patchedList = [...(data.firstVal)];
        patchedList[idx] = {...(resp.data), hajime: false, open: true};
        setData({...data, firstVal: patchedList});
    }

    const onView = (e, data, idx) => {
        if (data.isViewed) {
            if (data.hajime) {
                missionDetailsRequest(e, data, idx, auth, patchURI, patcher);
            }
            else {
                toggleOpen(data, idx);
            }
        }   
    }

    const toggleOpen = (newData, idx) => {
        let patchedList = [...(data.firstVal)];
        patchedList[idx] = {...newData, open: !(newData.open)};
        setData({...data, firstVal: patchedList});
    }

    
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


    const buildOtherDateUri = (e) => {
        return param.testerId
            ? `/mission/${e.target.value}/${param.testerId}`
            : `/mission/${e.target.value}`
    }

    console.log("지금 상태 보여 줘", state);

    const navigate = useNavigate();

    const param = useParams();


    console.log("데이터 한 번 보자", data, missionList, page)

    return <>
        <input type={"date"}
            value={param.datestring}
            onChange={e => {
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
                    {data.open
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