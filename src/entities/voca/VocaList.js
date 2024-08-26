import { Pagination, Table } from "react-bootstrap";
import { displayPagination } from "../../shared/util/Pagination";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function VocaList({
    data = {firstVal : [], secondVal : {}}, state,
    setDataUri = f => f, buildUrl = f => f,
}) {
    const navigate = useNavigate();

    const [vocaList, setVocaList] = useState(data?.firstVal);
    const [page, setPage] = useState(data?.secondVal);

    const TABLE_STYLE = {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

    const TITLE_STYLE = {
        backgroundColor: "#526290",
        color: "#ffffcc"
    }

    console.log("데이터 한 번 보자", data, vocaList, page)

    return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
        <thead>
            <tr><th colSpan={3} style={{ ...TABLE_STYLE, textAlign: "left", ...TITLE_STYLE }}>문제지 목록</th></tr>
            <tr><td colSpan={3} style={{ ...TABLE_STYLE }}>
                <div style={{ display: "inline-block" }}>
                    <Pagination>
                        {page?.lastPage >= 2
                            ? <>{displayPagination(page, state, setDataUri, buildUrl)}<br /></>
                            : ""}
                    </Pagination>
                </div>
            </td></tr>
            <tr style={{ ...TABLE_STYLE, textAlign: "center", }}>
                <th>이름</th>
                <th>제작자</th>
                <th>수정시간</th>
            </tr>
        </thead>
        <tbody>
            {vocaList && vocaList.length > 0
            ? vocaList.map((data, i) => <tr 
                key={i}
                style={{ ...TABLE_STYLE, textAlign: "left" }}
                onClick={() => console.log(data)}
            >
                <td>{data.name}</td>
                <td>{data.maker.nick}</td>
                <td>{data.uptDt}</td>
            </tr>)
            : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <td colSpan={4}>{"(이 위치에는 선택 가능한 툴이 존재하지 않습니다.)"}</td>
            </tr>
            }
        </tbody>
    </Table>
}