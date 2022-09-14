import React from "react";
import Banner from "../banner/Banner";
import MovieListCard from "../movie/MovieListCard";
import TrendListCard from "../movie/Trending";
import TvListCard from "../TV/TvListCard";

const Home = () => {
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

      <section className="top-latest">
        <h2 className="text-white ml-5">Trending</h2>
        <TrendListCard></TrendListCard>
      </section>

      <h2 className="p-4 bg-warning text-white">TV Show</h2>
      <section className="Tv-show">
        <h2 className="text-white ml-5">TV Airing Today</h2>
        <TvListCard type="airing_today"></TvListCard>
      </section>

      <section className="Tv-show">
        <h2 className="text-white ml-5">TV on the Air</h2>
        <TvListCard type="on_the_air"></TvListCard>
      </section>

      <section className="Tv-show">
        <h2 className="text-white ml-5">TV Popular</h2>
        <TvListCard type="popular"></TvListCard>
      </section>

      <section className="Tv-show">
        <h2 className="text-white ml-5">TV top rated</h2>
        <TvListCard type="top_rated"></TvListCard>
      </section>
    </>
  );
};

export default Home;
