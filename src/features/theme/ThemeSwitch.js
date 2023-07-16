import React, {useState} from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from './useDarkSide';

export default function ThemeSwitch() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  }

  return (
    <div className="flex justify-center items-center p-1 ml-3 rounded-lg border-solid border-2 border-stone-500 dark:border-white">
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} />
    </div>
  )
}
