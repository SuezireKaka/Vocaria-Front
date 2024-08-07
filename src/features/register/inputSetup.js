import { CHECK_SUFFIX } from "../../widgets/form/InputLine";
import InputLine from "../../widgets/form/InputLine";
import { PASSWORD_TYPE_NAME } from "../../pages/Register";
import checkUniqueValue from "./checkUniqueValue";

export default function inputSetup(piece, idx, regiStatus, validaty,
        setRegiStatus = f => f, setValid = f => f)
{
    if (! regiStatus[piece.propName]) {
        regiStatus[piece.propName] = "";
    }
    if (validaty[piece.propName] === undefined) {
        validaty[piece.propName] = piece.propName === "introduce";
    }
    if (piece.type === PASSWORD_TYPE_NAME && ! regiStatus[piece.propName + CHECK_SUFFIX]) {
        regiStatus[piece.propName + CHECK_SUFFIX] = "";
        validaty[piece.propName + CHECK_SUFFIX] = false;
    }

    return <InputLine key={idx}
        propName={piece.propName}
        title={piece.title}
        type={piece.type}
        holder={piece.holder}
        validRegex={piece.validRegex}
        repeatCondition={piece.type === PASSWORD_TYPE_NAME}
        isUnique={piece.unique}
        model={regiStatus}
        valid={validaty}
        setStatus={setRegiStatus}
        setValid={setValid}
    />;
}