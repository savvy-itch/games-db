import React from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeFilter } from './filterSlice';

export default function AppliedFilterBtn({ filter }) {
  const dispatch = useDispatch();

  return (
    <button className="m-0.5 p-2 rounded text-sm bg-indigo-700 text-white flex items-center"
      onClick={() => dispatch(removeFilter({selectedFilter: filter}))}
    >
      {filter}
      <IoClose className="font-bold ml-2 h-5 w-5" />
    </button>
  )
}
