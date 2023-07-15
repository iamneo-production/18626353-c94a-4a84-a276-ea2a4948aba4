import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './UserEnrolled.css';
import { Card, Form, Col } from 'react-bootstrap';


function EnrolledCourse() {
  const navigate = useNavigate();
  const [admission, setAdmission] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    getUserIdAndFetchAdmission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserIdAndFetchAdmission = () => {
    const email = localStorage.getItem('email');
    if (!email) {
      return;
    }

    axios.get(`https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/user/${encodeURIComponent(email)}`)
      .then((response) => {
        const userId = response.data.userId;
        if (userId) {
          getAdmissionData(userId); // Fetch admission data using the user ID
        }
      })
      .catch((error) => {

      });
  };

  const getAdmissionData = (userId) => {
    axios.get(`https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/user/ViewAdmissionby?userId=${(userId)}`)
      .then((result) => {
        // Log the data received from the API
        setAdmission(result.data);

      })
      .catch((error) => {
      });
  }


  const handleEditCourse = (admissionId) => {
    navigate(`/user/editenrolled`, { state: { admissionId } });
  };


  const confirmDelete = (admissionId) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCourse(admissionId, result.value); 
      }
    });
  }
  const handleDeleteCourse = (admissionId, result) => {
    if (result) { // Check if result is true or not
      axios
        .delete(`https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/user/deleteAdmission/${encodeURIComponent(admissionId)}`)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Admission Deleted',
            text: 'The Admission has been Deleted successfully.',
          }).then(() => {
            navigate('/user/enrolledcourse');
            window.location.reload();
          });
        })
        .catch((error) => {
          Swal.fire('Error!', 'An error occurred while deleting the course.', 'error');
        });
    }
  };
  




  const filteredAdmission = admission.filter((val) => {
    if (searchTerm === "" || val.courseName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
    return null;
  });

  return (
    <>
      <div className="templateContainerec">
        <div className="searchInput_Containerec">
          <br />
          <Col sm={12} className="d-flex justify-content-center">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Type here to search course"
                className="me-2"
                aria-label="Search"
                style={{ width: '500px' }}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Button id="searchButton" className="btn btn-success">
                Search
              </Button>
            </Form>
          </Col>
          <br />
        </div>
        <div className="template_Containerec">
          {filteredAdmission.map((val) => {
            return (
              <div className="eccontainer" key={val.admissionId}>
                <Card className="cardec">
                  <Card.Body>
                    <div className="course-details">
                      <div className="hhh">
                        <Card.Text>
                          <strong>Course Name:</strong> {val.courseName}
                          <br />
                          <strong>Date of Joining:</strong> {val.dateofJoining}
                          <br />
                          <strong>End Date:</strong> {val.endDate}
                          <br />
                          <br></br>
                          <a href={`/user/coursepages/${val.courseName}/${val.userId}/${val.courseId}`}>
                            <Button variant="primary" className="button-spacing">My learning</Button>
                          </a>
                          <FontAwesomeIcon
                            className="edit-icon icon-spacing"
                            icon={faEdit}
                            onClick={() => handleEditCourse(val.admissionId)}
                          />

                          <FontAwesomeIcon
                            className="delete-icon icon-spacing"
                            icon={faTrashAlt}
                            onClick={() => confirmDelete(val.admissionId)}
                          />
                        </Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default EnrolledCourse;