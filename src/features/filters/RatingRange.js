import React, { useRef, useState } from 'react';
import './RatingRange.css';

const rangeMin = 0;

export default function RatingRange() {
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(100);
  const rangeRef = useRef(null);

  function handleMinRatingChange(e) {
    if (maxRating - minRating < rangeMin) {
      setMinRating(maxRating - rangeMin);
    } else {
      setMinRating(e.target.value);
      rangeRef.current.style.left = (e.target.value / 100) * 100 + "%";
    }
  }

  function handleMaxRatingChange(e) {
    if (maxRating - minRating < rangeMin) {
      setMaxRating(minRating + rangeMin);
    } else {
      setMaxRating(e.target.value);
      rangeRef.current.style.right = (e.target.value / 100) * 100 + "%";
    }
  }

  return (
    <div className="w-8/12">
      <div className="flex my-4">
        <div className="flex flex-col">
          <label htmlFor="min">Minimum Rating</label>
          <input type="number" name="min" value={minRating} onChange={handleMinRatingChange} />    
        </div>
        <div className="flex flex-col">
          <label htmlFor="max">Maximum Rating</label>
          <input type="number" name="max" value={maxRating} onChange={handleMaxRatingChange} />
        </div>
      </div>
      <div className="range-slider">
        <span ref={rangeRef} className="range-selected"></span>
      </div>
      <div className="range-input">
        <input type="range" className="min" min="0" max="100" value={minRating} onChange={handleMinRatingChange} step="1" />
        <input type="range" className="max" min="0" max="100" value={maxRating} onChange={handleMaxRatingChange} step="1" />
      </div>
    </div>
  )
}
