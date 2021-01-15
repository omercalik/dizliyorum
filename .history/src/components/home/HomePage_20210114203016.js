import React from 'react';
import { useState, useEffect } from 'react';
import HeroImage from '../dashboard/HeroImage';
import NoImage from '../images/no_image.jpg';
import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POPULAR_BASE_URL_TV,
  NOW_PLAYING_URL,
  TRENDING_MOVIE_URL,
  TRENDING_TV_URL,
} from '../../config/apiConfig';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { ActorCarousel } from '../movie/ActorCarousel';
import MovieThumb from '../dashboard/MovieThumb';
import './home.css';
import TVThumb from '../tv_serial/TVThumb';

export const HomePage = () => {
  const [isFetched, setisFetched] = useState(false);
  const [state, setState] = useState({});
  const [error, setError] = useState(false);
  const [nowPlaying, setNowPlaying] = useState();
  const [trending, setTrending] = useState();
  const fetchMovies = async () => {
    setisFetched(false);

    try {
      const result = await (await fetch(POPULAR_BASE_URL)).json();
      const resultTv = await (await fetch(POPULAR_BASE_URL_TV)).json();
      const resultNowPlaying = await (await fetch(NOW_PLAYING_URL)).json();
      const resultTrendingMovie = await (
        await fetch(TRENDING_MOVIE_URL)
      ).json();
      const resultTrendingTV = await (await fetch(TRENDING_TV_URL)).json();

      if (result.results.length === 0) {
        setState(() => ({
          ...result.results,
        }));
        setisFetched(true);
      } else {
        setState((prev) => ({
          ...prev,
          movie: result.results,
          tv: resultTv.results,
        }));

        setNowPlaying((prev) => ({
          ...prev,
          movie: resultNowPlaying.results,
        }));

        setTrending((prev) => ({
          ...prev,
          movie: resultTrendingMovie.results[0],
          tv: resultTrendingTV.results[0],
        }));
        setisFetched(true);
      }
    } catch (error) {
      setError(true);
      setisFetched(true);
      console.log(error);
    }
  };

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (!isFetched) return <h1>Loading</h1>;
  return (
    <div style={{ minHeight: '80vh' }}>
      {console.log(trending)}

      <Slider {...settings}>
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.movie[0].backdrop_path}`}
          title={state.movie[0].title}
          text={state.movie[0].overview}
        />
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.tv[0].backdrop_path}`}
          title={state.tv[0].name}
          text={state.tv[0].overview}
        />
      </Slider>

      <h4>Popüler Filmler</h4>
      <ActorCarousel>
        {state.movie.map((movie) => (
          <MovieThumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movie={movie}
            movieName={movie.original_title}
            content={movie}
          />
        ))}
      </ActorCarousel>

      <h4>Vizyondakiler</h4>

      <ActorCarousel>
        {nowPlaying.movie.map((movie) => (
          <MovieThumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movie={movie}
            movieName={movie.original_title}
            content={movie}
          />
        ))}
      </ActorCarousel>

      <h4>Günün İçerikleri</h4>
      <div className="trending-container">
        <MovieThumb
          key={trending.movie.id}
          clickable
          image={
            trending.movie.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + trending.movie.poster_path
              : NoImage
          }
          movie={trending.movie}
          movieName={trending.movie.original_title}
          content={trending.movie}
        />
        <TVThumb
          key={trending.tv.id}
          clickable
          image={
            trending.tv.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + trending.tv.poster_path
              : NoImage
          }
          TVId={trending.tv.id}
          TVName={trending.tv.name}
          content={trending.tv}
        />
        <TVThumb
          key={trending.tv.id}
          clickable
          image={
            trending.tv.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + trending.tv.poster_path
              : NoImage
          }
          movie={trending.tv}
          movieName={trending.tv.name}
          content={trending.tv}
        />
      </div>
    </div>
  );
};