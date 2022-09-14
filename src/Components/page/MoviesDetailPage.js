import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import MovieCard from "../movie/MovieCard";

import { fetcher, tmdbApi } from "../Config";
import useSWR from "swr";

const StyledDetailMovies = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .detail-top {
    width: 100%;
    height: 800px;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
  }
  .detail-box {
    width: 800px;
    height: 600px;
    transform: translateY(-50%);

    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 12px;
    }
  }
  .detail-bottom {
    padding: 0px 200px;
    color: white;
    width: 100%;
    transform: translateY(-250px);
    text-align: center;
  }
`;
const MoviesDetailPage = () => {
  const { moviesId } = useParams();

  const apiDetails = tmdbApi.getMovieDetail(moviesId);

  const { data } = useSWR(apiDetails, fetcher);
  if (!data) return null;
  const { backdrop_path, overview, title, genres } = data;

  return (
    <>
      <StyledDetailMovies>
        <div
          className="detail-top"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
        <div className="detail-box">
          <img src={tmdbApi.imageOriginal(backdrop_path)} alt="" />
        </div>
        <div className="detail-bottom">
          <div className="overview">
            <h2>{title}</h2>
            {genres &&
              genres.map((item) => (
                <botton
                  key={item.id}
                  className="btn btn-outline-danger mr-4 mt-3 mb-3"
                >
                  {item.name}
                </botton>
              ))}
            <p>{overview}</p>
          </div>
          <div className="castle"></div>
        </div>
      </StyledDetailMovies>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSemilar></MovieSemilar>
    </>
  );
};

const StyledMovieCredits = styled.div`
  margin-bottom: 50px;
  .cast-heading {
    text-align: center;
    margin-bottom: 30px;
  }
  .cast-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px 20px;
    padding: 10px 30px;
    img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
      margin-bottom: 10px;
      border-radius: 12px;
    }
  }
`;
function MovieCredits() {
  const { moviesId } = useParams();
  const apiDetails = tmdbApi.getMovieMeta(moviesId, "credits");
  const { data } = useSWR(apiDetails, fetcher);

  if (!data) return null;
  const movieCredit = data;
  const { cast } = movieCredit;

  return (
    <>
      <StyledMovieCredits>
        <h2 className="cast-heading">Casts</h2>
        <div className="cast-list">
          {cast &&
            cast.slice(0, 5).map((item) => (
              <div className="cast-item" key={item.id}>
                <img src={tmdbApi.imageOriginal(item.profile_path)} alt="" />
                <h5 className="cast-name text-center">{item.name}</h5>
              </div>
            ))}
        </div>
      </StyledMovieCredits>
    </>
  );
}
const StyledMovieVideos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 44px;
  margin-bottom: 70px;
`;
function MovieVideos() {
  const { moviesId } = useParams();
  const apiDetails = tmdbApi.getMovieMeta(moviesId, "videos");
  const { data } = useSWR(apiDetails, fetcher);

  if (!data) return null;
  console.log("data-video", data);
  const { results } = data;

  return (
    <>
      <StyledMovieVideos className="videos">
        {results.slice(0, 4).map((item) => (
          <div className="videos-item w-100 mb-4 ">
            <h3 className="p-3 text-white bg-info d-inline-block mb-3">
              {item.name}
            </h3>
            <iframe
              className="w-100"
              width="727"
              height="409"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="After Every Happy | September 7 & 8"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        ))}
      </StyledMovieVideos>
    </>
  );
}

const StyledNowPlay = styled.div`
  color: white;
  padding: 0 32px;
  margin-bottom: 50px;
  .similar-heading {
    margin-left: 10px;
  }
  .now-list {
    .swiper-slide {
      width: 300px;
    }
  }
`;
function MovieSemilar() {
  const { moviesId } = useParams();
  const apiDetails = tmdbApi.getMovieMeta(moviesId, "similar");
  const { data } = useSWR(apiDetails, fetcher);

  if (!data) return null;
  const { results } = data;

  return (
    <>
      <StyledNowPlay>
        <h2 className="similar-heading">Similar movies</h2>
        <div className="now-list">
          <Swiper grabCursor={true} spaceBetween={25} slidesPerView={"auto"}>
            {results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </StyledNowPlay>
    </>
  );
}
export default MoviesDetailPage;
