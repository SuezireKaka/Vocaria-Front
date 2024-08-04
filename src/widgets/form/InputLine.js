import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export default function InputLine({piece, model, callback = f => f, onBlur = f => f}) {
    return <>
        <InputGroup className="mb-3" style={{
            display: "inline-block",
            align: "center", width: "60%", backgroundColor: ""
        }}/>
        <InputGroup.Text id="basic-addon2">{piece.title}</InputGroup.Text>
        <Form.Control
            type={piece.type}
            placeholder={piece.holder}
            onChange={(e) => callback(model, piece.title, e.target.value)}
            value={model[piece.title]}
            required
        />
    </>;
}