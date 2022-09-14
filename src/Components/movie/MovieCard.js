import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { fetcher, tmdbApi } from "../Config";

const StyleMovieCard = styled.div`
  padding: 10px;
  border-radius: 12px;
  background-color: rgb(43, 43, 43);
  height: 440px;
  margin-bottom: 50px;

  img {
    max-width: 100%;
    height: 240px;
    border-radius: 12px;
    object-fit: cover;
    display: block;
    margin-bottom: 20px;
  }
  .now-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    cursor: default;
    .start {
      width: 26px;
      height: 18px;
      color: red;
    }
  }
  .discription {
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const MovieCard = ({ item }) => {
  const Navigate = useNavigate();
  const { backdrop_path, title, vote_average, release_date, id } = item;
  return (
    <StyleMovieCard>
      <div className="now-img">
        <img src={tmdbApi.imageOriginal(backdrop_path)} alt="" />
      </div>

      <div className="discription">
        <div className="discription-box">
          <h5>{title}</h5>
          <div className="now-rating">
            <span className="">{new Date(release_date).getFullYear()}</span>
            <div className="d-flex justify-content-center align-items-center">
              <span className="">{vote_average}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 start"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
          </div>
        </div>
        <Button bgColor="primary" onClick={() => Navigate(`/movies/${id}`)}>
          Watch Now
        </Button>
      </div>
    </StyleMovieCard>
  );
};

export default MovieCard;
