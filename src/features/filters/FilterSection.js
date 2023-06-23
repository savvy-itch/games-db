import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetGenresQuery, useGetThemesQuery } from '../api/apiSlice';

const LAST_YEAR = 2025;
const FIRST_YEAR = 1979;
const years = Array.from({ length: LAST_YEAR - FIRST_YEAR }, (_, index) => LAST_YEAR - index);

const FILTERS = [
  {
    filterTab: 'Platforms',
    filters: ['Mac', 'PC (Microsoft Windows)', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox 360', 'Xbox', 'Xbox Series X|S', 'Nintendo Switch', 'Wii U', 'GameCube']
  },
  {
    filterTab: 'Years',
    filters: years,
  },
  {
    filterTab: 'Genres/Themes',
  },
  {
    filterTab: 'Ratings',
  },
  {
    filterTab: 'Modes/Perspective',
    filters: []
  },
]

export default function FilterSection() {
  const [currentFilterTab, setCurrentFilterTab] = useState(FILTERS[0].filterTab);
  const [filtersList, setFiltersList] = useState([]);
  const filtersState = useSelector(state => state.filters);

  const { 
    data: genres,
    isLoading: genresLoading, 
    isError: genresError,
  } = useGetGenresQuery();

  const {
    data: themes,
    isLoading: themesLoading, 
    isError: themesError,
  } = useGetThemesQuery();

  function changeCurrentTab(e) {
    if (e.target.dataset.tab !== currentFilterTab) {
      setCurrentFilterTab(e.target.dataset.tab);
    }
  }

  useEffect(() => {
    if (currentFilterTab === 'Platforms') {
      setFiltersList(
        <>
        {FILTERS.find(f => f.filterTab === currentFilterTab).filters.map(f => {
          return <button key={f} className="m-0.5 p-2 rounded border-solid border border-stone-700/75 bg-stone-100/75 text-sm hover:border-stone-700/75 hover:bg-stone-200/75">{f}</button>
        })}
        </>)
    } else if (currentFilterTab === 'Years') {
      setFiltersList(
        <>
        {FILTERS.find(f => f.filterTab === currentFilterTab).filters.map(f => {
          return <button key={f} className="m-0.5 p-2 rounded border-solid border border-stone-700/75 bg-stone-100/75 text-sm hover:border-stone-700/75 hover:bg-stone-200/75">{f}</button>
        })}
        </>)
    } else if (currentFilterTab === 'Genres/Themes') {
      if (genresLoading) {
        setFiltersList(<p>Loading genres...</p>)
      } else if (genresError) {
        setFiltersList(<p>Error loading genres: {genresError.message}</p>);
      } else {
        setFiltersList(
          <>

          {genres.map(genre => {
            return <button key={genre.name} className="m-1 p-2 rounded border-solid border border-stone-700/75 bg-stone-100/75 text-sm hover:border-stone-700/75 hover:bg-stone-200/75">{genre.name}</button>
          })}
          </>
        )
      }
    }
  }, [currentFilterTab]);


  return (
    <section>
      {/* Filter Tabs */}
      <div className="flex justify-center">
        {FILTERS.map(filter => {
          return <button key={filter.filterTab} className={`${filter.filterTab === currentFilterTab 
            ? 'bg-cyan-600/75 hover:bg-cyan-600/75'
            : 'bg-stone-500/75 hover:bg-stone-600/75'} flex items-center text-sm text-white px-5 py-4`}
            onClick={changeCurrentTab}
            data-tab={filter.filterTab}
            >
            {filter.filterTab}
            </button>
        })}
      </div>
      
      {/* List of filters */}
      <div className="flex flex-wrap">
        {filtersList}
      </div>

      {/* Applied filters */}
      <div>

      </div>
    </section>
  )
}