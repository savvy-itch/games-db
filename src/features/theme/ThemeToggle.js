import React from 'react';
import "./ThemeToggle.css";
import { MdNightlightRound, MdSunny } from 'react-icons/md';

const htmlTag = document.querySelector('html');

export default function ThemeToggle() {
  function handleToggle() {
    // if (localStorage.theme === 'dark') {
    //   htmlTag.classList.add('dark');
    //   localStorage.setItem("theme", "dark");
    // } else {
    //   htmlTag.classList.remove('dark');
    //   localStorage.setItem("theme", "light");
    // }
  }

  return (
    <label className="switch">
      <input type="checkbox" onClick={handleToggle} />
      <span className="slider round">
        <div className="toggle-icons">
          <MdSunny />
          <MdNightlightRound />
        </div>
      </span>
    </label>
  )
}
