import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../features/api/apiSlice';

import Error from '../components/Error';
import Loading from '../components/Loading';
import { unixToFullDate } from '../helpers';
import RatingDisplay from '../components/RatingDisplay';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { styled } from 'styled-components';

// add trailers/screenshots carousel;
// add similar games

const SimilarGameCard = styled.div`
  background-image: url("https://images.igdb.com/igdb/image/upload/t_cover_big/${props => props.$cover.image_id}.jpg");
`

export default function GameDetails() {
  const { id } = useParams();

// https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co209j.jpg
// https://images.igdb.com/igdb/image/upload/t_screenshot_big/dtlqztoznyrxbvaj8u0a.jpg

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
    const developers = game[0].involved_companies.filter(company => company.developer);
    const publishers = game[0].involved_companies.filter(company => company.publisher);
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
                <h2 className="dark:text-white text-lg font-bold min-w-[40%]">Release Date</h2>
                <p className="dark:text-white">{unixToFullDate(game[0].first_release_date)}</p>
              </div>
              {developers.length > 0 && <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold min-w-[40%]">Developer</h2>
                <p className="dark:text-white">{developers.map((company, index) => {
                  const comma = index !== developers.length - 1 ? ', ' : '';
                  return company.company.name + comma;
                })}</p>
              </div>}
              {publishers.length > 0 && <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold min-w-[40%]">Publisher</h2>
                <p className="dark:text-white">{publishers.map((company, index) => {
                  const comma = index !== publishers.length - 1 ? ', ' : '';
                  return company.company.name + comma;
                })}</p>
              </div>}
              <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold min-w-[40%]">Platforms</h2>
                <p className="dark:text-white">{game[0].platforms.map((platform, index) => {
                  const comma = index !== game[0].platforms.length - 1 ? ', ' : '';
                  return platform.name + comma;
                })}</p>
              </div>
              <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold min-w-[40%]">Genre</h2>
                <p className="dark:text-white">{game[0].genres.map((genre, index) => {
                  const comma = index !== game[0].genres.length - 1 ? ', ' : '';
                  return genre.name + comma;
                })}</p>
              </div>
              {game[0].themes &&
                <div className="flex items-center my-3">
                  <h2 className="dark:text-white text-lg font-bold min-w-[40%]">Themes</h2>
                  <p className="dark:text-white">{game[0].themes.map((theme, index) => {
                    const comma = index !== game[0].themes.length - 1 ? ', ' : '';
                    return theme.name + comma;
                  })}</p>
                </div>
              }
              <div className="flex items-center my-3">
                <h2 className="dark:text-white text-lg font-bold min-w-[40%]">Game Modes</h2>
                <p className="dark:text-white">{game[0].game_modes.map((mode, index) => {
                  const comma = index !== game[0].game_modes.length - 1 ? ', ' : '';
                  return mode.name + comma;
                })}</p>
              </div>
            </section>
          </div>
          <section>
            <h2 className="dark:text-white text-3xl font-bold mt-10 mb-5">Screenshots</h2>
            <Carousel
              emulateTouch={true}
              useKeyboardArrows={true}
              centerMode={true}
              centerSlidePercentage={80}>
              {game[0].screenshots.map(screenshot => {
              return (
                <div key={screenshot.id}>
                  <img src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`} alt={game[0].name + 'screenshot'} />
                </div>
              )
            })}
            </Carousel>
          </section>
          <section>
            <h2 className="dark:text-white text-3xl font-bold mt-10 mb-5">Similar Games</h2>
            <Carousel
              emulateTouch={true}
              useKeyboardArrows={true}
              // showIndicators={false}
              showStatus={false}
              centerMode={true}
              centerSlidePercentage={20}>
            {game[0].similar_games.map(game => {
              return (
                <Link to={`/games/${game.id}`} key={game.id}>
                  <div>
                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt={game.name} />
                  </div>
                </Link>
              )
            })}
            </Carousel>
          </section>
        </div>
      </div>
    )
  }
}