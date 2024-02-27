import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Book() {
  let { id } = useParams();
  const [bookobject, setBookObject] = useState({});
  const [review, setReview] = useState([]);
  const [newReview, setNewReview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/Books/byId/${id}`)
      .then((response) => {
        setBookObject(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
      });

    axios.get(`http://localhost:3001/reviews/${id}`)
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]); // Depend on id for fetching book and reviews

  const addReview = () => {
    axios.post("http://localhost:3001/reviews", { reviewstext: newReview, BookId: id })
      .then((response) => {
        console.log("Review added");
        // Update the reviews state after adding a new review
        setReview([...review, response.data]); // Assuming response.data contains the newly added review
        setNewReview(""); // Clear the input field after adding the review
      })
      .catch((error) => {
        console.error('Error adding review:', error);
      });
  }
    const goToHome = () => {
    navigate('/Home'); // Navigate to the Home page
  }

  return (
    
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={goToHome}>Go to Home</button> {/* Button to navigate to Home */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title font-weight-bold text-dark fs-2">{bookobject.title}</h5>
              <br />
              <p className="card-text"><span className="font-weight-bold text-primary fs-5">Author:</span> {bookobject.author}</p>
              <p className="card-text"><span className="font-weight-bold text-primary fs-5">Subject:</span> {bookobject.subject}</p>
              <p className="card-text"><span className="font-weight-bold text-primary fs-5">Genre:</span> {bookobject.genre}</p>
              <p className="card-text"><span className="font-weight-bold text-primary fs-5">Publish Date:</span> {bookobject.publishdate}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title font-weight-bold text-dark fs-2">Reviews</h5>
              <br />
              <div className='inputreview'>
                <textarea type="textfield" placeholder='Write your review...' autoComplete="off" required className='w-100' value={newReview} onChange={(event) => { setNewReview(event.target.value) }} />
                <br />
                <button type="submit" className='btn btn-primary' onClick={addReview}>Add Review</button>
              </div>
              <div className='listofreviews '>
                {review.map((reviewItem, key) => (
                  <div className='border m-2 p-3' key={key}>{reviewItem.reviewstext}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
