import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useLazyGetSearchDropdownQuery } from '../api/apiSlice';
import { unixToDate } from '../../helpers';
import { Link } from 'react-router-dom';
import Error from '../../components/Error';

export default function SearchForm({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);

  const [
    trigger, {
    data,
    isLoading,
    isError,
    error
  }] = useLazyGetSearchDropdownQuery({}, { enabled: false })

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);

    trigger(e.target.value);
  }

  useEffect(() => {
    if (data && searchInput) {
      setResults(data);
    } else {
      setResults([]);
    }
  }, [data, searchInput])

  function handleSearchSubmit(e) {
    e.preventDefault();
    // only submit if search field isn't empty
    if (searchInput) {
      onSubmit(searchInput);
      setSearchInput('');
    }
  }

  let dropdownContent;
  if (isLoading) {
    dropdownContent = <div className="bg-white flex justify-center p-3 w-64">
      <span className="dropdown-loader block"></span>
    </div>
  } else if (isError) {
    return <Error error={error.message} />
  } else {
    dropdownContent = results.map(result => {
      return (
        <Link to={`/games/${result.game.id}`} key={result.id}>
          <div className="bg-white p-3 border-t-2 border-slate-300 flex items-center hover:bg-slate-200 transition">
            <img className="inline-block w-10" src={result.game.cover.url} alt={result.game.name} />
            <p className="text-xs ml-2">{result.game.name} ({unixToDate(result.game.first_release_date)})</p>
          </div>
        </Link>)
    });
  }

  return (
    <section className="relative">
      <form autoComplete="off" className="flex">
        <div>
          <input 
            className="rounded-l-md w-56 border-l-2 border-t-2 border-b-2 border-stone-400 transition-colors px-2 py-1 outline-none focus:border-sky-500/75" 
            type="text" name="queries" placeholder="search"
            value={searchInput} 
            onChange={handleSearchInputChange} />
        </div>
        <button className="rounded-r-md bg-sky-500/75 text-white font-bold px-3 py-1 transition-colors flex items-center hover:bg-sky-600/75" 
          onClick={handleSearchSubmit}
        >
          <FaSearch />
        </button>
      </form>
      <div className="absolute top-full overflow-hidden rounded">
        {dropdownContent}
      </div>
    </section>
  )
}