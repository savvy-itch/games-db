import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useGetGenresQuery, useGetThemesQuery, useGetModesQuery, useGetPerspectiveQuery } from '../api/apiSlice';
import FilterListBtn from './FilterListBtn';
import RatingRange from './RatingRange';

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
  },
]

export default function FilterSection() {
  const [currentFilterTab, setCurrentFilterTab] = useState(FILTERS[0].filterTab);
  const [filtersList, setFiltersList] = useState([]);
  // const filtersState = useSelector(state => state.filters);

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

  const {
    data: modes,
    isLoading: modesLoading,
    isError: modesError,
  } = useGetModesQuery();

  const {
    data: perspective,
    isLoading: perspectiveLoading,
    isError: perspectiveError,
  } = useGetPerspectiveQuery();

  function changeCurrentTab(e) {
    if (e.target.dataset.tab !== currentFilterTab) {
      setCurrentFilterTab(e.target.dataset.tab);
    }
  }

  useEffect(() => {
    if (currentFilterTab === 'Platforms') {
      setFiltersList(
        <div className="flex flex-wrap">
        {FILTERS.find(f => f.filterTab === currentFilterTab).filters.map(f => {
          return <FilterListBtn key={f} filter={f} />
        })}
        </div>)
    } else if (currentFilterTab === 'Years') {
      setFiltersList(
        <div className="flex flex-wrap">
        {FILTERS.find(f => f.filterTab === currentFilterTab).filters.map(f => {
          return <FilterListBtn key={f} filter={f} />
        })}
        </div>)
    } else if (currentFilterTab === 'Genres/Themes') {
      if (genresLoading || themesLoading) {
        setFiltersList(<p>Loading genres...</p>)
      } else if (genresError || themesError) {
        setFiltersList(<p>Error loading: {genresError ? genresError.error : themesError.error}</p>);
      } else {
        setFiltersList(
          <div>
            <h3>Genres</h3>
            <div className="flex flex-wrap">
            {genres.map(genre => {
              return <FilterListBtn key={genre.name} filter={genre.name} />
            })}
            </div>
            <h3>Themes</h3>
            <div className="flex flex-wrap">
            {themes.map(theme => {
              return <FilterListBtn key={theme.name} filter={theme.name} />
            })}
            </div>
          </div>
        )
      }
    } else if (currentFilterTab === 'Modes/Perspective') {
      if (modesLoading || perspectiveLoading) {
        setFiltersList(<p>Loading modes/perspecives...</p>)
      } else if (modesError || perspectiveError) {
        setFiltersList(<p>Error loading: {modesError ? modesError.error : perspectiveError.error}</p>);
      } else {
        setFiltersList(
          <div>
            <h3>Modes</h3>
            <div className="flex flex-wrap">
            {modes.map(mode => {
              return <FilterListBtn key={mode.name} filter={mode.name} />
            })}
            </div>
            <h3>Perspective</h3>
            <div className="flex flex-wrap">
            {perspective.map(perspective => {
              return <FilterListBtn key={perspective.name} filter={perspective.name} />
            })}
            </div>
          </div>
        )
      }
    } else if (currentFilterTab === 'Ratings') {
      setFiltersList(<RatingRange />)
    }
  }, [currentFilterTab, genres, genresError, genresLoading, themes, themesError, modes, modesError, modesLoading, perspective, perspectiveError,perspectiveLoading, themesLoading]);


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
      {filtersList}

      {/* Applied filters */}
      <div>

      </div>
    </section>
  )
}