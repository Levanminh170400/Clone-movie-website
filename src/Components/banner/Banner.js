import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { fetcher, tmdbApi } from "../Config";
import useSWR from "swr";

const StyledImg = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin: 50px 0px;
  position: relative;
  img {
    width: 1280px;
    height: 600px;
    object-fit: fill;
    border-radius: 12px;
    display: block;
  }
  .header-item {
    position: absolute;
    bottom: 50px;
    left: 60px;
    color: white;
    .header-box {
      text-align: left;
      margin: 20px 0px;
    }
  }
`;

const Banner = () => {
  const ApiBanner = tmdbApi.getMovielist("upcoming");
  const { data } = useSWR(ApiBanner, fetcher);

  if (!data) return null;
  const banner = data.results;
  return (
    <>
      <Swiper>
        {banner.length > 0 &&
          banner.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};
const BannerItem = ({ item }) => {
  const { backdrop_path, title, id } = item;
  const Navigate = useNavigate();
  return (
    <StyledImg className="header-img">
      <img src={tmdbApi.imageOriginal(backdrop_path)} alt="" />
      <div className="header-item">
        <h2 className="header-heading">{title}</h2>
        <div className="header-box">
          <span className="btn btn-outline-light mr-2">Action</span>
          <span className="btn btn-outline-light mr-2">Adventer</span>
          <span className="btn btn-outline-light mr-2">Drama</span>
        </div>
        <Button bgColor="secondary" onClick={() => Navigate(`/movies/${id}`)}>
          Watch Now
        </Button>
      </div>
    </StyledImg>
  );
};

export default Banner;
