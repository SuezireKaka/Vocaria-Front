function Storage({list = [], name = "", fixedSize = false, checker = false,
    onAdd = f => f, onCheck = f => f
}) {
    return <ListGroup>
        {}
        <ListGroup.Item action variant="primary">
            {name + " 추가 +"}
        </ListGroup.Item>
    </ListGroup>
}

export default Storage;