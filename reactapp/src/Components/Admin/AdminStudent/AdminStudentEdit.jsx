import React, {useState, useEffect} from 'react';
import './AdminStudentEdit.css';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const EditStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [student, setStudent] = useState({
    studentId: location.state.studentId,
  });
  const [errors, setErrors] = useState({});
  const [instcou, setInstcou] = useState([]);
  const [selectedInstcou, setSelectedInstcou] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError]= useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false); 
    useEffect(() => {

    const fetchStudent = async () => {
      try {
        const response = await axios.get('https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/admin/viewstudentbyId/'+student.studentId);
       setStudent(response.data);
       setSelectedInstcou(response.data.courseId)

      } catch (error){
        Swal.fire({
          title:'error',
          text:'Error fetching student',
        })

      }
    };
       
    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(
          "https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/admin/getinstituteCourses"
        );
        setInstcou(response.data);
      } catch (error) {
        Swal.fire({
          title:'Error',
          text:'Error fetching institutes',
        })
      }
    };
  
    fetchInstitutes();
  }, []);
  const handleUpdate = async () => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);
    const updatedStudent = {
      studentId:student.studentId,
       firstName:student.firstName,
       lastName:student.lastName,
       gender:student.gender,
       motherName:student.motherName,
       fatherName:student.fatherName,
       mobile:student.mobile,
       alternateMobile:student.alternateMobile,
       email:student.email,
       age:student.age,
       houseNo:student.houseNo,
       streetName:student.streetName,
       areaName:student.areaName,
       pincode:student.pincode,
       state:student.state,
       nationality:student.nationality,
       courseId:selectedInstcou

    };
    try{
      await axios.put(`https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/admin/editStudent/${student.studentId}`,updatedStudent);
      setUpdateSuccess(true);
      Swal.fire({
        icon:'success',
        title:'Student details Updated',
        text:'The student has been updated successfully.',
      });
      navigate('/admin/adminstudents')
    }catch (error) {
      setUpdateError('Failed to update the student.');
      
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Failed to update the student.',
      });
    }
setIsUpdating(false);
  };

  const validateForm = () => {
    const errors = {};
  
    const validateField = (fieldName, label, regex, required = true) => {
      const value = student[fieldName];
      if (required && !value) {
        errors[fieldName] = `${label} is required`;
      } else if (value && !regex.test(value)) {
        errors[fieldName] = `Please enter a valid ${label}`;
      }
    };
  
    validateField('firstName', 'First Name', /^[a-zA-Z\s]+$/);
    validateField('lastName', 'Last Name', /^[a-zA-Z\s]+$/);
    validateField('gender', 'Gender', /^[a-zA-Z\s]+$/);
    validateField('fatherName', 'Father Name', /^[a-zA-Z\s]+$/);
    validateField('motherName', 'Mother Name', /^[a-zA-Z\s]+$/);
    validateField('mobile', 'Mobile Number', /^[0-9\s]+$/);
    validateField('alternateMobile', 'Alternate Mobile Number', /^[0-9\s]+$/);
    validateField('email', 'Email', /^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[com]{3,}$/);
    validateField('age', 'Age', /^[0-9\s]+$/);
    validateField('houseNo', 'House Number', /^[0-9\s]+$/);
    validateField('streetName', 'Street Name', /^[a-zA-Z\s]+$/);
    validateField('areaName', 'Area Name', /^[a-zA-Z\s]+$/);
    validateField('pincode', 'Pincode', /^[0-9\s]+$/);
    validateField('state', 'State', /^[a-zA-Z\s]+$/);
    validateField('nationality', 'Nationality', /^[a-zA-Z\s]+$/);
  
    setErrors(errors);
    return Object.values(errors).every((error) => !error);
  };
  
  const handleSubmit =  (e) => {
    e.preventDefault();
     if (validateForm()) {
      handleUpdate();
     }else{
      Swal.fire({
         icon:'error',
         title:'error',
         text:'Form containes error please fix them.',
          
         })
     }
};

  return (
    <><div>
      <form className='editstu1' onSubmit={handleSubmit}>
        <h2 className='editstu2'>Edit Form</h2>
        {updateError && <div>{updateError}</div>}
        {updateSuccess && <div>Student updated successfully.</div>}
        <div className='studenteditform-container'>

          <div className="Stueditdemo">
            <label style={{ marginRight: "240px", color: "black" }}><strong>First Name : </strong></label>
            <input type="text" id="firstName" className='name-input' size="40"
              value={student.firstName}
              onChange={(e) => setStudent({ ...student, firstName: e.target.value })} />

            {errors.firstName && <div>{errors.firstName}</div>}
          </div>
          <div className="Stueditdemo">
            <label style={{ marginRight: "240px", color: "black" }}><strong>HouseNo : </strong></label>
            <input type="text" id="houseNo" className='houseno' size="40"
              value={student.houseNo}
              onChange={(e) => setStudent({ ...student, houseNo: e.target.value })} />

            {errors.houseNo && <div>{errors.houseNo}</div>}
          </div>
          <div className="Stueditdemo">
            <label style={{ marginRight: "240px", color: "black" }}><strong>last Name : </strong></label>
            <input type="text" id="lastName" className='name-input' size="40"
              value={student.lastName}
              onChange={(e) => setStudent({ ...student, lastName: e.target.value })} />

            {errors.lastName && <div>{errors.lastName}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>StreetName :</strong> </label>
            <input type="text" id="streetName" className='streetName-input' size="40"
              value={student.streetName}
              onChange={(e) => setStudent({ ...student, streetName: e.target.value })} />

            {errors.streetName && <div>{errors.streetName}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>Gender :</strong> </label>
            <input type="text" id="gender" className='gender-input' size="40"
              value={student.gender}
              onChange={(e) => setStudent({ ...student, gender: e.target.value })} />

            {errors.gender && <div>{errors.gender}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>AreaName :</strong> </label>
            <input type="text" id="areaName" className='area' size="40"
              value={student.areaName}
              onChange={(e) => setStudent({ ...student, areaName: e.target.value })} />

            {errors.areaName && <div>{errors.areaName}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>FatherName :</strong> </label>
            <input type="text" id="fatherName" className='fatherName' size="40"
              value={student.fatherName}
              onChange={(e) => setStudent({ ...student, fatherName: e.target.value })} />

            {errors.fatherName && <div>{errors.fatherName}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>pincode :</strong> </label>
            <input type="text" id="pincode" className='pincode' size="40"
              value={student.pincode}
              onChange={(e) => setStudent({ ...student, pincode: e.target.value })} />

            {errors.pincode && <div>{errors.pincode}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>motherName :</strong> </label>
            <input type="text" id="motherName" className='motherName' size="40"
              value={student.motherName}
              onChange={(e) => setStudent({ ...student, motherName: e.target.value })} />

            {errors.motherName && <div>{errors.motherName}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>State :</strong> </label>
            <input type="text" id="state" className='state' size="40"
              value={student.state}
              onChange={(e) => setStudent({ ...student, state: e.target.value })} />

            {errors.state && <div>{errors.state}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "270px", color: "black" }}><strong>Age :</strong> </label>
            <input type="number" id="age" className='age' size="40"
              value={student.age}
              onChange={(e) => setStudent({ ...student, age: e.target.value })} />

            {errors.age && <div>{errors.age}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>Nationality :</strong> </label>
            <input type="text" id="nationality" className='nationality' size="40"
              value={student.nationality}
              onChange={(e) => setStudent({ ...student, nationality: e.target.value })} />

            {errors.nationality && <div>{errors.nationality}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "230px", color: "black" }}><strong>Mobilenumber :</strong> </label>
            <input type="text" id="mobile" className='mobile' size="40"
              value={student.mobile}
              onChange={(e) => setStudent({ ...student, mobile: e.target.value })} />

            {errors.mobile && <div>{errors.mobile}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "220px", color: "black" }}><strong>AlternateMobile :</strong> </label>
            <input type="text" id="alternatemobile" className='alternatemoobile' size="40"
              value={student.alternateMobile}
              onChange={(e) => setStudent({ ...student, alternateMobile: e.target.value })} />

            {errors.alternateMobile && <div>{errors.alternateMobile}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>Email :</strong> </label>
            <input type="text" id="email1" className='email' size="40"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })} />

            {errors.email && <div>{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="instituteSelect" style={{ marginRight: "220px", color: "black" }}><strong>Select Institute</strong></label>
            <select
              className='instituteselect-student'
              id="institutecouSelect"
              value={selectedInstcou}
              onChange={(e) => setSelectedInstcou(e.target.value)}
            >
              <option value="" disabled selected>
                Select one institute
              </option>
              {instcou.map((item) => (
                <option key={item.courseId} value={item.courseId}>
                  {item.instituteName}-{item.courseName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="Edit-student-button" id="editStudent" disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Update Student'}</button>
      </form>

    </div></>
  );
  };
export default EditStudent;