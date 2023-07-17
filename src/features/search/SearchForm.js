import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

export default function SearchForm({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    // only submit if search field isn't empty
    if (searchInput) {
      onSubmit(searchInput);
    }
  }

  return (
    <form className="flex">
      <input className="rounded-l-md border-l-2 border-t-2 border-b-2 border-stone-400 transition-colors px-2 py-1 outline-none focus:border-sky-500/75" type="text" 
        value={searchInput} 
        onChange={handleSearchInputChange} 
        onSubmit={handleSearchSubmit}
        placeholder="search" />
      <button className="rounded-r-md bg-sky-500/75 text-white font-bold px-3 py-1 transition-colors flex items-center hover:bg-sky-600/75" 
        onClick={handleSearchSubmit}
      >
        <FaSearch />
      </button>
    </form>
  )
}