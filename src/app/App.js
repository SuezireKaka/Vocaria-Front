import Router from '../router/Router';
import axios from './axios/axios';
import { useContext } from 'react';
import AppContext from '../contexts/AppContextProvider';
import 'bootstrap/dist/css/bootstrap.css';

const getSystemUse = async (uri, setter = f => f) => {
    const response = await axios.get(uri);
    console.log("백엔드가 이거 줬어요", response?.data);
    setter(response?.data);
}

function App() {
    const {registerForm, setRegisterForm} = useContext(AppContext);

    if (! registerForm) {
        getSystemUse("/framework/anonymous/getFormFor/register", setRegisterForm);
    }

    console.log("그래서 지금 이거 갖고 있어요", registerForm);

    return <div className="App">
        <Router/>
    </div>
}

export default App;
