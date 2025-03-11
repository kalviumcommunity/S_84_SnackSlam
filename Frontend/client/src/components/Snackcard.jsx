// SnackCard.jsx
import React from 'react';
import './Snackcard.css';

const SnackCard = ({ name, rating, image }) => {
  return (
    <div className="snack-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Rating: {rating}/10</p>
    </div>
  );
};

export default SnackCard;
