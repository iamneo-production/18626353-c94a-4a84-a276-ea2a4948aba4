import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useLocation,useNavigate } from 'react-router-dom';
import './AdminCourseEdit.css';
import Swal from 'sweetalert2';

const AdminCourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState({
    courseId: location.state.courseId, 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://8080-abbaedcbbaecebadafdecbf.project.examly.io/admin/viewcoursebyCourseId/${course.courseId}`);
        setCourse(response.data);
        setSelectedInstituteId(response.data.instituteId);
        setIsLoading(false);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch the course details.', 'error');
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id, course.courseId]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get("https://8080-abbaedcbbaecebadafdecbf.project.examly.io/admin/viewonlyInstitutes");
        setInstitutes(response.data);
        
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch institutes.', 'error');
       
      }
    };

    fetchInstitutes();
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    const updatedCourse = {
      courseId: course.courseId,
      courseName: course.courseName,
      courseDuration: course.courseDuration,
      courseTiming: course.courseTiming,
      courseDescription: course.courseDescription,
      numberofStudents: course.numberofStudents,
      instituteId: selectedInstituteId,
      
    };

    try {
       await axios.put(`https://8080-abbaedcbbaecebadafdecbf.project.examly.io/admin/editCourse/${course.courseId}`, updatedCourse);
      setUpdateSuccess(true);
      Swal.fire({
        icon: 'success',
        title: 'Course Updated',
        text: 'The course has been updated successfully.',
      });
      navigate('/admin/admincourse')
    } catch (error) {
      setUpdateError('Failed to update the course.');

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the course.',
      });
    }

    setIsUpdating(false);
  };

  const validateForm = () => {
    const errors = {};

    if (!course.courseName.trim()) {
      errors.courseName = 'Course Name is required';
    }
    else if(!/^[a-zA-Z&\s]+$/.test(course.courseName)){
      errors.courseName = 'Please enter Valid Course Name ';
    }

    if (!course.courseDuration) {
      errors.courseDuration = 'Course Duration is required';
    } 
    else if(!/^[0-9\s]+$/.test(course.courseDuration)){
      errors.courseDuration = 'Please enter Valid Course Duartion ';
    }

    if (!course.courseTiming.trim()) {
      errors.courseTiming = 'Course Timing is required';
    }
    else if(!/^[a-zA-Z0-9\s]+$/.test(course.courseTiming)){
      errors.courseTiming = 'Please enter Valid Course Timing ';
    }
    if (!course.numberofStudents) { 
      errors.courseEnrolled = 'No. of students required';
    }
     else if(!/^[0-9\s]+$/.test(course.numberofStudents)){
      errors.courseEnrolled = 'Please enter correct number of students enrolled for the course ';
    }
    if (!course.courseDescription.trim()) {
      errors.courseDescription = 'Course Description is required';
    }
    else if (course.courseDescription.trim().length < 10) {
      errors.courseDescription= 'Description should not be less than 10 characters';
    }
    else if (course.courseDescription.trim().length > 300) {
      errors.courseDescription= 'Description cannot exceed 300 characters';
    }
  
    if (!selectedInstituteId) {
      errors.instituteSelect = 'Please select an institute';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleUpdate();
    } else {
      Swal.fire('Error', 'Form contains errors.Please fix them.', 'error');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div>
      <center>
      <form className='updatereg1' onSubmit={handleSubmit}>
        <h1 className='updatereg2'>Edit Course</h1>
        {updateError && <div>{updateError}</div>}
        {updateSuccess && <div>Course updated successfully.</div>}
        <div className='updateform-container'> 

        <div className='Acdemo1'>
          <label style={{marginTop:"30px",marginRight:"220px",color:"black"}}><strong>Course Name:</strong></label>
          <input
            type="text"
            id="editCourseName"
            value={course.courseName}
            onChange={(e) => setCourse({ ...course, courseName: e.target.value })}
          />
          {errors.courseName && <div className='error'>{errors.courseName}</div>}
        </div>
        <div className='Acdemo1'>
          <label style={{ marginRight: "200px", color: "black" }}><strong>Course Enrolled: </strong></label>
          <input
            type="number"
            id="editCourseEnrolled"
            value={course.numberofStudents} 
            onChange={(e) => setCourse({ ...course, numberofStudents: e.target.value })} 
          />
           {errors.courseEnrolled && <div className="error">{errors.courseEnrolled}</div>}
        </div>
        <div className='Acdemo1'>
          <label style={{marginRight:"140px",color:"black"}}><strong>Course Duration in months:</strong></label>
          <input
            type="number"
            id="editCourseDuration"
            value={course.courseDuration}
            onChange={(e) => setCourse({ ...course, courseDuration: e.target.value })}
          />
          {errors.courseDuration && <div className='error'>{errors.courseDuration}</div>}
        </div>

        <div className='Acdemo1'>
          <label style={{marginRight:"210px",color:"black"}}><strong>Course Timing:</strong></label>
          <input
            type="text"
            id="editCourseTiming"
            value={course.courseTiming}
            onChange={(e) => setCourse({ ...course, courseTiming: e.target.value })}
          />
          {errors.courseTiming && <div className='error'>{errors.courseTiming}</div>}
        </div>

        <div className='Acdemo1'>
          <label style={{marginRight:"180px",color:"black"}}><strong>Course Description:</strong></label>
          <textarea
          id="editCourseDescription"
            value={course.courseDescription}
            onChange={(e) => setCourse({ ...course, courseDescription: e.target.value })}
          />
          {errors.courseDescription && <div className="error">{errors.courseDescription}</div>}
        </div>

        <div className="Acdemo1">
          <strong> <label htmlFor="instituteSelect" style={{ marginRight: "210px", color: "black" }}>Select Institute :</label></strong>
          <select
            id="instituteSelect"
            value={selectedInstituteId}
            onChange={(e) => setSelectedInstituteId(e.target.value)} style={{ width: '350px', height: '35px', borderRadius: '8px', marginLeft: '80px', marginRight: '80px', textAlignLast: 'center' }}
          >
            <option value="" disabled selected>
              Select one institute
            </option>
            {institutes.map((institute) => (
              <option key={institute.instituteId} value={institute.instituteId}>
                {institute.instituteName}
              </option>
            ))}
          </select>
          {errors.instituteSelect && <div className='error'>{errors.instituteSelect}</div>}
        </div>
        </div>
        <button className="Acupdatebtn1" id="updateCourse" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Course'}
        </button>
      </form>
      </center>
    </div>
    </>
  );
};

export default AdminCourseEdit;