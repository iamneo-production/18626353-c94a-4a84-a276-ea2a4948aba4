import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from '../AdminNavbar/AdminNav';
import AdminAcademyhome from '../AdminAcademy/AdminAcademyhome';
import AdminAcademyAdd from '../AdminAcademy/AdminAcademyAdd';
import AdmineditAcademy from '../AdminAcademy/AdminAcademyEdit';
import AdminCourse2 from '../AdminAcademy/AdminCourse2';
import AdminCourse from '../AdminCourse/AdminCourse';
import AdminCourseAdd from '../AdminCourse/AdminCourseAdd';
import AdminCourseEdit from '../AdminCourse/AdminCourseEdit';
import Adminstudent from '../AdminStudent/AdminStudent';
import AddAdminStudent from '../AdminStudent/AdminStudentAdd';
import EditStudent from '../AdminStudent/AdminStudentEdit';

function AdminBaseComponent() {
    return (
        <div>
            <AdminHome/>
            
            <Routes>
                <Route path='adminacademy' element={<AdminAcademyhome />}></Route>
                <Route path='addacademy' element={<AdminAcademyAdd />} />
                <Route path='editacademy/:id1' element={<AdmineditAcademy />} />
                <Route path='admincourse2' element={<AdminCourse2 />} />
                <Route path= 'admincourse' element ={<AdminCourse/>} />
                <Route path= 'addcourse' element ={<AdminCourseAdd/>} />
                <Route path='editcourse' element={<AdminCourseEdit />} />
                <Route path='adminstudents' element={<Adminstudent />} />
                <Route path='addstudent' element={<AddAdminStudent />} />
                <Route path='updatestudent' element={<EditStudent />} />
            </Routes>
        </div>
    )
}

export default AdminBaseComponent;