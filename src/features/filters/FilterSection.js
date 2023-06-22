import React from 'react';

const FILTERS = [
  {
    filterTab: 'Platforms',
    filters: ['Mac', 'PC (Microsoft Windows)', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox 360', 'Xbox', 'Xbox Series X|S', 'Nintendo Switch', 'Wii U', 'GameCube']
  },
  {
    filterTab: 'Years',
    filters: []
  },
  {
    filterTab: 'Genres/Themes',
    filters: []
  },
  {
    filterTab: 'Ratings',
    filters: []
  },
  {
    filterTab: 'Modes/Perspective',
    filters: []
  },
]

export default function FilterSection() {
  return (
    <section>
      <div className="flex justify-center">
        {FILTERS.map(filter => {
          return <button className="bg-stone-500/75 border-stone-500/75 flex items-center text-sm text-white px-5 py-4 hover:bg-stone-600/75 hover:border-stone-600/75">
            {filter.filterTab}
            </button>
        })}
      </div>
    </section>
  )
}
