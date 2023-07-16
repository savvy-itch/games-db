import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGenresQuery, useGetThemesQuery, useGetModesQuery, useGetPerspectiveQuery, useLazyGetFilteredResultsQuery } from '../api/apiSlice';
import { filterGames } from '../games/gamesSlice';
import { setGames, setFetchedGames } from '../games/gamesSlice';
import FilterListBtn from './FilterListBtn';
import RatingRange from './RatingRange';
import AppliedFilterBtn from './AppliedFilterBtn';

const LAST_YEAR = 2025;
const FIRST_YEAR = 1979;
const years = Array.from({ length: LAST_YEAR - FIRST_YEAR }, (_, index) => (LAST_YEAR - index).toString());

const FILTERS = [
  {
    filterTab: 'Platforms',
    fieldNameAPI: 'platforms',
    filters: ['Mac', 'PC (Microsoft Windows)', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox 360', 'Xbox', 'Xbox Series X|S', 'Nintendo Switch', 'Wii U', 'GameCube']
  },
  {
    filterTab: 'Years',
    fieldNameAPI: 'first_release_date',
    filters: years,
  },
  {
    filterTab: 'Genres/Themes',
    fieldNameAPI: ['genres', 'themes']
  },
  {
    filterTab: 'Ratings',
    fieldNameAPI: 'total_rating'
  },
  {
    filterTab: 'Modes/Perspective',
    fieldNameAPI: ['game_modes', 'player_perspectives']
  },
]

export default function FilterSection({ isSearch }) {
  const [currentFilterTab, setCurrentFilterTab] = useState(FILTERS[0].filterTab);
  const [filtersList, setFiltersList] = useState([]);
  const filtersState = useSelector(state => state.filters);
  const dispatch = useDispatch();

  // genre filters query
  const { 
    data: genres,
    isLoading: genresLoading, 
    isError: genresError,
  } = useGetGenresQuery();

  // theme filters query
  const {
    data: themes,
    isLoading: themesLoading,
    isError: themesError,
  } = useGetThemesQuery();

  // mode filters query
  const {
    data: modes,
    isLoading: modesLoading,
    isError: modesError,
  } = useGetModesQuery();

  // perspective filters query
  const {
    data: perspective,
    isLoading: perspectiveLoading,
    isError: perspectiveError,
  } = useGetPerspectiveQuery();

  const [
    trigger, 
    { data: searchResult, 
    }] = useLazyGetFilteredResultsQuery({}, { enabled: false }); // prevent automatic re-fetching

  function changeCurrentTab(e) {
    if (e.target.dataset.tab !== currentFilterTab) {
      setCurrentFilterTab(e.target.dataset.tab);
    }
  }

  useEffect(() => {
    if (currentFilterTab === 'Platforms') {
      const filterObj = FILTERS.find(f => f.filterTab === currentFilterTab);
      setFiltersList(
        <div className="flex flex-wrap">
        {filterObj.filters.map(f => {
          return <FilterListBtn key={f} filterCategory={filterObj.fieldNameAPI} filter={f} />
        })}
        </div>)
    } else if (currentFilterTab === 'Years') {
      const filterObj = FILTERS.find(f => f.filterTab === currentFilterTab);
      setFiltersList(
        <div className="flex flex-wrap">
        {filterObj.filters.map(f => {
          return <FilterListBtn key={f} filterCategory={filterObj.fieldNameAPI} filter={f} />
        })}
        </div>)
    } else if (currentFilterTab === 'Genres/Themes') {
      if (genresLoading || themesLoading) {
        setFiltersList(<p>Loading genres...</p>)
      } else if (genresError || themesError) {
        setFiltersList(<p>Error loading: {genresError ? genresError.error : themesError.error}</p>);
      } else {
        const filterObj = FILTERS.find(f => f.filterTab === currentFilterTab);
        setFiltersList(
          <div>
            <h3 className="dark:text-white">Genres</h3>
            <div className="flex flex-wrap">
            {genres.map(genre => {
              return <FilterListBtn key={genre.name} filterCategory={filterObj.fieldNameAPI[0]} filter={genre.name} />
            })}
            </div>
            <h3 className="dark:text-white">Themes</h3>
            <div className="flex flex-wrap">
            {themes.map(theme => {
              return <FilterListBtn key={theme.name} filterCategory={filterObj.fieldNameAPI[1]} filter={theme.name} />
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
        const filterObj = FILTERS.find(f => f.filterTab === currentFilterTab);
        setFiltersList(
          <div>
            <h3 className="dark:text-white">Modes</h3>
            <div className="flex flex-wrap">
            {modes.map(mode => {
              return <FilterListBtn key={mode.name} filterCategory={filterObj.fieldNameAPI[0]} filter={mode.name} />
            })}
            </div>
            <h3 className="dark:text-white">Perspective</h3>
            <div className="flex flex-wrap">
            {perspective.map(perspective => {
              return <FilterListBtn key={perspective.name} filterCategory={filterObj.fieldNameAPI[1]} filter={perspective.name} />
            })}
            </div>
          </div>
        )
      }
    } else if (currentFilterTab === 'Ratings') {
      const filterObj = FILTERS.find(f => f.filterTab === currentFilterTab);
      setFiltersList(<RatingRange filterCategory={filterObj.fieldNameAPI}  />)
    }
  }, [currentFilterTab, genres, genresError, genresLoading, themes, themesError, modes, modesError, modesLoading, perspective, perspectiveError, perspectiveLoading, themesLoading]);

  useEffect(() => {
    // if search results need to be filtered
    if (isSearch) {
      // filter already fetched games
      dispatch(filterGames({ filters: filtersState.selectedFilters, minRating: filtersState.selectedMinRating, maxRating: filtersState.selectedMaxRating }));
    } else {
      // if default games need to be filtered
      // fetch games with selected filters
      trigger(filtersState);
      if (searchResult) {
        dispatch(setFetchedGames({ fetchedGamesList: searchResult}));
        dispatch(setGames({ gamesList: searchResult}));
      }
    }
  }, [dispatch, filtersState, isSearch, trigger, searchResult]);

  return (
    <section>
      {/* Filter Tabs */}
      <div className="flex md:flex-row flex-col justify-center my-2.5">
        {FILTERS.map((filter, index) => {
          return <button key={filter.filterTab} className={`${filter.filterTab === currentFilterTab 
            ? 'bg-cyan-600/75 hover:bg-cyan-600/75'
            : 'bg-stone-500/75 hover:bg-stone-600/75'} 
            ${index === 0 ? 'md:rounded-l' : ''} ${index === FILTERS.length - 1 ? 'md:rounded-r' : ''}
            flex items-center text-sm text-white px-5 py-4`}
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
      <div className="flex flex-wrap my-5">
        {filtersState.selectedFilters.map(filter => {
          return <AppliedFilterBtn key={filter[1]} filterCategory={filter[0]} filter={filter[1]} />
        })}
        {filtersState.selectedMinRating !== '' && <AppliedFilterBtn minRating={filtersState.selectedMinRating} />}
        {filtersState.selectedMaxRating !== '' && <AppliedFilterBtn maxRating={filtersState.selectedMaxRating} />}
      </div>
    </section>
  )
}