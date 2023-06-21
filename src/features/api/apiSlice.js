import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.igdb.com/v4');

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getGames: builder.query({
      query: () => ({
        url: '/games',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'vzpbw45ogroc6uffvsza60f6kd88im',
          'Authorization': 'Bearer uptot43uwwe8mp4c2ze30altqpkzbv',
        },
        body: 'f name, cover.url, platforms.name, release_dates.y, total_rating; w total_rating != n & cover != n & parent_game = n & version_parent = n & release_dates.y != n; l 200;'
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
    })
  })
})

export const { useGetGamesQuery, useLazyGetSearchQuery } = apiSlice;