import { Pagination, Table } from "react-bootstrap";
import { displayPagination } from "../../shared/util/Pagination";
import { useNavigate } from "react-router";
import { useState } from "react";
import RoleButton from "../../widgets/role/RoleButton";
import RoleManager from "../../layout/role/RoleManager";

export default function GroupDetails({ groupData,
    accounData = {firstVal : [], secondVal : {}}, state,
    setDataUri = f => f, buildUrl = f => f,
}) {
    const navigate = useNavigate();

    const [accountList, setAccountList] = useState(accounData?.firstVal);
    const [page, setPage] = useState(accounData?.secondVal);

    const TABLE_STYLE = {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

    const TITLE_STYLE = {
        backgroundColor: "#543456",
        color: "#ffffcc"
    }

    const SUBTITLE_STYLE = {
        backgroundColor: "#bbbbbb",
        color: "#000000"
    }

    return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
        <thead>
            <tr><th colSpan={3} style={{ ...TABLE_STYLE, textAlign: "left", ...TITLE_STYLE }}>
                {groupData?.name + " 데이터"}
            </th></tr>
            <tr><th colSpan={3} style={{ ...TABLE_STYLE, textAlign: "left", ...SUBTITLE_STYLE }}>
                역할 목록
            </th></tr>
            <tr><th colSpan={3} style={{ ...TABLE_STYLE }}>
                <RoleManager roleList={groupData?.providingRoleList}/>
            </th></tr>
            <tr><th colSpan={3} style={{ ...TABLE_STYLE, textAlign: "left", ...SUBTITLE_STYLE }}>
                계정 목록
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
                <th>닉네임</th>
                <th>역할</th>
            </tr>
        </thead>
        <tbody>
            {accountList && accountList.length > 0
            ? accountList.map((data, i) => <tr 
                key={i}
                style={{ ...TABLE_STYLE, textAlign: "left" }}
            >
                <td>{data.owner.name}</td>
                <td>{data.nick}</td>
                <td>{"역할 준비중"}</td>
            </tr>)
            : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <td colSpan={4}>{"(이 그룹에 참여중인 계정이 없을 리 없습니다. 관리자에게 문의하세요.)"}</td>
            </tr>
            }
        </tbody>
    </Table>
}