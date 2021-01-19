// Configuration for TMDB
// To se the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f
// Read more about the API here: https://developers.themoviedb.org/

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '592dc9c56e6fc3de77c6c7e76a1c729d';
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const SEARCH_BASE_URL_TV = `${API_URL}search/tv?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
const POPULAR_BASE_URL_TV = `${API_URL}tv/popular?api_key=${API_KEY}`;
const SEARCH_BASE_URL_MIX = `${API_URL}search/multi?api_key=${API_KEY}&query=`;
const NOW_PLAYING_URL =
  'https://api.themoviedb.org/3/movie/now_playing?api_key=592dc9c56e6fc3de77c6c7e76a1c729d&language=TR&page=1&region=TR';
const GAME_API_URL = 'https://rawg.io/api/games';
const GAME_SEARCH_API_URL = 'https://rawg.io/api/games?search=';
const TRENDING_MOVIE_URL =
  'https://api.themoviedb.org/3/trending/movie/week?api_key=592dc9c56e6fc3de77c6c7e76a1c729d';
const TRENDING_TV_URL =
  'https://api.themoviedb.org/3/trending/tv/week?api_key=592dc9c56e6fc3de77c6c7e76a1c729d';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'original';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';
const CAROUSEL_POSTER_SIZE = 'w185';
const KRAKEN_API_KEY = 'd32a02413493c522b43c31368c36d617';
const KRAKEN_API_KEY_SECRET = '3c4031696bacfb082284d54924367dac6f7a3fe5';

export {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  CAROUSEL_POSTER_SIZE,
  POPULAR_BASE_URL_TV,
  SEARCH_BASE_URL_TV,
  SEARCH_BASE_URL_MIX,
  GAME_API_URL,
  GAME_SEARCH_API_URL,
  TRENDING_MOVIE_URL,
  TRENDING_TV_URL,
  NOW_PLAYING_URL,
  KRAKEN_API_KEY,
  KRAKEN_API_KEY_SECRET,
};
