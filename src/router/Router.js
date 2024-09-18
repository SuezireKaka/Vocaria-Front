import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Login from '../pages/Login';
import TokenTest from '../pages/test/Test';
import VocaListPage from '../pages/VocaListPage';
import VocaDetailsPage from '../pages/VocaDetailsPage';
import SubscribePage from '../pages/SubscribePage';
import GroupMaker from '../pages/GroupMaker';
import GroupDetailsPage from '../pages/GroupDetailsPage';
import GroupListPage from '../pages/GroupListPage';
import MissionDetailsPage from '../pages/VocaMissionPage';
import VocaMissionPage from '../pages/VocaMissionPage';
import MissionListPage from '../pages/MissionListPage';

export default function Router() {
    return <Routes> 
        <Route path="/" element={ <Home /> } />

        {/*<Route path={"/agreement"} element={ <Agreement/> } />*/}
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />

        <Route path="/group" element={ <GroupListPage page={1} /> } />
        <Route path="/group/maker" element={ <GroupMaker /> } />
        <Route path="/group/:groupId" element={ <GroupDetailsPage page={1} /> } />

        <Route path="/test/token" element={ <TokenTest /> } />
        
        <Route path="/voca" element={ <VocaListPage page={1}/> } />
        <Route path="/voca/:vocaId" element={ <VocaDetailsPage /> } />

        <Route path="/mission" element={ <MissionListPage page={1}/> } />
        <Route path="/mission/:vocaId/:chapterNum" element={ <VocaMissionPage /> } />

        <Route path="/subscribe" element={ <SubscribePage page={1}/> } />
  
        <Route path="*" element={<NotFound />}/>
    </Routes>
}
