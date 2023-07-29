import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RatingRange.css';
import { updateMinRatingFilter, updateMaxRatingFilter } from './filterSlice';

// BUGS
// when games with set rating have been fetched, they're not sorted properly

const rangeMin = 0;
const rangeMax = 100;

export default function RatingRange() {
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(100);
  const [isMinValid, setIsMinValid] = useState(true);
  const [isMaxValid, setIsMaxValid] = useState(true);
  const [isRatingDisabled, setIsRatingDisabled] = useState(false);
  const rangeRef = useRef(null);
  const filtersState = useSelector(state => state.filters);
  const dispatch = useDispatch();

  function handleMinRatingChange(e) {
    const intValue = parseInt(e.target.value);
    // if min rating is too close to max rating
    if (intValue > maxRating - 10) {
      setMinRating(maxRating - 10);
      rangeRef.current.style.left = ((maxRating - 10) / 100) * 100 + "%";
    } else if (intValue <= rangeMin) {
      setMinRating(rangeMin);
    } else {
      setMinRating(intValue);
      rangeRef.current.style.left = (intValue / 100) * 100 + "%";
    }
  }

  function handleMaxRatingChange(e) {
    const intValue = parseInt(e.target.value);
    // if max rating is too close to min rating
    if (intValue < parseInt(minRating) + 10) {
      setMaxRating(parseInt(minRating) + 10);
      rangeRef.current.style.right = 100 - ((parseInt(minRating) + 10) / 100) * 100 + "%";
    } else if (intValue >= rangeMax) {
      setMaxRating(rangeMax);
    } else {
      setMaxRating(intValue);
      rangeRef.current.style.right = 100 - (intValue / 100) * 100 + "%";
    }
  }

  function handleMinRatingInputChange(e) {
    // numeric values starting with 0 that aren't just 0, e.g. "01"
    const zeroes = /^(?=.*\b00)[0-9]*$/;
    // if input includes non-numeric characters OR 0 at the beginning OR no value OR greater than max rating - 10 
    if (/\D/.test(e.target.value) || zeroes.test(e.target.value) 
      || e.target.value === '' || e.target.value > maxRating - 10) {
      setIsMinValid(false);
      setMinRating(e.target.value);
    } else {
      setIsMinValid(true);
      const intValue = parseInt(e.target.value);
      if (intValue >= rangeMax || intValue <= rangeMin) {
        setMinRating(rangeMin);
        rangeRef.current.style.left = "0";
      } else {
        setMinRating(intValue);
        rangeRef.current.style.left = (intValue / 100) * 100 + "%";
      }
    }
  }

  function handleMaxRatingInputChange(e) {
    // non-numeric values or numbers starting with 0
    const zeroes = /^(?=.*\b0)[0-9]*$/;
    // if input includes non-numeric characters OR 0 at the beginning OR no value OR less than min rating + 10 
    if (/\D/.test(e.target.value) || zeroes.test(e.target.value) 
      || e.target.value === '' || e.target.value < minRating + 10) {
      setIsMaxValid(false);
      setMaxRating(e.target.value);
    } else {
      setIsMaxValid(true);
      const intValue = parseInt(e.target.value);
      if (intValue >= rangeMax) {
        setMaxRating(rangeMax);
        rangeRef.current.style.right = "0";
      } else {
        setMaxRating(intValue);
        rangeRef.current.style.right = 100 - (intValue / 100) * 100 + "%";
      }
    }
  }

  function updateRatings() {
    dispatch(updateMaxRatingFilter({ selectedMaxRating: maxRating }));
    dispatch(updateMinRatingFilter({ selectedMinRating: minRating }));
  }

  // disable the button for invalid rating values
  useEffect(() => {
    if (!isMaxValid || !isMinValid) {
      setIsRatingDisabled(true);
    } else {
      setIsRatingDisabled(false);
    }
  }, [isMaxValid, isMinValid]);

  useEffect(() => {
    if (filtersState.selectedMinRating !== minRating) {
      setMinRating(filtersState.selectedMinRating);
    }
    if (filtersState.selectedMaxRating !== maxRating) {
      setMaxRating(filtersState.selectedMaxRating);
    }
  }, [filtersState.selectedMinRating, filtersState.selectedMaxRating])

  return (
    <div className="md:w-8/12">
      <div className="flex my-4 justify-between items-center">
        <div className="flex flex-col">
          <label htmlFor="min" className="dark:text-white">Minimum Rating</label>
          <input className={`p-1 my-2 w-4/12 sm:w-auto border-solid border-2 rounded ${isMinValid ? 'border-slate-600' : 'border-red-600'}`} type="text" name="min" 
            value={minRating} 
            onChange={handleMinRatingInputChange} />    
        </div>
        <div className="flex flex-col">
          <label htmlFor="max" className="dark:text-white">Maximum Rating</label>
          <input className={`p-1 my-2 w-4/12 sm:w-auto border-solid border-2 rounded ${isMaxValid ? 'border-slate-600' : 'border-red-600'}`} type="text" name="max" 
            value={maxRating} 
            onChange={handleMaxRatingInputChange} />
        </div>
        <button className={`p-3 rounded bg-slate-100 ${isRatingDisabled ? 'text-gray-500': ''}`} onClick={updateRatings} disabled={isRatingDisabled}>OK</button>
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