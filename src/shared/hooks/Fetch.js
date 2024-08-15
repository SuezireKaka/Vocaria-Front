import AppContext from "../../contexts/AppContextProvider";
import {useFetch, usePost, useAuth} from "./useFetch"
import { useContext } from "react";
import Loading from '../layout/Loading';

function Fetch({uri, renderSuccess = f => f,
    loadingFallBack = <Loading />,
    renderError = ({error})=>(<pre>{JSON.stringify(error, null, 2)}</pre>),
    doLog = false}) {

    const {loading, data, error} = useFetch(uri, doLog);

    if (doLog) {
        console.log("어디 한 번 해보자");
        console.log(uri, loading, data);
    }

    if (loading) return loadingFallBack;
    if (error) return renderError({error});
    if (data) {
        return renderSuccess(data);
    }
}

function AxiosPost({uri, body, renderSuccess = f=>f,
    loadingFallBack = <Loading />,
    renderError = ({error})=>(<pre>{JSON.stringify(error, null, 2)}</pre>)}) {

    const {loading, data, error} = usePost(uri, body);

    if (loading) return loadingFallBack;
    if (error) return renderError({error});
    if (data) {
        return renderSuccess(body, data);
    }
}

function AxiosAuth({uri, renderSuccess = f=>f,
    loadingFallBack = <Loading />,
    renderError = ({error})=>(<pre>{JSON.stringify(error, null, 2)}</pre>)}) {

    const {auth} = useContext(AppContext)

    const {loading, data, error} = useAuth(uri, auth);

    if (loading) return loadingFallBack;
    if (error) return renderError({error});
    if (data) {
        return renderSuccess(data);
    }
}

export {Fetch, AxiosPost, AxiosAuth};