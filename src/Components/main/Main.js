import React from "react";
import Banner from "../banner/Banner";
import MovieListCard from "../movie/MovieListCard";

const Main = () => {
  return (
    <>
      <Banner></Banner>

      <section className="now-play">
        <h2 className="text-white ml-5">Now Playing</h2>
        <MovieListCard type="now_playing"></MovieListCard>
      </section>

      <section className="top-rated">
        <h2 className="text-white ml-5">Top Rated Movie</h2>
        <MovieListCard type="top_rated"></MovieListCard>
      </section>

      <section className="top-latest">
        <h2 className="text-white ml-5">Popular</h2>
        <MovieListCard type="popular"></MovieListCard>
      </section>
    </>
  );
};

export default Main;
