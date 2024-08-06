export default function propChange(model, propName, propVal, callBack = f => f) {
    let copy = {...model};
    copy[propName] = propVal;
    callBack(copy);
}