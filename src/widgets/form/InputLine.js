import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { REGISTER_TAG, CHECK_SUFFIX, PASSWORD_TYPE_NAME, CHECK_HOLDER } from "../../pages/Register";
import propChange from "../../shared/util/propChange";

export default function InputLine({piece,
    model, check,
    setRegiStatus = f => f,
    setValid = f => f,
    onBlur = f => f
}) {
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
                propChange(model, piece.propName, e.target.value, setRegiStatus);
                
                propChange(check, piece.propName,
                    new RegExp(piece.validRegex).test(e.target.value),
                    setValid);
            }}
            value={model[piece.propName]}
            required
        />
        {piece.type === PASSWORD_TYPE_NAME
            ? <Form.Control
                type={piece.type}
                placeholder={CHECK_HOLDER}
                onChange={(e) => {
                    propChange(model, piece.propName + CHECK_SUFFIX, e.target.value, setRegiStatus);
                    
                    propChange(check, piece.propName + CHECK_SUFFIX,
                        e.target.value === model[piece.propName],
                        setValid);
                }}
                value={model[piece.propName + CHECK_SUFFIX]}
                required
            />
            : ""}
    </>;
}