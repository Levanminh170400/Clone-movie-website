import React from "react";
import styled from "styled-components";
import Tvcard from "../TV/TvCard";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../Config";
import TvListCard from "../TV/TvListCard";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

const TvBoxStyled = styled.div`
  margin: 100px 30px 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  input {
    width: 1000px;
  }
  .search-box {
    position: absolute;
    top: 14px;
    right: 200px;
    width: 20px;
    height: 20px;
  }
  .tv-heading {
    margin: 70px 34px 30px;
  }
  .tv-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px 30px;
    padding: 0 30px;
  }
`;
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

const itemsPerPage = 20;
const TvShow = () => {
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
      setUrl(tmdbApi.getMovieSearch("tv", filterDebounce, nextPage));
    } else {
      setUrl(tmdbApi.getTvList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  const { data } = useSWR(url, fetcher);
  const tv = data?.results || [];
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
    <TvBoxStyled className="tv-show">
      <input
        type="text"
        placeholder="Type your tv show..."
        className="btn btn-outline-success btn-lg "
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
      <section>
        <h2 className="tv-heading">Top Trending</h2>
        <div className="tv-list">
          {tv.map((item) => (
            <Tvcard key={item.key} item={item}></Tvcard>
          ))}
        </div>
      </section>
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
    </TvBoxStyled>
  );
};

export default TvShow;
