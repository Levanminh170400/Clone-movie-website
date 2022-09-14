import React from "react";
import styled from "styled-components";
import TvCard from "./TvCard";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../Config";

const TvStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px 30px;
  padding: 0 30px;
`;

const TvListCard = ({ type }) => {
  const apiTv = tmdbApi.getTvList(type);
  const { data } = useSWR(apiTv, fetcher);
  if (!data) return null;
  const tv = data.results;
  console.log("data-TV", data);
  console.log("results-TV", tv);
  return (
    <>
      <TvStyled>
        {tv.map((item) => (
          <TvCard item={item} key={item.id}></TvCard>
        ))}
      </TvStyled>
    </>
  );
};

export default TvListCard;
