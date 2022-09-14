import styled from "styled-components";
import MovieCard from "../movie/MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { tmdbApi, fetcher } from "../Config";
import useSWR from "swr";

const StyledNowPlay = styled.div`
  color: white;
  padding: 0 32px;
  margin-bottom: 50px;
  .now-list {
    .swiper-slide {
      width: 300px;
    }
  }
`;

const MovieListCard = ({ type }) => {
  const ApiMovies = tmdbApi.getMovielist(type);
  const { data } = useSWR(ApiMovies, fetcher);
  const movies = data ? data.results : [];
  //
  return (
    <StyledNowPlay>
      <div className="now-list">
        <Swiper grabCursor={true} spaceBetween={25} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </StyledNowPlay>
  );
};

export default MovieListCard;
