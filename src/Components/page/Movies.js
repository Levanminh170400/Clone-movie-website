import { useState, useEffect } from "react";
import MovieCard from "../movie/MovieCard";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../Config";
import ReactPaginate from "react-paginate";
const StyledMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px 10px;
  padding: 10px 60px;
`;
const StyledSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 200px;
  position: relative;
  margin-top: 50px;
  input {
    flex: 1;
    height: 50px;
  }

  .search-box {
    position: absolute;
    right: 242px;
    top: 45px;

    .search {
      width: 20px;
      height: 20px;
    }
  }
`;

const itemsPerPage = 20;

const Movies = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbApi.getMovielist("popular", nextPage));

  function handleSearch(e) {
    setFilter(e.target.value);
  }
  const filterDebounce = useDebounce(filter, 500);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbApi.getMovieSearch("movie", filterDebounce, nextPage));
    } else {
      setUrl(tmdbApi.getMovielist("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  const { data } = useSWR(url, fetcher);

  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <>
      <StyledSearch>
        <input
          className="btn btn-outline-light mr-4"
          type="text"
          placeholder="Search your movies..."
          onChange={handleSearch}
        />
        <div className="search-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 search"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </StyledSearch>
      <StyledMovies>
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard item={item} key={item.id}></MovieCard>
          ))}
      </StyledMovies>
      <StyledPagination>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="test"
        />
      </StyledPagination>
    </>
  );
};
const StyledPagination = styled.div`
  .test {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    cursor: pointer;
    .selected {
      padding: 2px 4px;
      background-color: rgb(220, 53, 69);
      border-radius: 6px;
    }
    li {
      margin-right: 10px;

      a {
        text-decoration: none;
        color: white;
      }
    }
  }
`;

export default Movies;
