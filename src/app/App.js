import Router from '../router/Router';
import axios from './axios/axios';
import { useContext } from 'react';
import AppContext from '../contexts/AppContextProvider';

const getSystemUse = async (uri, setter = f => f) => {
    const response = await axios.get(uri);
    console.log("백엔드가 이거 줬어요", response)
    setter(response?.data);
  }

function App() {
    const {registerForm, setRegisterForm} = useContext(AppContext)

    if (! registerForm) {
        getSystemUse("/framework/anonymous/getFormFor/register", setRegisterForm);
    }

    return <div className="App">
        <Router/>
    </div>
}

export default App;
