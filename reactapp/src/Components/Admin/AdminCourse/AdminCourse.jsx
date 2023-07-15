import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { GrAddCircle } from 'react-icons/gr';
import './adminCourse.css';
import axios from "axios";


function AdminCourse() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get('https://8080-afbbeccfcdaebbaecebadafdecbf.project.examly.io/admin/viewCourse')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        Swal.fire('Error', 'Failed to fetch the courses.', 'error');
      });
  };


  const handleSingleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {

        axios
          .delete(`https://8080-afbbeccfcdaebbaecebadafdecbf.project.examly.io/admin/deleteCourse/${id}`)
          .then((response) => {
            Swal.fire('Deleted!', 'Course has been deleted.', 'success');
            fetchCourses();
          })
          .catch((error) => {
            Swal.fire('Error', 'Failed to delete the course.', 'error');

          });
      }
    });
  };

  const handleDeleteIconClick = (event, courseId) => {
    event.stopPropagation();
    handleSingleDelete(courseId);
  };


  const [selectedCards, setSelectedCards] = useState([]);
  const [selectAll, setSelectAll] = useState([]);


  const handleCardSelect = (courseId) => {
    if (selectedCards.includes(courseId)) {
      setSelectedCards(selectedCards.filter((id) => id !== courseId));
    } else {
      setSelectedCards([...selectedCards, courseId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCards([]);
      setSelectAll(false);
    } else {
      const allcourseIds = courses.map((courseGrid) => courseGrid.courseId);
      setSelectedCards(allcourseIds);
      setSelectAll(true);
    }
  };


  const cardStyle = {
    width: '50rem',
    position: 'static',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    cursor: 'pointer',

  };
  const selectedCardStyle = {
    ...cardStyle,
    backgroundColor: '#c7ddf9',
    position: 'static',
    alignItems: 'center',

  };
  const [isLoading, setIsLoading] = useState(false);


  const handleEditCourse = (courseId) => {
    navigate('/admin/editcourse', { state: { courseId } });
  };

  const handleDeleteSelected = async () => {

    const result = await Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete the selected Courses?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });


    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const deleteRequests = selectedCards.map(id => {
          return axios.delete('https://8080-afbbeccfcdaebbaecebadafdecbf.project.examly.io/admin/deleteCourse/' + id);

        });


        const loadingSwal = Swal.fire({
          title: 'Deletion in progress',
          html: '<div class="spinner"></div><span class="loading-text">Please wait while the course is being deleted...</span>',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });


        await axios.all(deleteRequests);
        setTimeout(() => {
          loadingSwal.close();
          setIsLoading(false);
          setSelectedCards([]);
          Swal.fire('Deleted!', 'Selected courses have been deleted.', 'success');
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        Swal.fire('Error', 'Failed to delete the selected courses.', 'error');
      }
      fetchCourses();
    }
  };


  if (isLoading) {
    return <div>Loading... </div>;
  }


  return (
    <>

      <div className="Acapp-container">
        <div className="ActemplateContainer">
          <div className="AcsearchInput_Container">
            <input
              id="AcsearchInput"
              type="text"
              className="adminCourse-input"
              placeholder="Type here to search Course"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <button id="searchCourse" type="submit">
              Search
            </button>
          </div>
          <div className="Actemplate_Container" >
            <div className="button-container">
              {selectedCards.length > 0 && (
                <div className='mb-3 d-flex justify-content-end align-items-center' >
                  <Button variant='primary' className='ms-3' onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</Button>
                  <Button variant='danger' className='ms-3' onClick={handleDeleteSelected} style={{ marginLeft: '10px' }}>Delete</Button>
                </div>
              )}
            </div>
            {courses
              .filter((courseGrid) => {
                if (searchTerm === "") {
                  return courseGrid;
                } else if (
                  courseGrid?.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return courseGrid;
                } else {
                  return null;
                }
              })
              .map((courseGrid) => {
                return (
                  <div key={courseGrid?.courseId} className="Actemplate" id={`courseGrid${courseGrid?.courseId}`} style={selectedCards.includes(courseGrid?.courseId) ? selectedCardStyle : cardStyle} onClick={() => handleCardSelect(courseGrid?.courseId)}>
                    <div className="Acinfo">
                      <div className="Accourse-info">
                        <div className="first-row">
                          <h6 className="name">
                            <span className="label">Course Name: </span>
                            <span className="value">{courseGrid?.courseName}</span>
                          </h6>
                          <div className="icons">
                            <FontAwesomeIcon
                              id="editCourse"
                              className="Acedit-icon"
                              icon={faEdit}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleEditCourse(courseGrid?.courseId);
                              }}
                            />
                            <FontAwesomeIcon
                              id="deleteCourse"
                              className="Acdelete-icon"
                              icon={faTrashAlt}
                              onClick={(event) => handleDeleteIconClick(event, courseGrid?.courseId)}
                            />
                            {selectedCards.includes(courseGrid?.courseId) && (
                              <strong><span className="Accheckmark-icon">✓</span></strong>
                            )}
                          </div>
                        </div>
                        <h6 className="duration">
                          <span className="label">Course Duration: </span>
                          <span className="value">{courseGrid?.courseDuration} months</span>
                        </h6>
                        <h6 className="timing">
                          <span className="label">Course Available Timings: </span>
                          <span className="value">{courseGrid?.courseTiming}</span>
                        </h6>
                        <h6 className="enrolled">
                          <span className="label">Number of Students: </span>
                          <span className="value">{courseGrid?.numberofStudents}</span>
                        </h6>
                        <h6 className="description">
                          <span className="label">Course Description: </span>
                          <span className="value">{courseGrid?.courseDescription}</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="Add-course">
            <Button
              id="addCourse"
              class="add-course-button"
              type="submit"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(255, 0, 0, 0.1))', position: 'fixed', bottom: '20px', right: '20px'
              }}
              onClick={() => navigate("/admin/addcourse")}
            >
              <GrAddCircle />
              Add Course
            </Button>

          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCourse;