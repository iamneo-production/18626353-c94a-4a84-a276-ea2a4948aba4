import React, { useState, useEffect } from 'react';
import './UserEnrolledEdit.css';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditEnrolled = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [edit, setEdit] = useState({
    admissionId: location.state.admissionId,
    firstName: '',
    lastName: '',
    mobile: '',
    age: '',
    gender: '',
    houseNo: '',
    streetName: '',
    areaName: '',
    state: '',
    pincode: '',
    nationality: '',
    fatherName: '',
    motherName: '',
    email: '',
    courseId: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/viewAdmission1?admissionId=${edit.admissionId}`
        );
        const api = response.data;
        if (api.length > 0) {
          const api_data = api[0];
          setEdit(api_data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, edit.admissionId]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    const isValid = validateForm();
    if (!isValid) {
      setIsUpdating(false);
      return;
    }

    const updatedDetails = {
      studentId: edit.studentId,
      firstName: edit.firstName,
      lastName: edit.lastName,
      mobile: edit.mobile,
      age: edit.age,
      gender: edit.gender,
      houseNo: edit.houseNo,
      streetName: edit.streetName,
      areaName: edit.areaName,
      state: edit.state,
      pincode: edit.pincode,
      nationality: edit.nationality,
      fatherName: edit.fatherName,
      motherName: edit.motherName,
      email: edit.email,
      courseId: edit.courseId,
    };

    try {
      await axios.put(
        `https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/editAdmission/${edit.admissionId}`,
        updatedDetails
      );

      setUpdateSuccess(true);
      Swal.fire({
        icon: 'success',
        title: 'Details Updated',
        text: 'The details have been updated successfully.',
      });
      navigate('/user/enrolledcourse');
    } catch (error) {
      setUpdateError('Failed to update the details.');

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the details.',
      });
    }

    setIsUpdating(false);
  };

  const validateForm = () => {
    const errors = {};
  
    const validateRequiredField = (fieldName, fieldValue) => {
      if (typeof fieldValue !== 'string' || !fieldValue.trim || fieldValue.trim() === '') {
        errors[fieldName] = `${fieldName} is required`;
      }
    };
  
    const validateField = (fieldName, fieldValue, regex = null, errorMessage = null) => {
      validateRequiredField(fieldName, fieldValue);
      if (regex && !regex.test(fieldValue)) {
        errors[fieldName] = errorMessage || `${fieldName} is invalid`;
      }
    };
  
    const validateEmail = (fieldName, fieldValue) => {
      validateRequiredField(fieldName, fieldValue);
    };
  
    const validateNumber = (fieldName, value) => {
  validateField(fieldName, value);
};


  
    validateField('firstName', edit.firstName);
    validateField('lastName', edit.lastName);
    validateField('fatherName', edit.fatherName);
    validateField('motherName', edit.motherName);
    validateField('gender', edit.gender);
    validateNumber('age', edit.age);
    validateEmail('email', edit.email);
    validateField('mobile', edit.mobile);
    validateField('houseNo', edit.houseNo);
    validateField('streetName', edit.streetName);
    validateField('areaName', edit.areaName);
    validateField('state', edit.state);
    validateField('pincode', edit.pincode);
    validateField('nationality', edit.nationality);
  
    setErrors(errors);
  
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <><div>
      <center>
        <form className='editec' onSubmit={handleSubmit}>
          <h4 className='editform'>Edit Form</h4>
          {updateError && <div>{updateError}</div>}
          {updateSuccess && <div>Course updated successfully.</div>}
          <div className='studenteditec-container'>

            <div className="enrollededit">
              <label style={{ marginTop: "30px", marginRight: "220px", color: "black" }}><strong>First Name:</strong></label>
              <input
                type="text"
                id="firstName"
                value={edit.firstName}
                onChange={(e) => setEdit({ ...edit, firstName: e.target.value })} />
              {errors.firstName && <div>{errors.firstName}</div>}
            </div>


            <div className='enrollededit'>
              <label style={{ marginTop: "30px", marginRight: "220px", color: "black" }}><strong>Email:</strong> </label>
              <input
                type='text'
                id="Email"
                value={edit.email}
                onChange={(e) => setEdit({ ...edit, email: e.target.value })} />
              {errors.Email && <div>{errors.Email}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "240px", color: "black" }}><strong> Last Name:</strong></label>
              <input
                type="text"
                id="lastName"
                value={edit.lastName}
                onChange={(e) => setEdit({ ...edit, lastName: e.target.value })} />
              {errors.lastName && <div>{errors.lastName}</div>}
            </div>


            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>House No: </strong></label>
              <input
                type="text"
                id="HouseNo"
                value={edit.houseNo}
                onChange={(e) => setEdit({ ...edit, houseNo: e.target.value })} />
              {errors.houseNo && <div>{errors.houseNo}</div>}
            </div>


            <div className="enrollededit">
              <label style={{ marginRight: "240px", color: "black" }}><strong> Father Name:</strong></label>
              <input
                type="text"
                id="fatherName"
                value={edit.fatherName}
                onChange={(e) => setEdit({ ...edit, fatherName: e.target.value })} />
              {errors.fatherName && <div>{errors.fatherName}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong> Street Name:</strong> </label>
              <input
                type="text"
                id="streetName"
                value={edit.streetName}
                onChange={(e) => setEdit({ ...edit, streetName: e.target.value })} />
              {errors.streetName && <div>{errors.streetName}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "240px", color: "black" }}><strong> Mother Name:</strong> </label>
              <input
                type="text"
                id="motherName"
                value={edit.motherName}
                onChange={(e) => setEdit({ ...edit, motherName: e.target.value })} />
              {errors.motherName && <div>{errors.motherName}</div>}
            </div>



            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>Area Name:</strong> </label>
              <input
                type="text"
                id="areaName"
                value={edit.areaName}
                onChange={(e) => setEdit({ ...edit, areaName: e.target.value })} />
              {errors.areaName && <div>{errors.areaName}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "240px", color: "black" }}><strong> Gender:</strong> </label>
              <input
                type="text"
                id="Gender"
                value={edit.gender}
                onChange={(e) => setEdit({ ...edit, gender: e.target.value })} />
              {errors.gender && <div>{errors.gender}</div>}
            </div>


            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>Pincode:</strong> </label>
              <input
                type="text"
                id="Pincode"
                value={edit.pincode}
                onChange={(e) => setEdit({ ...edit, pincode: e.target.value })} />
              {errors.pincode && <div>{errors.pincode}</div>}
            </div>


            <div className='enrollededit'>
              <label style={{ marginRight: "230px", color: "black" }}><strong>Age:</strong> </label>
              <input
                type='number'
                id="Age"
                value={edit.age}
                onChange={(e) => setEdit({ ...edit, age: e.target.value })} />
              {errors.age && <div>{errors.age}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>State:</strong> </label>
              <input
                type="text"
                id="State"
                value={edit.state}
                onChange={(e) => setEdit({ ...edit, state: e.target.value })} />
              {errors.state && <div>{errors.state}</div>}
            </div>

            <div className='enrollededit'>
              <label style={{ marginRight: "230px", color: "black" }}><strong> Phone Number:</strong> </label>
              <input
                type='number'
                id="Mobile"
                value={edit.mobile}
                onChange={(e) => setEdit({ ...edit, mobile: e.target.value })} />
              {errors.mobile && <div>{errors.mobile}</div>}
            </div>



            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>Nationality:</strong> </label>
              <input
                type="text"
                id="Nationality"
                value={edit.nationality}
                onChange={(e) => setEdit({ ...edit, nationality: e.target.value })} />
              {errors.nationality && <div>{errors.nationality}</div>}
            </div>


            <div className='enrollededit'>
              <label style={{ marginRight: "150px", color: "black" }}><strong> Alternate Phone Number:</strong> </label>
              <input
                type='number'
                id="alternateMobile"
                value={edit.alternateMobile}
                onChange={(e) => setEdit({ ...edit, alternateMobile: e.target.value })} />
              {errors.alternateMobile && <div>{errors.alternateMobile}</div>}
            </div>

          </div>


          <button className="enrollecbutton" id="enrollbutton" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </form>
      </center>
    </div></>
  );
};

export default EditEnrolled;