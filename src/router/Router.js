import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Login from '../pages/Login';
import TokenTest from '../pages/test/Test';
import VocaListPage from '../pages/VocaListPage';
import VocaDetailsPage from '../pages/VocaDetailsPage';
import SubscribePage from '../pages/SubscribePage';
import GroupPage from '../pages/GroupPage';

export default function Router() {
    return <Routes> 
        <Route path="/" element={ <Home /> } />

        {/*<Route path={"/agreement"} element={ <Agreement/> } />*/}
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />

        <Route path="/group/:groupId" element={ <GroupPage page={1} /> } />

        <Route path="/test/token" element={ <TokenTest /> } />
        
        <Route path="/voca" element={ <VocaListPage page={1}/> } />
        <Route path="/voca/:vocaId" element={ <VocaDetailsPage /> } />

        <Route path="/subscribe" element={ <SubscribePage page={1}/> } />
  
        <Route path="*" element={<NotFound />}/>
    </Routes>
}
