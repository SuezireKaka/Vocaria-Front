import InputLine from "../../widgets/form/InputLine";

export const LOGIN_HOLDER_SUFFIX = "를 입력해주세요";

export default function inputSetup(piece, idx, loginStatus, validaty,
        setLoginStatus = f => f, setValid = f => f)
{
    if (! loginStatus[piece.propName]) {
        loginStatus[piece.propName] = "";
    }

    return <InputLine key={idx}
        propName={piece.propName}
        title={piece.title}
        type={piece.type}
        holder={piece.title + LOGIN_HOLDER_SUFFIX}
        validRegex={"^.+$"}
        repeatCondition={false}
        isUnique={false}
        model={loginStatus}
        valid={validaty}
        setStatus={setLoginStatus}
        setValid={setValid}
    />;
}