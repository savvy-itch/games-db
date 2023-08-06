import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsSearch } from '../games/gamesSlice';
import { useLazyGetSearchDropdownQuery } from '../api/apiSlice';
import { Link, useNavigate } from 'react-router-dom';

import Error from '../../components/Error';
import { FaSearch } from "react-icons/fa";
import { unixToDate } from '../../helpers';

export default function SearchForm({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [currentField, setCurrentField] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const dropdownRef = useRef();

  const [
    trigger, {
    data,
    isLoading,
    isError,
    error
  }] = useLazyGetSearchDropdownQuery({}, { enabled: false }) // prevent automatic re-fetching

  function handleSearchInputChange(e) {
    // if the input is selected
    if (currentField === null) {
      // perform the query
      setSearchInput(e.target.value);
      trigger(e.target.value);
    }
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
      dispatch(setIsSearch({ isSearch: true }));
    }
  }

  function handleDropdownLinkClick() {
    setSearchInput('');
    setCurrentField(null);
    dispatch(setIsSearch({ isSearch: false }));
  }

  function navigateDropdown(e) {
    if (searchInput) {
      if (e.key === "ArrowUp") {
        // if search input is selected, do nothing
        if (currentField <= 0) {
          setCurrentField(null)
        } else {
          // move up to the prev game
          setCurrentField(currentField - 1);
        }
      } else if (e.key === "ArrowDown") {
        // if search input is selected
        if (currentField === null) {
          // move down to the first game
          setCurrentField(0)
        } else if (currentField < dropdownContent.length - 1) {
        // move down to the next game
          setCurrentField(currentField + 1);
        } else {
        // if it's the last game, do nothing
          setCurrentField(dropdownContent.length - 1);
        }
      } else if (e.key === "Enter") {
        // go to selected page
        navigate(`/games/${results[currentField].game.id}`);
        setSearchInput('');
        setCurrentField(null);
        dispatch(setIsSearch({ isSearch: true }));
      }
    }
  }

  function closeDropdown(e) {
    if (!dropdownRef.current.contains(e.target)) {
      setResults([]);
      setCurrentField(null);
    }
  }

  useEffect(() => {
    if (results.length > 0) {
      window.addEventListener('click', closeDropdown);
    } else {
      window.removeEventListener('click', closeDropdown);
    }
  }, [results]);

  let dropdownContent;
  if (isLoading) {
    dropdownContent = <div className="bg-white flex justify-center p-3 w-64">
      <span className="dropdown-loader block"></span>
    </div>
  } else if (isError) {
    return <Error error={error.message} />
  } else {
    dropdownContent = results.map((result, index) => {
      return (
        <Link to={`/games/${result.game.id}`} key={result.id} onClick={handleDropdownLinkClick}>
          <div className={`${currentField === index ? "bg-slate-200" : "bg-white"} p-3 border-t-2 border-slate-300 flex items-center hover:bg-slate-200 transition`}>
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
            className={`${currentField !== null ? "bg-slate-200 cursor-none" : 'cursor-text'} rounded-l-md w-56 border-l-2 border-t-2 border-b-2 border-stone-400 transition-colors px-2 py-1 outline-none focus:border-sky-500/75`} 
            type="text" name="queries" placeholder="search"
            value={searchInput} 
            onChange={handleSearchInputChange}
            onKeyDown={navigateDropdown}
            ref={inputRef}
            />
        </div>
        <button className="rounded-r-md bg-sky-500/75 text-white font-bold px-3 py-1 transition-colors flex items-center hover:bg-sky-600/75" 
          onClick={handleSearchSubmit}
        >
          <FaSearch />
        </button>
      </form>
      <div className="absolute top-full overflow-hidden rounded" ref={dropdownRef}>
        {dropdownContent}
      </div>
    </section>
  )
}