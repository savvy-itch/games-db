import React from 'react';
import { unixToDate } from '../../helpers';
import { Link } from 'react-router-dom';

export default function GameCard({ game }) {
  return (
    <Link to={`/games/${game.id}`} className="flex">
      <div className="flex items-center rounded-lg dark:bg-slate-700 p-2 shadow-xl hover:shadow-slate-700/50 transition-shadow cursor-pointer w-full">
        <div className="w-20">
          <img className="max-w-full rounded" src={game.cover.url} alt={game.name} />
        </div>
        <div className="ml-2 w-3/4">
          <p className="text-lg font-bold dark:text-white">{game.name}</p>
          <p className="dark:text-white">Rating: {Math.round(game.total_rating)}/100</p>
          <p className="text-sm dark:text-gray-400">
            {game.platforms.map((platform, index) => {
              let name = '';
              name += platform.name;
              if (index < game.platforms.length - 1) {
                name += '/';
              }
              return name;
            })}
          </p>
          <p className="dark:text-white">{unixToDate(game.first_release_date)}</p>
        </div>
      </div>
    </Link>
  )
}