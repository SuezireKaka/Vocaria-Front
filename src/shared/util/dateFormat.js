export function dateFormat(date) {
    return date.toISOString().substring(0, 10);
}

const TODAY = dateFormat(new Date());
export {TODAY};