const fetcher = (...args) => fetch(...args).then((res) => res.json());
const apiKey = "cc67b476ce6d320849209021785ec72f";
const endPointMovies = "https://api.themoviedb.org/3/movie";
const endPointSearch = "https://api.themoviedb.org/3/search";
const endPointTrending = "https://api.themoviedb.org/3/trending/all/day";
const endPointTv = "https://api.themoviedb.org/3/tv";

const tmdbApi = {
  getMovielist: (type, page = 1) =>
    `${endPointMovies}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieSearch: (type, query, page) =>
    `${endPointSearch}/${type}?api_key=${apiKey}&query='${query}'&page=${page}`,
  getMovieDetail: (moviesId) =>
    `${endPointMovies}/${moviesId}?api_key=${apiKey}`,
  getMovieMeta: (moviesId, type) =>
    `${endPointMovies}/${moviesId}/${type}?api_key=${apiKey}`,

  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  getTrending: () => `${endPointTrending}?api_key=${apiKey}`,
  getTvList: (type, page = 1) =>
    `${endPointTv}/${type}?api_key=${apiKey}&page=${page}`,
  getTvSearch: (query, page) =>
    `${endPointSearch}?api_key=${apiKey}&query='${query}&page=${page}`,
  getTvMeta: (tvId, type) => `${endPointTv}/${tvId}/${type}?api_key=${apiKey}`,
  getTvDetail: (tvId) => `${endPointTv}/${tvId}?api_key=${apiKey}`,
};
export { fetcher, tmdbApi };
