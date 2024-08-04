import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { REGISTER_TAG } from "../../pages/Register";

export default function InputLine({piece, model, check, callback = f => f, onBlur = f => f}) {
    return <>
        <InputGroup className="mb-3" style={{
            display: "inline-block",
            align: "center", width: "60%", backgroundColor: ""
        }}/>
        <InputGroup.Text id="basic-addon2">{piece.title}</InputGroup.Text>
        <Form.Control
            type={piece.type}
            placeholder={piece.holder}
            onChange={(e) => {
                callback(model, piece.title, e.target.value, REGISTER_TAG);
                callback(check, piece.title, new RegExp(piece.validRegex).test(e.target.value), "");
            }}
            value={model[piece.title]}
            required
        />
    </>;
}