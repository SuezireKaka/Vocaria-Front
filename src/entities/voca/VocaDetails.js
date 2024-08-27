import { useContext } from "react";
import { Table } from "react-bootstrap";
import AppContext from "../../contexts/AppContextProvider";

export default function VocaDetails({data}) {
    const {auth} = useContext(AppContext);

    const TABLE_STYLE = {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

    const TITLE_STYLE = {
        backgroundColor: "#ea95bf",
        color: "#5e225e"
    }

    return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
        <thead>
            <tr><th colSpan={2} style={{...TABLE_STYLE, textAlign: "center", ...TITLE_STYLE}}>{data.name}</th></tr>
        </thead>
        <tbody>
            {auth.nick
                ? <tr><td colSpan={2} style={{...TABLE_STYLE, textAlign: "center"}}>
                    여기다가 구독 버튼 넣기
                </td></tr>
                : null}
            <tr>
                <td rowSpan={2}>이미지 가능?</td>
                <td>{data.maker.nick}</td>
            </tr>
            <tr><td>{data.introduce}</td></tr>
            {data.chapterList.map((chapter, i) => <p>{(i+1) + ": " + chapter.name}</p>)}
        </tbody>
    </Table>
}