import React from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from './Components/Auth/Login/Login';
import Signup from './Components/Auth/Signup/Signup';
import PrivateRoute from './Components/Auth/auth/PrivateRoutes';
import AdminBaseComponent from './Components/Admin/AdminBase/AdminBase';
import UserBaseComponent from './Components/User/UserBase/UserBase';

function App() {
  return (

    <div>
      <Router>
        <Routes>
          <Route path='/Admin/*' element={<PrivateRoute element={<AdminBaseComponent />} authRole="Admin" allowedRoles={['Admin']} />} /> 
           <Route path="/user/*" element={<PrivateRoute element={<UserBaseComponent />} authRole="User" allowedRoles={['User']} />} />
          
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>

  );
}
export default App;