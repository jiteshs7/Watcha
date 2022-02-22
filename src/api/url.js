const ROOT_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/";
const API_KEY = "1abb3e68d878be1155d781ce812f80a8";

const defaultQuery = {
  api_key: API_KEY,
  language: "en-US", // en-US = English //pa= punjabi hi = hindi ta= tamil te =telgu
  // include_adult: true,
  // region: "IN",
};

const queryString = (obj) => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join("&");
};

export const getPopularMoviesUrl = (page: number) => `${ROOT_URL}/movie/popular?${queryString({ ...defaultQuery, page })}`;

export const getTopRatedMoviesUrl = (page: number) =>
  `${ROOT_URL}/discover/movie?${queryString({ ...defaultQuery, ...{ sort_by: "vote_count.desc" }, page })}`;
export const getMustWatchMoviesUrl = (page: number) =>
  `${ROOT_URL}/discover/movie?${queryString({ ...defaultQuery, ...{ sort_by: "revenue.desc" }, page })}`;
export const getUpcomingMoviesUrl = (page: number) => `${ROOT_URL}/movie/upcoming?${queryString({ ...defaultQuery, page })}`;

export const getPopularTVShowUrl = (page: number) => `${ROOT_URL}/tv/popular?${queryString({ ...defaultQuery, page })}`;
export const getTopRatedTVShowUrl = (page: number) => `${ROOT_URL}/tv/top_rated?${queryString({ ...defaultQuery, page })}`;
export const getMustWatchTVShowUrl = (page: number) =>
  `${ROOT_URL}/discover/tv?${queryString({ ...defaultQuery, ...{ sort_by: "vote_count.desc" }, page })}`;
export const getOnTheAirTVShowUrl = (page: number) => `${ROOT_URL}/tv/on_the_air?${queryString({ ...defaultQuery, page })}`;

export const getMovieDetailUrl = (id: number) => `${ROOT_URL}/movie/${id}?${queryString(defaultQuery)}`;
export const getMovieCreditUrl = (id: number) => `${ROOT_URL}/movie/${id}/credits?${queryString(defaultQuery)}`;
export const getMovieImageUrl = (id: number) => `${ROOT_URL}/movie/${id}/images?${queryString({ api_key: API_KEY })}`;
export const getMovieVideoUrl = (id: number) => `${ROOT_URL}/movie/${id}/videos?${queryString({ api_key: API_KEY })}`;
export const getMovieRecommendationsUrl = (id: number) =>
  `${ROOT_URL}/movie/${id}/recommendations?${queryString(defaultQuery)}`;

export const getTvShowDetailUrl = (id: number) => `${ROOT_URL}/tv/${id}?${queryString(defaultQuery)}`;
export const getTvShowCreditUrl = (id: number) => `${ROOT_URL}/tv/${id}/credits?${queryString(defaultQuery)}`;
export const getTvShowImageUrl = (id: number) => `${ROOT_URL}/tv/${id}/images?${queryString({ api_key: API_KEY })}`;
export const getTvShowVideoUrl = (id: number) => `${ROOT_URL}/tv/${id}/videos?${queryString({ api_key: API_KEY })}`;
export const getTvShowRecommendationsUrl = (id: number) =>
  `${ROOT_URL}/tv/${id}/recommendations?${queryString(defaultQuery)}`;

export const getTvShowSeasonUrl = (id: number, season_number: number) =>
  `${ROOT_URL}/tv/${id}/season/${season_number}?${queryString(defaultQuery)}`;

export const getSearchMovieUrl = (keyword: string) =>
  `${ROOT_URL}/search/movie?${queryString({ ...defaultQuery, ...{ query: keyword } })}`;
export const getSearchTvUrl = (keyword: string) =>
  `${ROOT_URL}/search/tv?${queryString({ ...defaultQuery, ...{ query: keyword } })}`;

export const getImageUrl = (path: string | null = "", key: string = "uri", width: string = "w500") => {
  return { [key]: `${IMAGE_URL}${width}${path}` };
};
