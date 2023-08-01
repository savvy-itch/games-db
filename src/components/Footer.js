import React from 'react';
import { FaGithub, FaTwitter, FaTelegram } from "react-icons/fa6";

export default function Footer() {
  return (
    <section className="text-center box-border bg-stone-300 dark:bg-stone-900 border-t-2 dark:border-t-slate-300 border-t-slate-900 py-4 px-8 transition-colors">
      <div className="flex justify-between items-center">
        <p className="dark:text-white text-left w-1/4"><span className="font-bold">Games Vault</span> is a website including all the necessary information on your favourite video games</p>
        <div className="flex justify-end my-5">
          <a className="mx-4 text-3xl dark:text-white hover:text-orange-600 dark:hover:text-orange-600 transition-colors" href="https://github.com/spr0neInBlazer">
            <FaGithub />
          </a>
          <a className="mx-4 text-3xl dark:text-white hover:text-orange-600 dark:hover:text-orange-600 transition-colors" href="https://twitter.com/spronetunes">
            <FaTwitter />
          </a>
          <a className="mx-4 text-3xl dark:text-white hover:text-orange-600 dark:hover:text-orange-600 transition-colors" href="https://t.me/sprone13">
            <FaTelegram />
          </a>
        </div>
      </div>
      <p className="dark:text-white text-sm">Made by Mykhailo Savych using {' '} 
        <a className="font-bold hover:underline hover:underline-offset-2 text-orange-600 transition" 
          href="https://api-docs.igdb.com/#getting-started" target='_blank' rel='noopener noreferrer'
          >
            IGDB API
          </a>
      </p>
    </section>
  )
}
