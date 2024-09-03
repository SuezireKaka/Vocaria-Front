import { Button, Pagination, Table } from "react-bootstrap";
import { displayPagination } from "../../shared/util/Pagination";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function GroupList({
    data = {firstVal : [], secondVal : {}}, state,
    setDataUri = f => f, buildUrl = f => f,
}) {
    const navigate = useNavigate();

    const [groupList, setGroupList] = useState(data?.firstVal);
    const [page, setPage] = useState(data?.secondVal);

    const TABLE_STYLE = {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

    const TITLE_STYLE = {
        backgroundColor: "#be4545",
        color: "#ffffcc"
    }

    console.log("데이터 한 번 보자", data, groupList, page)

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
                <th>이름</th>
                <th>시작일</th>
                <th>가입</th>
            </tr>
        </thead>
        <tbody>
            {groupList && groupList.length > 0
            ? groupList.map((data, i) => <tr 
                key={i}
                style={{ ...TABLE_STYLE, textAlign: "left" }}
                onClick={() => navigate(`/group/${data.group.id}`)}
            >
                <td>{data.group.name}</td>
                <td>{data.group.birthDate}</td>
                <td>
                    <Button variant={(data.joined ? "danger" : "success")}
                        onClick={(e) => {
                            e.stopPropagation();
                            alert("테스트");
                        }}
                    >
                        {(data.joined ? "탈퇴" : "가입") + "하기"}
                    </Button>
                </td>
            </tr>)
            : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <td colSpan={4}>{"(이 위치에는 선택 가능한 문제집이 존재하지 않습니다.)"}</td>
            </tr>
            }
        </tbody>
    </Table>
}