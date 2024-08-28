import { useState } from "react";
import { Button } from "react-bootstrap"
import { MdTextFields } from "react-icons/md";

export default function RoleButton({role,
    onChoose = f => f, onLeave = f => f, onClick = f => f
}) {
    return <Button
        variant="outline-info"
        onMouseEnter={onChoose}
        onMouseLeave={onLeave}
        onClick={onClick}
    >
        {role.name}
    </Button>
}