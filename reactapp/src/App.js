import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import AdminAcademyhome from './AdminAcademy/Adminacademy/AdminAcademyhome';
// import AddAdminAcademy from './AdminAcademy/AdminacademyAddEdit/AdminAcademyAdd';
// import EditAdminAcademy from './AdminAcademy/AdminacademyAddEdit/AdminAcademyEdit';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
// import Adminstudent from './Student/adminstudent1';
// import Forms from './Student/create';
function App() {
  return (
    <Router>
    <Routes>
        <Route exact path="/" element = {<Login/>}>
        </Route>
        <Route exact path="/Signup" element = {<Signup/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;