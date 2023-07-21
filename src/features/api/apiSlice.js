import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { yearToUnix } from '../../helpers';

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.igdb.com/v4');
const HEADERS = {
  'Accept': 'application/json',
  'Client-ID': 'vzpbw45ogroc6uffvsza60f6kd88im',
  'Authorization': 'Bearer uptot43uwwe8mp4c2ze30altqpkzbv',
}

const START_YEAR = 1993;

function buildFiltersBody(filter) {
  let filtersBody = ''; 
  if (filter[0] === 'platforms' || filter[0] === 'genres' || filter[0] === 'themes' || filter[0] === 'game_modes' || filter[0] === 'player_perspectives') {
    filtersBody = `& ${filter[0]}.name = "${filter[1]}" `;
  } else if (filter[0] === 'first_release_date') {
    filtersBody = `& ${filter[0]} > ${yearToUnix(filter[1], 'start')} & ${filter[0]} < ${yearToUnix(filter[1], 'end')}`;
  }
  return filtersBody;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: builder => ({
    // The endpoint is a "query" operation that returns data
    getGames: builder.query({
      query: () => ({
        url: '/games',
        method: 'POST',
        headers: HEADERS,
        body: `f name, cover.url, genres.name, themes.name, game_modes.name, player_perspectives.name, platforms.name, first_release_date, total_rating; 
          w total_rating != n & cover != n & themes != n & parent_game = n & version_parent = n & first_release_date != n & first_release_date > ${yearToUnix(START_YEAR, "start")}; 
          l 200;`
      }),
    }),
    getSearch: builder.query({
      query: (search) => ({
        url: '/search',
        method: 'POST',
        headers: HEADERS,
        body: `search "${search}"; f game.name, game.cover.url, game.platforms.name, game.first_release_date, game.total_rating; 
          w game.total_rating != n & game.cover != n & game.parent_game = n & game.version_parent = n & game.first_release_date != n; l 200;`
      })
    }),
    getGenres: builder.query({
      query: () => ({
        url: '/genres',
        method: 'POST',
        headers: HEADERS,
        body: 'f name; l 50;'
      })
    }),
    getThemes: builder.query({
      query: () => ({
        url: '/themes',
        method: 'POST',
        headers: HEADERS,
        body: 'f name; l 50;'
      })
    }),
    getModes: builder.query({
      query: () => ({
        url: '/game_modes',
        method: 'POST',
        headers: HEADERS,
        body: 'f name; l 20;'
      })
    }),
    getPerspective: builder.query({
      query: () => ({
        url: '/player_perspectives',
        method: 'POST',
        headers: HEADERS,
        body: 'f name; l 20;'
      })
    }),
    // create conditional body for different filters
    getFilteredResults: builder.query({
      query: (filters) => ({
        url: '/games',
        method: 'POST',
        headers: HEADERS,
        body: `f name, cover.url, platforms.name, first_release_date, total_rating; w total_rating != n & cover != n & parent_game = n & version_parent = n & first_release_date != n 
        ${filters.selectedFilters.map(filter => {return `${buildFiltersBody(filter)}`}).join('')}
        ${filters.selectedMinRating > 0
        ? `& total_rating > ${filters.selectedMinRating}`
        : ''}
        ${filters.selectedMaxRating > 0
        ? `& total_rating < ${filters.selectedMaxRating}`
        : ''}
        ; l 200;`
      })
    }),
    getGameDetails: builder.query({
      query: (gameId) => ({
        url: '/games',
        method: 'POST',
        headers: HEADERS,
        body: `f name, cover.url, cover.image_id, first_release_date, total_rating, genres.name, platforms.name, summary, themes.name, involved_companies.company.name, game_modes.name; w id = ${gameId};`
      })
    })
  })
})

export const { useGetGamesQuery, useLazyGetSearchQuery, useGetGenresQuery, useGetThemesQuery, useGetModesQuery, useGetPerspectiveQuery, useLazyGetFilteredResultsQuery, useGetGameDetailsQuery } = apiSlice;