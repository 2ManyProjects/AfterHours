import Image from 'next/image'
import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePath from '../pages/Home/Home.js';
import Header from '../components/Header/Header.js';
import { Box, Grid, } from "../lib/mui.js";

let images = [
  "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/05/08/20/19/pomegranate-3383814_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/11/06/23/31/breakfast-1804457_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/04/02/04/14/bell-peppers-1302126_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/12/06/18/27/cheese-1887233_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/11/23/18/31/pasta-1854245_960_720.jpg"
];


export default function Home() {
  return (
    <div>
      <Header />
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"> 
        </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box className="z-10 items-center font-mono text-sm">
        
                <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20"> 
                    <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
                  </div> 
                  <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
                    Bloom and Blight Dinner
                  </h1>
                  <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
                    Heres a little 2 sentence ddescription of the upcoming event
                  </p>
                  <a
                    className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy Ticket - $45
                  </a>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {images.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <img
                      alt="Event photograph"
                      className="rounded-lg brightness-90 transition group-hover:brightness-110"
                      src={item}
                      loading="lazy"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"> 
        </div>

      </main>
    </div>
  )
}
