import React, { useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './UserForms.css';

import Swal from 'sweetalert2';


const Forms = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFathersName] = useState('');
    const [motherName, setMothersName] = useState('');
    const [mobile, setPhoneNumber] = useState('');
    const [alternateMobile, setAlternatePhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [streetName, setStreetName] = useState('');
    const [areaName, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [nationality, setNationality] = useState('');


    const location = useLocation();
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
  
    const validatePhoneNumber = (fieldName, value) => {
      const phoneNumberRegex = /^\d{10}$/;
      validateField(fieldName, value, phoneNumberRegex, 'Please enter a valid phone number');
    };
  
    const validateAlternatePhoneNumber = (fieldName, value) => {
      const alternatePhoneNumberRegex = /^\d{10}$/;
      validateField(fieldName, value, alternatePhoneNumberRegex, 'Please enter a valid alternate phone number');
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
    validatePhoneNumber('mobile', mobile);
    validateAlternatePhoneNumber('alternateMobile', alternateMobile);
    validateEmail('email', email);
    validateNumber('age', age);
    validateAlphaNumeric('houseNo', houseNo);
    validateAlphaNumeric('streetName', streetName);
    validateAlphaNumeric('area', areaName);
    validateField('pincode', pincode, /^\d{6}$/, 'Please enter a valid pincode');
    validateAlphaNumeric('state', state);
    validateAlphaNumeric('nationality', nationality);
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    try {
      const { vdata } = location.state;
      const courseId = vdata.courseId;
  
      const formData = {
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
        courseId
      };
  
      const storedEmail = localStorage.getItem('email');
      if (!storedEmail) {
        return;
      }
  
      const userResponse = await axios.get(`https://8080-abbaedcbbaecebadafdecbf.project.examly.io/user/${encodeURIComponent(storedEmail)}`);
      const userId = userResponse.data.userId;
      const instituteId = vdata.instituteId;
  
      await axios.post(`https://8080-abbaedcbbaecebadafdecbf.project.examly.io/user/addAdmission/${courseId}/${instituteId}/${userId}`, formData);
  
      console.log('Form submitted successfully!');
      Swal.fire({
        icon: 'success',
        title: 'Admission Added',
        text: 'The form has been submitted successfully.',
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  
    
  return (
    <><div>
      <form className='editecform' onSubmit={handleSubmit}>
        <h4 className='enrollform'>Enroll Form</h4>
        <div className='studentedit-container'>
          {/* <div className='addform-column'> */}
          <div className="enrollform">
            <strong><label htmlFor="firstName" style={{ marginRight: "240px", color: "black" }}>First Name : </label></strong>
            <input type="text" id="firstName" className='name-input' placeholder="Enter First Name" size="40"
              onChange={(e) => setFirstName(e.target.value)} />

            <div className='errorform'>{errors.firstName && <span>{errors.firstName}</span>}</div>
          </div>
          <div className='enrollform'>
            <strong><label htmlFor="email" style={{ marginRight: "230px", color: "black" }}>Email : </label></strong>
            <input type='text' id="email1" className="email-input" placeholder="Enter Email" size="40"
              onChange={(e) => setEmail(e.target.value)} />

            <div className='errorform'>{errors.email && <span>{errors.email}</span>}</div>
          </div>

          <div className="enrollform ">
            <strong><label htmlFor="lastName" style={{ marginRight: "240px", color: "black" }}>Last Name : </label></strong>
            <input type="text" id="lastName" className='name-input' placeholder="Enter Last Name" size="40"
              onChange={(e) => setLastName(e.target.value)} />

            <div className='errorform'>{errors.lastName && <span>{errors.lastName}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="houseNo" style={{ marginRight: "200px", color: "black" }}>House No: </label></strong>
            <input type="text" id="houseNo" className='houseNo-input' placeholder="Enter House No" size="40"
              onChange={(e) => setHouseNo(e.target.value)} />
            <div className='errorform'>{errors.houseNo && <span>{errors.houseNo}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="gender" style={{ marginRight: "240px", color: "black" }}>Gender: </label></strong>
            <input type="text" id="gender" className='gender-input' placeholder="Enter Gender" size="40"
              onChange={(e) => setGender(e.target.value)} />

            <div className='errorform'>{errors.gender && <span>{errors.gender}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="streetName" style={{ marginRight: "200px", color: "black" }}>Street Name: </label></strong>
            <input type="text" id="streetName" className='streetName-input' placeholder="Enter Street Name" size="40"
              onChange={(e) => setStreetName(e.target.value)} />

            <div className='errorform'>{errors.streetName && <span>{errors.streetName}</span>}</div>
          </div>

          <div className="enrollform">
            <strong><label htmlFor="fathersName" style={{ marginRight: "240px", color: "black" }}>Father Name : </label></strong>
            <input type="text" id="fathersName" className='name-input' placeholder="Enter Father's Name" size="40"
              onChange={(e) => setFathersName(e.target.value)} />

            <div className='errorform'>{errors.fathersName && <span>{errors.fathersName}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="area" style={{ marginRight: "200px", color: "black" }}>Area: </label></strong>
            <input type="text" id="area" className='area-input' placeholder="Enter Area" size="40"
              onChange={(e) => setArea(e.target.value)} />

            <div className='errorform'>{errors.area && <span>{errors.area}</span>}</div>
          </div>

          <div className="enrollform">
            <strong><label htmlFor="mothersName" style={{ marginRight: "240px", color: "black" }}>Mother Name : </label></strong>
            <input type="text" id="mothersName" className='name-input' placeholder="Enter Mother's Name" size="40"
              onChange={(e) => setMothersName(e.target.value)} />

            <div className='errorform'>{errors.mothersName && <span>{errors.mothersName}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="pincode" style={{ marginRight: "200px", color: "black" }}>Pincode: </label></strong>
            <input type="text" id="pincode" className='pincode-input' placeholder="Enter Pincode" size="40"
              onChange={(e) => setPincode(e.target.value)} />

            <div className='errorform'>{errors.pincode && <span>{errors.pincode}</span>}</div>
          </div>

          <div className='enrollform'>
            <strong><label htmlFor="age" style={{ marginRight: "230px", color: "black" }}>Age : </label></strong>
            <input type='number' id="age" className="age-input" placeholder="Enter Age" size="40"
              onChange={(e) => setAge(e.target.value)} />

            <div className='errorform'>{errors.age && <span>{errors.age}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="state" style={{ marginRight: "200px", color: "black" }}>State: </label></strong>
            <input type="text" id="state" className='state-input' placeholder="Enter State" size="40"
              onChange={(e) => setState(e.target.value)} />

            <div className='errorform'>{errors.state && <span>{errors.state}</span>}</div>
          </div>

          <div className='enrollform'>
            <strong><label htmlFor="phoneNumber" style={{ marginRight: "230px", color: "black" }}>Phone Number: </label></strong>
            <input type='number' id="phoneNumber" className="phonenumber-input" placeholder="Enter PhoneNumber" size="40"
              onChange={(e) => setPhoneNumber(e.target.value)} />

            <div className='errorform'>{errors.phoneNumber && <span>{errors.phoneNumber}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="nationality" style={{ marginRight: "200px", color: "black" }}>Nationality: </label></strong>
            <input type="text" id="nationality" className='nationality-input' placeholder="Enter Nationality" size="40"
              onChange={(e) => setNationality(e.target.value)} />

            <div className='errorform'>{errors.nationality && <span>{errors.nationality}</span>}</div>
          </div>
          <div className='enrollform'>
            <strong><label htmlFor="alternatePhoneNumber" style={{ marginRight: "150px", color: "black" }}>Alternate Phone Number : </label></strong>
            <input type='number' id="alternatePhoneNumber" className="phnumber-input" placeholder="Enter Alternate Phone Number" size="40"
              onChange={(e) => setAlternatePhoneNumber(e.target.value)} />

            <div className='errorform'>{errors.alternatePhoneNumber && <span>{errors.alternatePhoneNumber}</span>}</div>
          </div>
        </div>
        <button className="enrollformbutton" id="addStudent"> Enroll Now</button>
      </form>
    </div></>
  );
};

export default Forms;