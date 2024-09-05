import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";

export default function ListViewer({list = [], index = 0, totalSize = list.length,
    permitSymbol = <FaCheck/>,
    onSelect = f => f,
    onFirst = f => f, onPrev = f => f, onNext = f => f, onLast = f => f,
    onPermit = f => f
}) {

    return <div style={{textAlign: "center"}}>
        <div>
            <Button onClick={async (e) => {onFirst(e)}}>{"<<"}</Button>
            <Button onClick={async (e) => {onPrev(e)}}>{"<"}</Button>
                {(index + 1) + " / " + totalSize}
            <Button onClick={async (e) => {onNext(e)}}>{">"}</Button>
            <Button onClick={async (e) => {onLast(e)}}>{">>"}</Button>
            <Button variant="success" onClick={async (e) => {onPermit(e)}}>{permitSymbol}</Button>
        </div>
        <div>
            {onSelect(list[index], index)}
        </div>
    </div>
}