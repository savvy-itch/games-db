import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../features/api/apiSlice';

import Error from '../components/Error';
import Loading from '../components/Loading';
import GameDetailsPara from '../components/GameDetailsPara';
import RatingDisplay from '../components/RatingDisplay';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function PrevArrow(props) {
  const { onClick } = props;
  return (
  <div className="absolute top-0 bottom-0 left-0 flex justify-center items-center p-3 z-20 bg-gradient-to-l from-transparent to-white"
  >
    <BsArrowLeftCircleFill className="w-12 h-12 opacity-70 hover:opacity-100 cursor-pointer" onClick={onClick} />
  </div>)
}

function NextArrow(props) {
  const { onClick } = props;
  return (
  <div className="absolute top-0 bottom-0 right-0 flex justify-center items-center p-3 z-20 bg-gradient-to-r from-transparent to-white"
  >
    <BsArrowRightCircleFill className="w-12 h-12 opacity-70 hover:opacity-100 cursor-pointer" onClick={onClick} />
  </div>)
}

export default function GameDetails() {
  const { id } = useParams();

  const {
    data: game,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetGameDetailsQuery(id);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  if (isError) {
    return <Error error={error.message} />
  } else if (isLoading) {
    return <Loading />
  } else if (isSuccess) {
    const developers = game[0].involved_companies.filter(company => company.developer);
    const publishers = game[0].involved_companies.filter(company => company.publisher);
    return (
      <div className="flex flex-col items-center box-border bg-slate-100 dark:bg-slate-800 transition-colors">
        <div className="md:w-9/12 bg-slate-200 dark:bg-slate-900 p-5 rounded mb-9">
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
              <GameDetailsPara title="Release Date" info={game[0].first_release_date} />
              {developers.length > 0 && <GameDetailsPara title="Developer" info={developers} />}
              {publishers.length > 0 && <GameDetailsPara title="Publisher" info={publishers} />}
              <GameDetailsPara title="Platforms" info={game[0].platforms} />
              <GameDetailsPara title="Genres" info={game[0].genres} />
              <GameDetailsPara title="Themes" info={game[0].themes} />
              <GameDetailsPara title="Game Modes" info={game[0].game_modes} />
              <GameDetailsPara title="Player Perspectives" info={game[0].player_perspectives} />
            </section>
          </div>
          <section>
            <h2 className="dark:text-white text-3xl font-bold mt-10">Screenshots</h2>
            <div className="h-1 bg-sky-400 w-16 mb-5"></div>
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
            <h2 className="dark:text-white text-3xl font-bold mt-10">Similar Games</h2>
            <div className="h-1 bg-emerald-400 w-16 mb-5"></div>
            <Slider {...settings} className="relative h-36 md:h-56">
            {game[0].similar_games.map(game => {
              return (
                <Link to={`/games/${game.id}`} key={game.id} className="overflow-hidden min-h-full">
                  <div className="relative">
                    <div className="hover:brightness-150 hover:contrast-50 transition">
                      <img className="h-36 md:h-56 w-full object-cover" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt={game.name} />
                    </div>
                    <span className="absolute text-center z-10 bottom-0 left-0 right-0 text-white font-bold p-4 bg-gradient-to-b from-transparent to-black drop-shadow-md">{game.name}</span>
                  </div>
                </Link>)
            })}
            </Slider>
          </section>
        </div>
      </div>
    )
  }
}