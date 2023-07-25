import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../features/api/apiSlice';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { unixToFullDate } from '../helpers';
import RatingDisplay from '../components/RatingDisplay';

export default function GameDetails() {
  const { id } = useParams();

// https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co209j.jpg
// involved_companies.company.name, involved_companies.developer, involved_companies.publisher

  const {
    data: game,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetGameDetailsQuery(id);

  if (isError) {
    return <Error error={error.message} />
  } else if (isLoading) {
    return <Loading />
  } else if (isSuccess) {
    return (
      <div className="flex flex-col items-center box-border bg-slate-100 dark:bg-slate-800 transition-colors">
        <div className="md:w-9/12 bg-slate-200 dark:bg-slate-900 p-5 rounded">
          <div className="flex justify-between">
            <div className="w-2/5">
              <img className="rounded" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game[0].cover.image_id}.jpg`} alt={game[0].name} />
            </div>
            <section className="w-3/5">
              <h1 className="dark:text-white font-bold text-3xl mb-5">{game[0].name}</h1>
              <RatingDisplay rating={game[0].total_rating} />
              <div>
                <h2 className="dark:text-white text-xl font-bold my-2">About</h2>
                <p className="dark:text-white">{game[0].summary}</p>
              </div>
              <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold mr-5">Release Date</h2>
                <p className="dark:text-white">{unixToFullDate(game[0].first_release_date)}</p>
              </div>
              <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold mr-5">Platforms</h2>
                <p className="dark:text-white">{game[0].platforms.map((platform, index) => {
                  const comma = index !== game[0].platforms.length - 1 ? ', ' : '';
                  return platform.name + comma;
                })}</p>
              </div>
              <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold mr-5">Genre</h2>
                <p className="dark:text-white">{game[0].genres.map((genre, index) => {
                  const comma = index !== game[0].genres.length - 1 ? ', ' : '';
                  return genre.name + comma;
                })}</p>
              </div>
              {game[0].themes &&
                <div className="flex items-center my-3">
                  <h2 className="dark:text-white text-lg font-bold mr-5">Themes</h2>
                  <p className="dark:text-white">{game[0].themes.map((theme, index) => {
                    const comma = index !== game[0].themes.length - 1 ? ', ' : '';
                    return theme.name + comma;
                  })}</p>
                </div>
              }
              <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold mr-5">Game Modes</h2>
                <p className="dark:text-white">{game[0].game_modes.map((mode, index) => {
                  const comma = index !== game[0].game_modes.length - 1 ? ', ' : '';
                  return mode.name + comma;
                })}</p>
              </div>
            </section>
          </div>  
        </div>
      </div>
    )
  }
}