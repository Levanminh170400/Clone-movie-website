import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetcher, tmdbApi } from "../Config";
import useSWR from "swr";
import Comment from "../comment/Comment";

const TvDetailPage = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .input-search {
    width: 1000px;
  }
  .content {
    margin-bottom: 200px;
    width: 100%;
    height: auto;
    padding: 50px 90px;
    .video-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .option {
        display: flex;
        cursor: pointer;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;
const VideoDisplay = styled.div`
  margin-bottom: 200px;
  .video {
    width: 100%;
    height: 600px;
  }
  .option {
    display: flex;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 1000px;
    overflow: hidden;
    cursor: pointer;
    img {
      max-width: 100%;
      object-fit: cover;
      display: block;
      border-radius: 1000px;
    }
  }
  .comment {
    width: 100%;
  }
`;
const TvShowDetailPage = () => {
  return (
    <TvDetailPage>
      <input
        type="text"
        placeholder="Type your tv show..."
        className="btn btn-lg btn-outline-secondary input-search"
      />
      <div className="content">
        <GetTv></GetTv>
      </div>
    </TvDetailPage>
  );
};
export default TvShowDetailPage;

function GetTv() {
  const { showId } = useParams();
  const api = tmdbApi.getTvDetail(showId);
  const { data } = useSWR(api, fetcher);
  if (!data) return null;
  const {
    name,
    popularity,
    vote_count,
    first_air_date,
    poster_path,
    vote_average,
  } = data;
  return (
    <VideoDisplay className="video-display">
      <div className="video">
        <GetVideo></GetVideo>
      </div>
      <div className="video-footer">
        <h4 className="video-title">{name}</h4>

        <div className="d-flex justify-content-between align-items-center">
          <div className="option">Viewer:{popularity}K</div>
          <div className="option">
            {vote_count} Like
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
          </div>
          <div className="option">
            Dislike
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
              />
            </svg>
          </div>
          <div className="option">
            Share
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </div>
          <div className="option">
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </div>
          <div className="option">Publish:{first_air_date}</div>
        </div>

        <hr className="bg-secondary"></hr>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="avatar ">
              <img src={tmdbApi.imageOriginal(poster_path)} alt="" />
            </div>
            <div className="name-channel ml-3">
              <div className="">{name}</div>
              <span className="text-muted">{vote_average}K subscribers</span>
            </div>
          </div>
          <button className="btn btn-danger">subscribers</button>
        </div>

        <hr className="bg-secondary"></hr>
        <div className="comment">
          <Comment></Comment>
        </div>
      </div>
    </VideoDisplay>
  );
}
function GetVideo() {
  const { showId } = useParams();
  const api = tmdbApi.getTvMeta(showId, "videos");
  const { data } = useSWR(api, fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results) return null;
  const video = results[0];
  return (
    <>
      <iframe
        className="w-100 h-100"
        width="727"
        height="409"
        src={`https://www.youtube.com/embed/${video.key}`}
        title="'CẦM TAY' HƯỚNG DẪN VIẾT CV CHO NGƯỜI ÍT/KHÔNG CÓ KINH NGHIỆM XIN VIỆC - Hướng Dẫn Viết Đơn Xin Việc"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
}
