import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AppContext from "../../contexts/AppContextProvider";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Pagination, Table } from "react-bootstrap";
import { displayPagination } from "../../shared/util/Pagination";

export default function MissionList({
    data = {firstVal : [], secondVal : {}}, state,
    setDataUri = f => f, buildUrl = f => f,
}) {
    const {auth} = useContext(AppContext);

    const missionList = data.firstVal;

    const page = data.secondVal;

    const TABLE_STYLE = {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

    const TITLE_STYLE = {
        backgroundColor: "#81a327",
        color: "#ffffcc"
    }

    console.log("데이터 한 번 보자", data, missionList, page)

    return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
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
            <tr style={{ ...TABLE_STYLE, textAlign: "center", }}>
                <th>기원</th>
                <th>봤는지</th>
                <th>완벽한지</th>
            </tr>
        </thead>
        <tbody>
            {missionList && missionList.length > 0
            ? missionList.map((data, i) => <tr 
                key={i}
                style={{ ...TABLE_STYLE, textAlign: "center" }}
            >
                <td>{data.maker.nick}</td>
                <td>{data.isViewed ? <FaCheck color="#33aa33"/> : <FaX color="#aa3333"/>}</td>
                <td>{data.isComplete ? <FaCheck color="#33aa33"/> : <FaX color="#aa3333"/>}</td>
            </tr>)
            : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <td colSpan={4}>{"(해당 날짜에 만들어진 미션이 존재하지 않습니다.)"}</td>
            </tr>
            }
        </tbody>
    </Table>
}