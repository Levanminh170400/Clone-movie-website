import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { fetcher, tmdbApi } from "../Config";

const StyleMovieCard = styled.div`
  .box {
    padding: 10px;
    border-radius: 12px;
    background-color: rgb(43, 43, 43);
    height: 440px;
    margin-bottom: 50px;
  }
  .box:hover {
    transform: scale(1.1);
    transition: all linear 0.3s;
  }
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

const TvCard = ({ item }) => {
  const Navigate = useNavigate();
  const {
    backdrop_path,
    name,
    origin_country,
    popularity,
    first_air_date,
    id,
  } = item;
  return (
    <>
      <StyleMovieCard>
        <div className="box">
          <div className="now-img">
            <img src={tmdbApi.imageOriginal(backdrop_path)} alt="" />
          </div>

          <div className="discription">
            <div className="discription-box">
              <h5>{name}</h5>
              <div className="now-rating">
                <span className="">{first_air_date}</span>
                <span className="">{popularity}K</span>
              </div>
              <span className="country">Country:{origin_country}</span>
            </div>
            <Button bgColor="primary" onClick={() => Navigate(`/show/${id}`)}>
              Watch Now
            </Button>
          </div>
        </div>
      </StyleMovieCard>
    </>
  );
};

export default TvCard;
