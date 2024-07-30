import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';


export default function Router() {
    return <Routes> 
        <Route path="/" element={ <Home /> } />

        {/*<Route path={"/agreement"} element={ <Agreement/> } />
        <Route path={"/log-in"} element={ <LoginStage/> } />
        <Route path={"/register"} element={ <Register/> } />*/}
  
        <Route path="*" element={<NotFound />}/>
    </Routes>
}
