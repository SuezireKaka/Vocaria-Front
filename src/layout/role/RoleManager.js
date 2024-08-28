import { useState } from "react";
import RoleButton from "../../widgets/role/RoleButton";

export default function RoleManager({roleList = [], onPinRole = f => f}) {
    const [nowRole, setNowRole] = useState(null);
    const [isPinned, setPinned] = useState(false);

    const hoverProcess = (role) => {
        if (! isPinned) {
            setNowRole(role);
        }
    }

    const clickProcess = (role) => {
        setNowRole(role);
        setPinned(!isPinned || role.id !== nowRole.id);
    }

    return <>
        {roleList.map((role, i) => 
            <RoleButton key={i} role={role}
                onChoose={() => hoverProcess(role)}
                onLeave={() => hoverProcess(null)}
                onClick={() => clickProcess(role)}
            />
        )}
        {nowRole
            ? <>
            <br/>
            <p>{nowRole.info}</p>
            </>
            : ""
        }
    </>
}

