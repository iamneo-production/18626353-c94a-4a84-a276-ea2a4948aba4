import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare, faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import './AdminAcademyHome.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { faStar as regularEmptyStar } from '@fortawesome/free-regular-svg-icons';

function Rate({ averageRating }) {
  const fullStars = Math.floor(averageRating);
  const decimalPart = averageRating - fullStars;
  const emptyStars = 5 - Math.ceil(averageRating);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={solidStar} className="star filled" />);
  }

  if (decimalPart >= 0.75) {
    stars.push(<FontAwesomeIcon key={fullStars} icon={solidStar} className="star filled" />);
  } else if (decimalPart >= 0.25 && decimalPart < 0.75) {
    stars.push(<FontAwesomeIcon key={fullStars} icon={halfStar} className="star half-filled" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon key={fullStars + 1 + i} icon={regularEmptyStar} className="star empty" />);
  }

  return <div className="star-rating">{stars}</div>;
}



function AdminAcademyhome() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://8080-addebfabbbaecebadafdecbf.project.examly.io/admin/viewInstitutes').then((res) => {
      setData(res.data);
    }).catch((err) => {
      alert(err);
    })
  })

  const handleDelete = (id) => {
    //Delete Theme Api
    axios.delete('https://8080-addebfabbbaecebadafdecbf.project.examly.io/admin/deleteInstitute/' + id)
      .then(response => {
        if (response.data === "Academy Deleted")
          Swal.fire({
            icon: 'success',
            title: 'Academy Deleted',
            text: 'The Academy has been Deleted successfully.',
          });


      })
      .catch(error => console.log(error));
  };

  const [selectedCards, setSelectedCards] = useState([]);
  const [selectAll, setSelectAll] = useState([]);
  const handleCardSelect = (instituteId) => {
    if (selectedCards.includes(instituteId)) {
      setSelectedCards(selectedCards.filter((id) => id !== instituteId));
    } else {
      setSelectedCards([...selectedCards, instituteId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCards([]);
      setSelectAll(false);
    } else {
      const allinstituteIds = data.map((item) => item.instituteId);
      setSelectedCards(allinstituteIds);
      setSelectAll(true);
    }
  };

  const handlecourse = (instituteId) => {
    navigate(`/admin/admincourse2`, { state: { instituteId } });
  }

  const cardStyle = {
    width: '19rem',
    position: 'static',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '450px',
    cursor: 'pointer'
  };
  const selectedCardStyle = {
    ...cardStyle,
    backgroundColor: '#c7ddf9',
    position: 'static',
    display: 'flex',
    alignItems: 'center',
  };

  const handleDeleteSelected = async () => {

    const result = await Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete the selected Boxing Academy?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });


    if (result.isConfirmed) {
      try {
        const deleteRequests = selectedCards.map(id => {
          return axios.delete('https://8080-addebfabbbaecebadafdecbf.project.examly.io/admin/deleteInstitute/' + id);
        });

        await axios.all(deleteRequests);
        setSelectedCards([]);
        toast.warning("Selected Boxing Academy deleted");
      } catch (error) {
        toast.error("Failed to delete selected boxing academy");
      }
    }
  };


  return (
    <>

      <div className="admin-page">
        <br></br>
        <div className="Acapp-container1">
          <div className="ActemplateContainer1">
            <div className="AcsearchInput_Container1">
              <input
                id="AcsearchInput1"
                type="text"
                className="adminCourse-input"
                placeholder="Type here to search Academy"
                onChange={(event) => {
                  setSearchKeyword(event.target.value);
                }}
              />
              <button id="searchAcademy" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <Container className='mt-3'>
          <div className='button-select'>
            {selectedCards.length > 0 && (
              <div className='mb-3 d-flex justify-content-end align-items-center' >
                <Button variant='primary' className='ms-3' onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</Button>
                <Button variant='danger' className='ms-3' onClick={handleDeleteSelected} style={{ marginLeft: '10px' }}>Delete</Button>
              </div>
            )}
          </div>
          <Row xs={1} sm={1} md={3} lg={3} xl={3}>
            {
              data.filter((item) => {
                if (searchKeyword === "") {
                  return true;
                }
                const lowerCaseSearchKeyword = searchKeyword.toLowerCase();
                const lowerCaseInstituteName = item.instituteName.toLowerCase();
                return lowerCaseInstituteName.includes(lowerCaseSearchKeyword);
              })
                .map(item => (
                  <Col xs={12} sm={6} md={4} key={item.instituteId}>
                    <Card id={`adminAcademyGrid${item.instituteId}`} className="mb-4" style={selectedCards.includes(item.instituteId) ? selectedCardStyle : cardStyle}
                      onClick={() => handleCardSelect(item.instituteId)} >


                      <Card.Img
                        onClick={() =>
                          handlecourse(item.instituteId)}
                        variant="top"
                        src={item.imageUrl}
                        onError={e => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                        }}
                      />
                      <Card.Body className="d-flex flex-column" >

                        <Card.Title><h4>{item.instituteName}</h4></Card.Title>

                        <div className="d-flex justify-content-between mb-3">
                          <div className="text-start">
                            <Card.Text>
                              <strong>
                                <em> <h5>place: {item.instituteAddress}</h5> </em>
                              </strong>
                            </Card.Text>
                            <br></br>
                          </div>
                        </div>
                        <div>
                          <Rate averageRating={parseFloat(item.averageRating)} />
                          <br></br>
                        </div>
                        <div>
                          <div style={{ display: 'grid', gridTemplateColumns: '0.2fr 0.2fr' }}>
                            <FontAwesomeIcon icon={faPenToSquare} className="edit-icon fa-lg" onClick={(e) => { e.stopPropagation(); navigate(`/admin/editacademy/${item.instituteId}`) }} style={{ color: 'white' }} />
                            <FontAwesomeIcon icon={faTrashAlt} id="deleteAcademy"
                              className="edit-icon  fa-lg"
                              onClick={(e) => { e.stopPropagation(); handleDelete(item.instituteId) }} />
                            {selectedCards.includes(item.instituteId) && (
                              <strong> <span className="Academycheckmark-icon">✓</span></strong>

                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
          </Row>
        </Container>

        <Button onClick={() => navigate("/admin/addacademy")} id="AddAcademy" className='adminadd'>
          ADD ACADEMY
        </Button>


      </div>

    </>
  );
}
export default AdminAcademyhome;