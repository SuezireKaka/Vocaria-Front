import { Pagination, Table } from "react-bootstrap";
import { displayPagination } from "../../shared/util/Pagination";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import RoleManager from "../../layout/role/RoleManager";
import RoleChain from "../../widgets/role/RoleChain";
import { useAuth } from "../../shared/hooks/useFetch";
import axios from "../../app/axios/axios";
import AppContext from "../../contexts/AppContextProvider";

export default function GroupDetails({ groupData,
    accounData = {firstVal : [], secondVal : {}}, state,
    setDataUri = f => f, buildUrl = f => f,
}) {
    const {auth} = useContext(AppContext);

    const navigate = useNavigate();

    const ROLE_SYNC_URI = `/party/syncRole/${groupData.id}`;

    const originalList = accounData?.firstVal;

    const [accountList, setAccountList] = useState([...(accounData?.firstVal)]);
    const [page, setPage] = useState(accounData?.secondVal);

    const [pinnedRole, setPinnedRole] = useState(null);

    const [editedList, setEditedList] = useState([...(accounData?.firstVal.map(
        account => {return {id: {...account}.id, isEdited: false}}))]
    );

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

    const GRANTING_STYLE = {
        backgroundColor: "#ffd6e8",
        color: "#000000"
    }

    const editRole = (i, roles) => {
        if (pinnedRole) {
            let newAccountList = [...processRoles(i, roles)];
            
            let copyEditedList = [...editedList];

            copyEditedList[i].isEdited = ! equalList(newAccountList[i].roleList.map(role => role.id),
                [...originalList][i].roleList.map(role => role.id),
            )

            setEditedList(copyEditedList);
        }
    }

    const equalList = (list1, list2) => {
        console.log("리스트 까봐", list1, list2);

        return list1.reduce((lemma, elem) => lemma && list2.includes(elem), true)
            &&  list2.reduce((lemma, elem) => lemma && list1.includes(elem), true)
    }

    const processRoles = (i, roles) => {
        let pinnedRoleId = pinnedRole.id;

        let copyRoles = [...roles];
        if (copyRoles.map(role => role.id).includes(pinnedRoleId)) {
            copyRoles = copyRoles.filter(role => role.id !== pinnedRoleId);
        }
        else {
            copyRoles.push(pinnedRole);
        }
        
        let newAccountList = [...accountList];
        let newRoleList = [...(newAccountList[i].roleList)];
        newRoleList = copyRoles;

        console.log("원본 내놔! 1", i, originalList[i].roleList);

        newRoleList.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0);

        newAccountList[i] = {...newAccountList[i], roleList: newRoleList};

        console.log("원본 내놔! 2", i, originalList[i].roleList)

        setAccountList(newAccountList);

        return newAccountList;
    }

    const onSubmit = () => {
        let editedData = editedList
            .map((part, i) => {return {...part, roleList: [...accountList[i].roleList]}})
            .filter(part => part.isEdited)
            .map(part => {return {accountId: part.id, roleList: part.roleList}})


        if (editedData.length > 0) {
            axios.post(ROLE_SYNC_URI, editedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "x-auth-token": `Bearer ${auth?.accessToken}`
                    }
                }
            )
            .catch((e) => console.log(e.message))
        } 

        setPinnedRole(null);
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
                <RoleManager roleList={groupData?.providingRoleList}
                    onPinRole={(role) => setPinnedRole(role)}
                    onSubmit={() => onSubmit()}
                />
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
                <td>
                    <RoleChain style={pinnedRole ? GRANTING_STYLE : {}}
                        roles={accountList[i].roleList}
                        onChangeRole={(roles, edited) => editRole(i, roles, edited)}
                    />
                </td>
            </tr>)
            : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <td colSpan={4}>{"(이 그룹에 참여중인 계정이 없을 리 없습니다. 관리자에게 문의하세요.)"}</td>
            </tr>
            }
        </tbody>
    </Table>
}