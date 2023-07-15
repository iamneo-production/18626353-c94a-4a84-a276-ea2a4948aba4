import React, { useState, useEffect } from 'react';
import './AdminStudentAdd.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const AddAdminStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [mobile, setMobile] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [areaName, setAreaName] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [nationality, setNationality] = useState('');
  const [instcou, setInstcou] = useState([]);
  const navigate = useNavigate();
  const [selectedInstcou, setSelectedInstcou] = useState("");

  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};

    const validateField = (fieldName, value, regex, errorMessage) => {
      if (!value.trim()) {
        newErrors[fieldName] = `${fieldName} is required`;
      } else if (!regex.test(value)) {
        newErrors[fieldName] = errorMessage;
      }
    };

    const validateName = (fieldName, value) => {
      const nameRegex = /^[a-zA-Z ]+$/;
      validateField(fieldName, value, nameRegex, 'Please enter a valid name');
    };

    const validateMobile = (fieldName, value) => {
      const mobileRegex = /^\d{10}$/;
      validateField(fieldName, value, mobileRegex, 'Please enter a valid mobile number');
    };

    const validateAlternateMobile = (fieldName, value) => {
      const alternateMobileRegex = /^\d{10}$/;
      validateField(fieldName, value, alternateMobileRegex, 'Please enter a valid alternate mobile number');
    };

    const validateEmail = (fieldName, value) => {
      const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[com]{3,}$/;
      validateField(fieldName, value, emailRegex, 'Please enter a valid email address');
    };
    const validateNumber = (fieldName, value) => {
      const ageRegex = /^\d{1,2}$/; // Assuming the age should be a number between 1 and 99
      validateField(fieldName, value, ageRegex, 'Please enter a valid age (1-99)');
    };

    const validateAlphaNumeric = (fieldName, value) => {
      const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/;
      validateField(fieldName, value, alphaNumericRegex, 'Please enter a valid value');
    };

    validateName('firstName', firstName);
    validateName('lastName', lastName);
    validateField('gender', gender, /^(male|female)$/i, 'Please enter a valid gender');
    validateName('fatherName', fatherName);
    validateName('motherName', motherName);
    validateMobile('mobile', mobile);
    validateAlternateMobile('alternateMobile', alternateMobile);
    validateEmail('email', email);
    validateNumber('age', age);
    validateAlphaNumeric('houseNo', houseNo);
    validateAlphaNumeric('streetName', streetName);
    validateAlphaNumeric('areaName', areaName);
    validateField('pincode', pincode, /^\d{6}$/, 'Please enter a valid pincode');
    validateAlphaNumeric('state', state);
    validateAlphaNumeric('nationality', nationality);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(
          "https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/admin/getinstituteCourses"
        );
        setInstcou(response.data);
      } catch (error) {
        Swal.fire('error', 'error fetching institutes');
      }
    };

    fetchInstitutes();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post(
          "https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/admin/addStudent",
          {
            firstName,
            lastName,
            gender,
            fatherName,
            motherName,
            mobile,
            alternateMobile,
            email,
            age,
            houseNo,
            streetName,
            areaName,
            pincode,
            state,
            nationality,
            courseId: selectedInstcou
          }
        );

        Swal.fire({
          icon: 'success',
          title: 'Student details added',
          text: 'The student has been added successfully.',
        });
        navigate('/admin/adminstudents');
      } catch (error) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add the student.'
        })
      }
    } else {
      Swal.fire('Form contains errors. Please fix them.');
    }
  };



  return (
    <><div>
      <form className='addstu1' onSubmit={handleSubmit}>
        <h6 className='addstu2'>Add Form</h6>
        <div className='studentaddform-container'>
          <div className="Studdemo">
            <strong><label htmlFor="firstName" style={{ marginRight: "230px", color: "black" }}>First Name : {""}</label></strong>
            <input type="text" id="firstName" className='name-input' placeholder="Enter First Name" size="40"
              onChange={(e) => setFirstName(e.target.value)} />

            <div className='error'>{errors.firstName && <span>{errors.firstName}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="houseNo" style={{ marginRight: "220px", color: "black" }}>House No: {""}</label></strong>
            <input type="text" id="houseNo" className='houseNo-input' placeholder="Enter House No" size="40"
              onChange={(e) => setHouseNo(e.target.value)} />
            <div className='error'>{errors.houseNo && <span>{errors.houseNo}</span>}</div>
          </div>

          <div className="Studdemo ">
            <strong><label htmlFor="lastName" style={{ marginRight: "230px", color: "black" }}>Last Name : {""}</label></strong>
            <input type="text" id="lastName" className='name-input' placeholder="Enter Last Name" size="40"
              onChange={(e) => setLastName(e.target.value)} />

            <div className='error'>{errors.lastName && <span>{errors.lastName}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="streetName" style={{ marginRight: "230px", color: "black" }}>Street Name: {""}</label></strong>
            <input type="text" id="streetName" className='streetName-input' placeholder="Enter Street Name" size="40"
              onChange={(e) => setStreetName(e.target.value)} />

            <div className='error'>{errors.streetName && <span>{errors.streetName}</span>}</div>
          </div>

          <div className="Studdemo">
            <strong><label htmlFor="gender" style={{ marginRight: "260px", color: "black" }}>Gender: {""}</label></strong>
            <input type="text" id="gender" className='gender-input' placeholder="Enter Gender" size="40"
              onChange={(e) => setGender(e.target.value)} />

            <div className='error'>{errors.gender && <span>{errors.gender}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="areaName" style={{ marginRight: "260px", color: "black" }}>AreaName: {""}</label></strong>
            <input type="text" id="areaName" className='area-input' placeholder="Enter Area" size="40"
              onChange={(e) => setAreaName(e.target.value)} />

            <div className='error'>{errors.areaName && <span>{errors.areaName}</span>}</div>
          </div>

          <div className="Studdemo">
            <strong><label htmlFor="fatherName" style={{ marginRight: "230px", color: "black" }}>Father Name : {""}</label></strong>
            <input type="text" id="fatherName" className='name-input' placeholder="Enter Father's Name" size="40"
              onChange={(e) => setFatherName(e.target.value)} />

            <div className='error'>{errors.fatherName && <span>{errors.fatherName}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="pincode" style={{ marginRight: "230px", color: "black" }}>Pincode: {""}</label></strong>
            <input type="text" id="pincode" className='pincode-input' placeholder="Enter Pincode" size="40"
              onChange={(e) => setPincode(e.target.value)} />

            <div className='error'>{errors.pincode && <span>{errors.pincode}</span>}</div>
          </div>

          <div className="Studdemo">
            <strong><label htmlFor="motherName" style={{ marginRight: "200px", color: "black" }}>Mother Name : {""}</label></strong>
            <input type="text" id="motherName" className='name-input' placeholder="Enter Mother's Name" size="40"
              onChange={(e) => setMotherName(e.target.value)} />

            <div className='error'>{errors.motherName && <span>{errors.motherName}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="state" style={{ marginRight: "240px", color: "black" }}>State: {""}</label></strong>
            <input type="text" id="state" className='state-input' placeholder="Enter State" size="40"
              onChange={(e) => setState(e.target.value)} />

            <div className='error'>{errors.state && <span>{errors.state}</span>}</div>
          </div>


          <div className='Studdemo'>
            <strong><label htmlFor="age" style={{ marginRight: "280px", color: "black" }}>Age : {""}</label></strong>
            <input type='number' id="age" className="age-input" placeholder="Enter Age" size="40"
              onChange={(e) => setAge(e.target.value)} />

            <div className='error'>{errors.age && <span>{errors.age}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="nationality" style={{ marginRight: "220px", color: "black" }}>Nationality: {""}</label></strong>
            <input type="text" id="nationality" className='nationality-input' placeholder="Enter Nationality" size="40"
              onChange={(e) => setNationality(e.target.value)} />

            <div className='error'>{errors.nationality && <span>{errors.nationality}</span>}</div>
          </div>


          <div className='Studdemo'>
            <strong><label htmlFor="mobile" style={{ marginRight: "230px", color: "black" }}>Mobile Number: {""}</label></strong>
            <input type='number' id="mobile" className="mobilenumber-input" placeholder="Enter MobileNumber" size="40"
              onChange={(e) => setMobile(e.target.value)} />

            <div className='error'>{errors.mobile && <span>{errors.mobile}</span>}</div>
          </div>

          <div className='Studdemo'>
            <strong><label htmlFor="alternateMobile" style={{ marginRight: "130px", color: "black" }}>Alternate Mobile Number : {""}</label></strong>
            <input type='number' id="alternateMobile" className="phnumber-input" placeholder="Enter Alternate Mobile Number" size="40"
              onChange={(e) => setAlternateMobile(e.target.value)} />

            <div className='error'>{errors.alternateMobile && <span>{errors.alternateMobile}</span>}</div>
          </div>

          <div className='Studdemo'>
            <strong><label htmlFor="email" style={{ marginRight: "260px", color: "black" }}>Email : {""}</label></strong>
            <input type='text' id="email1" className="email-input" placeholder="Enter Email" size="40"
              onChange={(e) => setEmail(e.target.value)} />

            <div className='error'>{errors.email && <span>{errors.email}</span>}</div>
          </div>
          <div>
            <label htmlFor="instituteSelect" style={{ marginRight: "220px", color: "black" }}>Select Institute</label>
            <select
              className='instituteselect-student'
              id="instituteSelect"
              value={selectedInstcou}
              onChange={(e) => setSelectedInstcou(e.target.value)}
            ><option value="" disabled selected>
                Select one Course
              </option>
              {instcou.map((institute) => (
                <option key={institute.courseId} value={institute.courseId}>
                  {institute.instituteName}-{institute.courseName}
                </option>
              ))}
            </select>
          </div>



        </div>
        <button className="Add-student-button" id="addStudent"> Add Student</button>
      </form>

    </div></>
  );
};
export default AddAdminStudent;