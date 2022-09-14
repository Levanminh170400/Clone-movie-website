import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Home from "./Components/page/Home";
import Movies from "./Components/page/Movies";
import MoviesDetailPage from "./Components/page/MoviesDetailPage";
import TvShow from "./Components/page/TvShow";
import TvShowDetailPage from "./Components/page/TvShowDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar></Navbar>}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/movies" element={<Movies></Movies>}></Route>
          <Route
            path="/movies/:moviesId"
            element={<MoviesDetailPage></MoviesDetailPage>}
          ></Route>
          <Route path="/show" element={<TvShow></TvShow>}></Route>
          <Route
            path="/show/:showId"
            element={<TvShowDetailPage></TvShowDetailPage>}
          ></Route>
        </Route>
        <Route path="*" element={<>this is 404 page</>}></Route>
      </Routes>
    </>
  );
}

export default App;
