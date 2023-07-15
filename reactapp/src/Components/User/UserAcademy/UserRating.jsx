import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularEmptyStar } from '@fortawesome/free-regular-svg-icons';

import { Modal } from 'react-bootstrap';
import Alert from '@mui/material/Alert';

import './UserRating.css';

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

const Rating = () => {
  const location = useLocation();
  const instituteId = location.state?.instituteId;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    getuserId();

    const timer = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [instituteId, showSuccessAlert]);

  const getuserId = () => {
    const email = localStorage.getItem('email');

    if (!email) {
      return;
    }

    axios
      .get(`https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/${encodeURIComponent(email)}`)
      .then((response) => {
        setUserId(response.data.userId);
      })
      .catch((error) => { });
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/GetRatingsForInstitute/${instituteId}`);
      setReviews(response.data);
    } catch (error) { }
  };
  fetchReviews();

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleMouseEnter = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleSubmit = async () => {
    const existingReview = reviews.find((review) => review.userId === userId);
    if (existingReview) {
      setShowAlert(true);
      setRating(0);
      setComment('');
      return;
    }
    const review = {
      userId: userId,
      rating: rating,
      comments: comment,
      date: new Date().toISOString(),
      instituteId: instituteId,
    };

    try {
      await axios.post('https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/RateInstitute', review);
      setRating(0);
      setComment('');
      setShowSuccessAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='bvc'>
        {showSuccessAlert && (
          <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
            Review submitted successfully!
          </Alert>
        )}
      </div>
      <div className="rating-page-container">
        <div className="rating-container">
          {[...Array(5)].map((_, index) => {
            const starNumber = index + 1;
            return (
              <span
                key={starNumber}
                className={`star ${starNumber <= (hoverRating || rating) ? 'filled' : ''} ${starNumber <= rating ? 'gold' : ''
                  }`}
                onClick={() => setRating(starNumber)}
                onMouseEnter={() => handleMouseEnter(starNumber)}
                onMouseLeave={handleMouseLeave}
              >
                <i className="fas fa-star"></i>
              </span>
            );
          })}
        </div>
        <div className="review-container">
          <textarea
            className="comment-box"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your review...."
          ></textarea>
          <Button className="submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
      <div className='naviii'>
        <div className="reviews-container">
          <h3>
            <center>All Reviews</center>
          </h3>
          {reviews.map((review) => (
            <div key={review.ratingId} className="review">
              <div className='reviewusername'>
                {review.username}
                <span className='reviewdate'>{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <Rate averageRating={parseFloat(review.rating)} />
              <div className='reviewcomment'>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
      <Modal show={showAlert} onHide={() => setShowAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rating Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have already submitted a rating for this institute.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Rating;