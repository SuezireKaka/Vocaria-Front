import { useState } from "react";
import { Button } from "react-bootstrap"
import { MdTextFields } from "react-icons/md";

export default function RoleChain({style,
    roles,
    onChangeRole = f => f
}) {
    return <div style={{...style}}
        onClick={() => onChangeRole(roles)}
    >
        {"roles : " + roles.map(role => role.name).join(", ")}
    </div>
}