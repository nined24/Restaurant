import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Feedback.css';

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/customer/feedback', {
        orderId: id,
        rating,
        comment,
      });

      toast.success('Thank you for your feedback!');
      navigate('/menu');
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <header className="feedback-header">
        <h1>Feedback</h1>
      </header>

      <div className="feedback-content">
        <div className="feedback-card">
          <h2>How was your experience?</h2>
          <p>We'd love to hear from you!</p>

          <form onSubmit={handleSubmit}>
            <div className="rating-section">
              <label>Rating</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${star <= rating ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <p className="rating-text">{rating} out of 5 stars</p>
            </div>

            <div className="comment-section">
              <label htmlFor="comment">Comments (optional)</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                rows="5"
                className="comment-input"
              />
            </div>

            <div className="feedback-actions">
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="btn-secondary"
              >
                Skip
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

