import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { CHECK_HOLDER } from "../../pages/Register";
import propChange from "../../shared/util/propChange";
import calcColorWithValidaty from "../../shared/util/calcColorWithValidaty";
import checkUniqueValue from "../../features/register/checkUniqueValue";

export const CHECK_SUFFIX = "Check";

export default function InputLine({propName, title,
    type, holder,
    validRegex,
    repeatCondition,
    isUnique,
    model, valid,
    setStatus = f => f,
    setValid = f => f
}) {
    return <>
        <InputGroup className="mb-3" style={{
            display: "inline-block",
            align: "center", width: "60%",
        }}/>
        <InputGroup.Text id="basic-addon2" style={{
            backgroundColor: calcColorWithValidaty(
                valid[propName] && (
                    !repeatCondition || (
                    repeatCondition
                        && valid[propName + CHECK_SUFFIX])))
        }}>
            {title}
        </InputGroup.Text>
        <Form.Control
            as={type === "textarea" ? type : "input"}
            type={type === "textarea" ? "text" : type}
            placeholder={holder}
            onChange={(e) => {
                propChange(model, propName, e.target.value, setStatus);
                
                propChange(valid, propName,
                    new RegExp(validRegex).test(e.target.value),
                    setValid);
            }}
            value={model[propName]}
            onBlur={(e) => {
                console.log("지금 뗐다")
                if (isUnique) {
                    checkUniqueValue(propName, e.target.value,
                        (unique) => propChange(valid, propName, unique, setValid)
                    )
                }
            }}
            required
        />
        {repeatCondition
            ? <Form.Control
                type={type}
                placeholder={CHECK_HOLDER}
                onChange={(e) => {
                    propChange(model, propName + CHECK_SUFFIX, e.target.value, setStatus);
                    
                    propChange(valid, propName + CHECK_SUFFIX,
                        e.target.value === model[propName],
                        setValid);
                }}
                value={model[propName + CHECK_SUFFIX]}
                onBlur={(e) => {
                    if (isUnique) {
                        checkUniqueValue(propName, e.target.value,
                            (unique) => propChange(valid, propName, unique, setValid)
                        )
                    }
                }}
                required
            />
            : ""}
    </>;
}