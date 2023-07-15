import React, {useState ,useEffect} from 'react';
import './AdminAcademyEdit.css';
import axios  from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



  const AdmineditAcademy = () => {
  const [academyName, setAcademyName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [imageURL, setImageURL] = useState('');
  const [email, setEmail] = useState('');
  const [academyLocation, setAcademyLocation] = useState('');
  const [academyDescription, setAcademyDescription] = useState('');
  const [errors, setErrors] = useState({});
 
  const {id1} = useParams(); 
  const navigate = useNavigate();

useEffect (() => {
  handleEdit(id1) ;
}, [id1]);
  
  const validateForm = () => {
    const newErrors = {};

    if (!academyName.trim()) {
      newErrors.academyName = 'Academy name is required';
    }else if(!/^[a-zA-Z\s]+$/.test(academyName)){
      newErrors.academyName = 'only enter Alphabets ';
    }

    const phoneRegex = /^\d{10}$/;
    if (!contactNumber.trim()) {
      newErrors.contactNumber = 'ContactNumber is required';
    }else if (!phoneRegex.test(contactNumber)) {
      newErrors.contactNumber = 'Invalid contact number';
    }
  
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!imageURL.trim()) {
      newErrors.imageURL = 'Image URL is required';
    }else if (!urlRegex.test(imageURL)) {
      newErrors.imageURL = 'Invalid image URL';
    }

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[com]{3,}$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!academyLocation.trim()) {
      newErrors.academyLocation = 'Location is required';
    }else if(!/^[a-zA-Z\s]+$/.test(academyLocation)){
      newErrors.academyLocation = 'only enter Alphabets ';
    }
    
    if (!academyDescription.trim()) {
      newErrors.academyDescription = 'Description is required';
    } else if (academyDescription.trim().length < 15) {
      newErrors.academyDescription = 'Description must contain atleast 15 characters';
    } else if (academyDescription.trim().length > 100) {
      newErrors.academyDescription= 'Description cannot exceed 100 characters';
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    

    if (validateForm()) {
      
      const data = {
        instituteId:id1,
        instituteName:academyName ,
        instituteDescription:academyDescription ,
        instituteAddress: academyLocation,
        mobile: contactNumber,
        email: email,
        imageUrl:imageURL       
  }
    axios.put('https://8080-fadaceeecdbbaecebadafdecbf.project.examly.io/admin/editInstitute/'+id1,data)
    .then(response => {
      if(response.data==="academy Edited")
      alert('academy edited');
      console.log('Form submitted successfully!');
      Swal.fire({
        icon: 'success',
        title: 'Academy Edited',
        text: 'The Academy has been Edited successfully.',
      });
      navigate('/admin/adminacademy');
    })
    } else {
      console.log('Form contains errors. Please fix them.');
     }
    
  };
  const handleEdit = (id1) => {
    axios.get('https://8080-fadaceeecdbbaecebadafdecbf.project.examly.io/admin/viewinstitutebyId/'+id1)
      .then((result) => {
        setAcademyName(result.data.instituteName);
        setContactNumber(result.data.mobile);
        setImageURL(result.data.imageUrl);
        setEmail(result.data.email);
        setAcademyLocation(result.data.instituteAddress);
        setAcademyDescription(result.data.instituteDescription);       
      })
      .catch((error) => {
      });
    }

  return (
    <><div>

      <center>
        <form className='AdminAcreg1' >
          <h4 style={{ fontFamily: '-moz-initial', padding: '15px' }}>Edit Academy</h4>

          <div className='edit-admin-form-container'>

            <div className="AdminAcdemo">
              <strong><label for="AcademyName" style={{ marginRight: "190px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Academy Name : </label></strong>
              <input type="text" id="editAcademyName" value={academyName} placeholder="Enter Academy Name" size="40"
                onChange={(e) => setAcademyName(e.target.value)} />
            </div>
            <div className='error'>{errors.academyName && <span>{errors.academyName}</span>}</div>


            <div className='AdminAcdemo'>
              <strong><label for="ImageUrl" style={{ marginRight: "160px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Academy ImageUrl :</label></strong>
              <input type='url' id="editImageUrl" value={imageURL} placeholder="Enter the academy Image url" size="40"
                onChange={(e) => setImageURL(e.target.value)} />
            </div>
            <div className='error'>{errors.imageURL && <span>{errors.imageURL}</span>}</div>



            <div className='AdminAcdemo'>
              <strong><label for="AcademyLocation" style={{ marginRight: "160px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Academy Location :</label></strong>
              <input type='loc' id="editAcademyLocation" value={academyLocation} placeholder="Enter Academy Location" size="40"
                onChange={(e) => setAcademyLocation(e.target.value)} />
            </div>
            <div className='error'>{errors.academyLocation && <span>{errors.academyLocation}</span>}</div>



            <div className='AdminAcdemo'>
              <strong><label for="ContactNumber" style={{ marginRight: "180px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Contact Number : </label></strong>
              <input type='tel' id="editContactNumber" value={contactNumber} placeholder="Enter the contact number" size="40"
                onChange={(e) => setContactNumber(e.target.value)} />
            </div>
            <div className='error'>{errors.contactNumber && <span>{errors.contactNumber}</span>}</div>

            <div className='AdminAcdemo'>
              <strong><label for="AcademyEmail" style={{ marginRight: "190px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Academy Email : </label></strong>
              <input type='text1' id="editEmailId" value={email} placeholder="Enter the academy email" size="40"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='error'>{errors.email && <span>{errors.email}</span>}</div>



            <div className='AdminAcdemo'>   <strong><label for="AcademyDescription" style={{ marginRight: "180px", paddingRight: '35px', color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Description :</label></strong>
              <textarea type='text2' id="editAcademyDescription" value={academyDescription} placeholder="Enter academy description" size="40"
                onChange={(e) => setAcademyDescription(e.target.value)} />
            </div>
            <div className='error'>{errors.academyDescription && <span>{errors.academyDescription}</span>}</div>
          </div>

          <button className='btn btn-primary' id="UpdateAcademy" onClick={handleUpdate}>Update Academy</button>
        </form></center>
    </div></> 
  );
};

export default AdmineditAcademy;