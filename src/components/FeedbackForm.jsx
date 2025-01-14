import React, { useContext, useEffect, useState } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

const FeedbackForm = () => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    useEffect(() => {
        if (feedbackEdit.edit) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]);
    

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        
        if (newText === ''){
            setBtnDisabled(true);
            setMessage(null);
        } else if (newText !== '' && newText.trim().length <= 10) {
            setMessage('Text must be at least 10 characters long');
            setBtnDisabled(true);
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            };
            if (feedbackEdit.edit) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
            } else {
                addFeedback(newFeedback);
            }
            setText('');
        }
    };

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)} />
            <div className="input-group">
                <input type="text" placeholder="Write a review" value={text} onChange={handleTextChange} />
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className="message">{message}</div> }
        </form>
    </Card>
  );
};

export default FeedbackForm;
