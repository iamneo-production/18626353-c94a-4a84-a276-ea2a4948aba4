import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './UserCourse.css';

import { Card, Form, Col } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';

function UserCourse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedCard, setSearchedCard] = useState(null);
  const [courseData, setCourseData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const {instituteId} = location.state;
      const response = await axios.get(
        `https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/admin/viewinstcoursebyId/${instituteId}`
      ); 
      setCourseData(response.data);
      console.log(response.data);
    } catch (error) {
  
    }
  };

  const handleCardClick = (courseId) => {
    const {instituteId} = location.state;
    const vdata = {instituteId:instituteId,courseId:courseId}
    navigate(`/user/userform`,{state:{vdata}});
  };

  const handleSearch = () => {
    if (searchTerm.length === 0 || !courseData.length) {
      setSearchedCard(null);
      return;
    }

    const filteredCard = courseData.find((card) => {
      const title = card.courseName || ""; 
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchedCard(filteredCard || null);
    setSearchTerm("");
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSearchedCard(null);
  };

  const renderSuggestions = () => {
    if (searchTerm.length === 0 || !courseData.length) {
      return null;
    }

    const filteredSuggestions = courseData.filter((card) => {
      const title = card.courseName || ""; 
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion) => (
          <li key={suggestion.courseId} onClick={() => handleSuggestionClick(suggestion.courseName)}>
            {suggestion.courseName}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>

      <div className="usercourse">
        <div className="templateContainer">
          <div className="searchInput_Container">
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
                <Button id="searchButton" className="btn btn-success" onClick={handleSearch}>
                  Search
                </Button>
              </Form>
            </Col>
            {renderSuggestions()}
            <br />
          </div>
        </div>
        {searchedCard && (
         

          <div className="container1">
            <Card className="card1">
              <Card.Body className="amp">
                <div className="Container" style={{padding:'2px'}}>
                  <div className="aaa">
                    <Card.Text>
                      Course name: {searchedCard.courseName}
                      <br />
                      Course Duration: {searchedCard.courseDuration}
                      <br />
                      Course Availability timings: {searchedCard.courseTiming}
                    </Card.Text>
                  </div>
                  <div className="bbbb">
                    <Card.Text>
                      Course Description: {searchedCard.courseDescription}
                    </Card.Text>
                  </div>
                </div>
                <Button variant="primary" className="rjy" onClick={() => handleCardClick(searchedCard.courseId)}>Enroll Course</Button>
              </Card.Body>
            </Card>
          </div>
        )}
        {!searchedCard && (
          <div className="container1">
            {courseData.map((card) => (
              <Card key={card.courseId} className="card1">
                <Card.Body className="amp">
                  <div className="Container">
                    <div className="aaa">
                      <Card.Text>
                        <strong>
                        Course name:</strong> {card.courseName}
                        <br />
                        <strong>Course Duration:</strong> {card.courseDuration}
                        <br />
                        <strong>Course Availability timings:</strong> {card.courseTiming}
                        <br></br>
                        <strong>Course Description:</strong>{card.courseDescription}
                      </Card.Text>
                      </div>
                  </div>
                  <Button variant="primary" className="rjy" onClick={() => handleCardClick(card.courseId)}>Enroll Course</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserCourse;