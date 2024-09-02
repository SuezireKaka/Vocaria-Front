import { CHECK_SUFFIX } from "../../widgets/form/InputLine";
import InputLine from "../../widgets/form/InputLine";
import { PASSWORD_TYPE_NAME } from "../../pages/Register";

export default function inputSetup(piece, idx, groupStatus, validaty,
        setRegiStatus = f => f, setValid = f => f)
{
    if (! groupStatus[piece.propName]) {
        groupStatus[piece.propName] = "";
    }

    return <InputLine key={idx}
        propName={piece.propName}
        title={piece.title}
        type={piece.type}
        holder={piece.holder}
        validRegex={piece.validRegex}
        repeatCondition={piece.type === PASSWORD_TYPE_NAME}
        isUnique={piece.unique}
        model={groupStatus}
        valid={validaty}
        setStatus={setRegiStatus}
        setValid={setValid}
    />;
}