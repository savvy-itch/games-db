import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RatingRange.css';
import { updateMinRatingFilter, updateMaxRatingFilter } from './filterSlice';

const rangeMin = 0;
const rangeMax = 100;

export default function RatingRange() {
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(100);
  const rangeRef = useRef(null);
  const filtersState = useSelector(state => state.filters);
  const dispatch = useDispatch();

  function handleMinRatingChange(e) {
    if (maxRating - minRating < rangeMin) {
      setMinRating(maxRating - rangeMin);
      dispatch(updateMinRatingFilter({ selectedMinRating: (maxRating - rangeMin) }));
    } else {
      setMinRating(e.target.value);
      rangeRef.current.style.left = (e.target.value / 100) * 100 + "%";
      dispatch(updateMinRatingFilter({ selectedMinRating: e.target.value }));
    }
    // if min rating is too close to max rating
    if (e.target.value >= maxRating - 10) {
      setMinRating(maxRating - 10);
      rangeRef.current.style.left = ((maxRating - 10) / 100) * 100 + "%";
      dispatch(updateMinRatingFilter({ selectedMinRating: (maxRating - 10) }));
    }
    if (e.target.value < rangeMin) {
      setMinRating(rangeMin);
      dispatch(updateMinRatingFilter({ selectedMinRating: '' }));
    }
    // remove AppliedFilterBtn when it's 0
    // eslint-disable-next-line eqeqeq
    if (e.target.value == 0) {
      dispatch(updateMinRatingFilter({ selectedMinRating: '' }));
    }
  }

  function handleMaxRatingChange(e) {
    // if max rating is too close to min rating
    if (e.target.value < parseInt(minRating) + 10) {
      setMaxRating(parseInt(minRating) + 10);
      rangeRef.current.style.right = 100 - ((parseInt(minRating) + 10) / 100) * 100 + "%";
      dispatch(updateMaxRatingFilter({ selectedMaxRating: parseInt(minRating) + 10 }));
    } else {
      setMaxRating(e.target.value);
      rangeRef.current.style.right = 100 - (e.target.value / 100) * 100 + "%";
      dispatch(updateMaxRatingFilter({ selectedMaxRating: e.target.value }));
    }
    if (e.target.value > rangeMax) {
      setMaxRating(rangeMax);
      dispatch(updateMaxRatingFilter({ selectedMaxRating: '' }));
    }
    // remove AppliedFilterBtn when it's 100
    // eslint-disable-next-line eqeqeq
    if (e.target.value == 100) {
      dispatch(updateMaxRatingFilter({ selectedMaxRating: '' }));
    }
  }

  // when AppliedFilterBtn for rating is removed, set the rating to default
  useEffect(() => {
    if (filtersState.selectedMinRating === '') {
      setMinRating(rangeMin);
      rangeRef.current.style.left = "0";
    }
    if (filtersState.selectedMaxRating === '') {
      setMaxRating(rangeMax);
      rangeRef.current.style.right = "0";
    }
  }, [filtersState.selectedMinRating, filtersState.selectedMaxRating]);

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
        <input type="range" min="0" max="100" value={minRating} onChange={handleMinRatingChange} step="1" />
        <input type="range" min="0" max="100" value={maxRating} onChange={handleMaxRatingChange} step="1" />
      </div>
    </div>
  )
}