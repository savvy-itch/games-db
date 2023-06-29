import React from 'react'

export default function FilterListBtn({ filter }) {
  return (
    <button className="m-0.5 p-2 rounded border-solid border border-stone-700/75 bg-stone-100/75 text-sm hover:border-stone-700/75 hover:bg-stone-200/75">{filter}</button>
  )
}
