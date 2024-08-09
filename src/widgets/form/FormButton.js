import { Button } from "react-bootstrap"

export default function FormButton({message = "", status = {}, validaty = {},
    request = f => f, navigate = f => f
}) {
    return <Button
        variant="outline-primary"
        onClick={(e) => request(e, {...status}, navigate)}
        disabled={! Object.values(validaty).reduce((f, s) => f && s, true)}
    >
        {message}
    </Button>
}