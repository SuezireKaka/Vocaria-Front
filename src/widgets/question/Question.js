import { Table } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

export default function Question({id, question,
    choiceList = [], selectNum = 0, 
    onChoose = f => f
}) {
    return <Table>
        <thead><tr><th style={{textAlign: "center"}}>{question}</th></tr></thead>
        <tbody>
            {choiceList.map((ch, i) => <tr key={i}
                onClick={(e) => {
                    e.preventDefault();
                    onChoose(ch, i)
                }}
            >
                <td><p>
                    {(i + 1) + ". " + ch}
                <br/>
                    {selectNum - 1 === i ? <FaCheck color="#777777"/> : ""}
                </p></td>
            </tr>)}
        </tbody>
    </Table>
}