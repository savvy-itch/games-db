import React from 'react'
import { unixToFullDate } from '../helpers'

export default function GameDetailsPara({title, info}) {
  let content;
  if (title === "Release Date") {
    content = unixToFullDate(info);
  } else if (title === "Developer" || title === "Publisher") {
    content = info.map((company, index) => {
      const comma = index !== info.length - 1 ? ', ' : '';
      return company.company.name + comma;
    });
  } else if (title === "Platforms" || title === "Genres" || title === "Themes" || title === "Game Modes" || title === "Player Perspectives") {
    content = info.map((category, index) => {
      const comma = index !== info.length - 1 ? ', ' : '';
      return category.name + comma;
    });
  }

  return (
    <article className="flex items-center my-3">
      <h2 className="dark:text-white text-lg font-bold min-w-[40%]">{title}</h2>
      <p className="dark:text-white">{content}</p>
    </article>
  )
}
