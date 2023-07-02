import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.igdb.com/v4');

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: builder => ({
    // The endpoint is a "query" operation that returns data
    getGames: builder.query({
      query: () => ({
        url: '/games',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'vzpbw45ogroc6uffvsza60f6kd88im',
          'Authorization': 'Bearer uptot43uwwe8mp4c2ze30altqpkzbv',
        },
        body: 'f name, cover.url, genres.name, themes.name, game_modes.name, player_perspectives.name, platforms.name, release_dates.y, total_rating; w total_rating != n & cover != n & parent_game = n & version_parent = n & release_dates.y != n; l 200;'
      }),
    }),
    getSearch: builder.query({
      query: (search) => ({
        url: '/search',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'vzpbw45ogroc6uffvsza60f6kd88im',
          'Authorization': 'Bearer uptot43uwwe8mp4c2ze30altqpkzbv',
        },
        body: `search "${search}"; f game.name, game.cover.url, game.platforms.name, game.release_dates.y, game.total_rating; w game.total_rating != n & game.cover != n & game.parent_game = n & game.version_parent = n & game.release_dates.y != n; l 200;`
      })
    }),
    getGenres: builder.query({
      query: () => ({
        url: '/genres',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'vzpbw45ogroc6uffvsza60f6kd88im',
          'Authorization': 'Bearer uptot43uwwe8mp4c2ze30altqpkzbv',
        },
        body: 'f name; l 50;'
      })
    }),
    getThemes: builder.query({
      query: () => ({
        url: '/themes',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'vzpbw45ogroc6uffvsza60f6kd88im',
          'Authorization': 'Bearer uptot43uwwe8mp4c2ze30altqpkzbv',
        },
        body: 'f name; l 50;'
      })
    }),
    getModes: builder.query({
      query: () => ({
        url: '/game_modes',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'vzpbw45ogroc6uffvsza60f6kd88im',
          'Authorization': 'Bearer uptot43uwwe8mp4c2ze30altqpkzbv',
        },
        body: 'f name; l 20;'
      })
    }),
    getPerspective: builder.query({
      query: () => ({
        url: '/player_perspectives',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'vzpbw45ogroc6uffvsza60f6kd88im',
          'Authorization': 'Bearer uptot43uwwe8mp4c2ze30altqpkzbv',
        },
        body: 'f name; l 20;'
      })
    }),
  })
})

export const { useGetGamesQuery, useLazyGetSearchQuery, useGetGenresQuery, useGetThemesQuery, useGetModesQuery, useGetPerspectiveQuery } = apiSlice;