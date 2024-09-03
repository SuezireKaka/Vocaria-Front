export default function roleCheck(auth, id, suffix) {
    return auth.roles?.reduce(
        (a, b) => {
            return a || (b === (id + "-" + suffix))
        }, false
    )
}