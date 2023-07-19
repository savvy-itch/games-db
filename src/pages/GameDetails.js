import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../features/api/apiSlice';

export default function GameDetails() {
  const { id } = useParams();

  const {
    data: game,
    isError
  } = useGetGameDetailsQuery();

  return (
    <div>
      {id}
    </div>
  )
}
