import { useEffect, useState } from "react";
import "./Review.css";
import ReviewItem from "./ReviewItem";
import propTypes from "prop-types";
import { message } from "antd";

const Review = ({ active, singleProduct ,setSingleProduct}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleRatingChange = (e, newRating) => {
    e.preventDefault();
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      reviews: [
        ...singleProduct.reviews,
        {
          text: review,
          rating: parseInt(rating),
          user: user.id || user._id,
        },
      ],
    };
    try {
      const res = await fetch(`${apiUrl}/api/products/${singleProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setSingleProduct(data)
        message.success("Added Review");
        setRating(0);
        setReview("");
      }
    } catch (error) {
      console.log(error);
      message.error("Not Added Review");
    }
  };

  const [users, setUsers] = useState([]);
  useEffect(()=>{
    const fetchUsers = async () => {
      
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        const data = await response.json();
  
        if (response.ok) 
          setUsers(data);
        
      } catch (error) {
        console.log(error);
      }
      
    }; 
    fetchUsers()
    
  },[apiUrl])


  const thisReview = []

  singleProduct.reviews.forEach((review) => {
    const matchingUsers = users?.filter((user)=> user._id === review.user)
    matchingUsers.forEach((matchingUser)=>{
      thisReview.push(({
        review : review,
        user:matchingUser
      }))
    })
  });

  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>
            {singleProduct.reviews.length} reviews for Basic Colored Sweatpants
            With Elastic Hems
          </h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((item, index) => (
                <ReviewItem key={index} item={item} reviewItem={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>There are any comments</h3>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <form className="comment-form" onSubmit={handleSubmit}>
          <p className="comment-notes">
            Your email address will not be published. Required fields are marked
            <span className="required">*</span>
          </p>
          <div className="comment-form-rating">
            <label>
              Your rating
              <span className="required">*</span>
            </label>
            <div className="stars">
              <a
                href="#"
                className={`star ${rating === 1 && "active"}`}
                onClick={(e) => handleRatingChange(e, 1)}
              >
                <i className="bi bi-star-fill"></i>
              </a>
              <a
                href="#"
                className={`star ${rating === 2 && "active"}`}
                onClick={(e) => handleRatingChange(e, 2)}
              >
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </a>
              <a
                href="#"
                className={`star ${rating === 3 && "active"}`}
                onClick={(e) => handleRatingChange(e, 3)}
              >
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </a>
              <a
                href="#"
                className={`star ${rating === 4 && "active"}`}
                onClick={(e) => handleRatingChange(e, 4)}
              >
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </a>
              <a
                href="#"
                className={`star ${rating === 5 && "active"}`}
                onClick={(e) => handleRatingChange(e, 5)}
              >
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </a>
            </div>
          </div>
          <div className="comment-form-comment form-comment">
            <label htmlFor="comment">
              Your review
              <span className="required">*</span>
            </label>
            <textarea
              id="comment"
              cols="50"
              rows="10"
              onChange={(e) => setReview(e.target.value)}
              value={review}
            ></textarea>
          </div>

          <div className="form-submit">
            <input type="submit" className="btn submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;

Review.propTypes = {
  active: propTypes.string,
  singleProduct: propTypes.object,
  setSingleProduct : propTypes.func
};
