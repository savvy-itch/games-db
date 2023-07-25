import React from 'react';
import { keyframes, styled } from 'styled-components';

function describeRating(rating) {
  if (rating <= 20) {
    return "Awful";
  } else if (rating > 20 && rating <= 50) {
    return "Bad";
  } else if (rating > 50 && rating <= 70) {
    return "Average";
  } else if (rating > 70 && rating <= 89) {
    return "Good";
  } else {
    return "Great";
  }
}

function setRatingColor(rating) {
  if (rating <= 20) {
    return "#dc791b";
  } else if (rating > 20 && rating <= 50) {
    return "#a48c00";
  } else if (rating > 50 && rating <= 70) {
    return "#669e01";
  } else if (rating > 70 && rating <= 89) {
    return "#41af10";
  } else {
    return "#10af65";
  }
}

const progress = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(${props => props.angle}deg);
  }`

const MaskFull = styled.div`
  width: 112px;
  height: 112px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0px, 112px, 112px, 56px);
  animation: ${progress} ease-in-out 3s;
  transform: rotate(${props => props.angle}deg);`;
const MaskHalf = styled.div`
  width: 112px;
  height: 112px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0px, 112px, 112px, 56px);`;
const CircleFill = styled.div`
  width: 112px;
  height: 112px;
  position: absolute;
  border-radius: 50%;
  animation: ${progress} ease-in-out 3s;
  transform: rotate(${props => props.angle}deg);
  clip: rect(0px, 56px, 112px, 0px);
  background-color: ${props => props.color};
  animation: ${progress} ease-in-out 3s;
  transform: rotate(${props => props.angle}deg);`

export default function RatingDisplay({ rating }) {
  const angle = (360/100) * Math.round(rating) / 2;

  return (
    <div className="w-28 h-28 bg-white rounded-full border-solid border-2 border-slate-300 flex justify-center items-center">
      <div className="flex justify-center items-center">
        <MaskFull angle={angle}>
          <CircleFill angle={angle} color={setRatingColor(Math.round(rating))} />
        </MaskFull>
        <MaskHalf>
          <CircleFill angle={angle} color={setRatingColor(Math.round(rating))} />
        </MaskHalf>
        <div className="w-24 h-24 absolute rounded-full bg-slate-100 z-50 flex flex-col justify-center items-center">
          <p className="text-4xl font-semibold">{Math.round(rating)}</p>
          <p className="text-lg" style={{color: `${setRatingColor(Math.round(rating))}`}}>{describeRating(Math.round(rating))}</p>
        </div>
      </div>
    </div>
  )
}