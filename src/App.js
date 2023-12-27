import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pc from './components/Pc';
import Assign from './components/Assign';
import User from './components/User';
import Navbar from './components/Navbar';
import Dashbord from './components/Dashbord';
import Viewuser from './components/Viewuser';
import Login from './components/Login';
import Protected from './components/Protected';
import Page404 from './Page404';
import Curd from './components/Realtimestore/Curd';

function App() {
  return (
    <>
    {/* <BrowserRouter>
    <Navbar/>
      <Routes>
            <Route path="/"  element={<Dashbord/>} />
            <Route path="/assign" element={<Protected Comp={Assign} />} />
            <Route path="/login"element={<Login />} />
            <Route path="/pc" element={<Protected Comp={Pc} />} />
            <Route path="/user/view/:id" element={<Protected Comp={Viewuser} />}/>
            <Route path="/user" element={<Protected Comp={User} />}/>
            <Route path="*" element={<Page404/>}/>
      </Routes>
    </BrowserRouter> */}
    <Curd/>
    </>
  );
}

export default App;
