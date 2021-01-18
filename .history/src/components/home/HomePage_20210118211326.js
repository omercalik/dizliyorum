import React from 'react';
import { useState, useEffect } from 'react';
import HeroImage from '../dashboard/HeroImage';
import NoImage from '../images/no_image.jpg';
import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  POSTER_SIZE,
  API_KEY,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POPULAR_BASE_URL_TV,
  NOW_PLAYING_URL,
  TRENDING_MOVIE_URL,
  TRENDING_TV_URL,
  API_URL,
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
  const [game, setGame] = useState();
  const [review, setReview] = useState();
  const [upcoming, setUpcoming] = useState();
  const [trailers, setTrailers] = useState();
  const fetchMovies = async () => {
    setisFetched(false);

    try {
      const result = await (await fetch(POPULAR_BASE_URL)).json();
      const resultTv = await (await fetch(POPULAR_BASE_URL_TV)).json();
      const resultNowPlaying = await (await fetch(NOW_PLAYING_URL)).json();
      const resultUpcoming = await (
        await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=592dc9c56e6fc3de77c6c7e76a1c729d&language=en-US&page=1&region=US'
        )
      ).json();

      let idArray = [];
      let trailerArray = [];

      for (let i = 0; i < resultUpcoming.results.length; i++) {
        idArray.push(resultUpcoming.results[i].id);
      }
      console.log(idArray);

      let urls = [];

      for (let i = 0; i < idArray.length; i++) {
        let _str = `http://api.themoviedb.org/3/movie/${idArray[i]}/videos?api_key=592dc9c56e6fc3de77c6c7e76a1c729d`;
        urls.push(_str);
      }

      let requests = urls.map((url) => fetch(url));
      let limit = 3;

      Promise.all(requests)
        .then((responses) => {
          return responses;
        })
        .then((responses) =>
          Promise.all(responses.map((r) => r.json())).then((contents) =>
            contents.forEach((content) => {
              if (content.results.length > 0)
                trailerArray.push(content.results);
            })
          )
        );

      const resultTrendingMovie = await (
        await fetch(TRENDING_MOVIE_URL)
      ).json();
      const resultTrendingTV = await (await fetch(TRENDING_TV_URL)).json();
      const contentId = resultTrendingMovie.results[0].id;

      const resultReview = await (
        await fetch(`${API_URL}movie/${contentId}/reviews?api_key=${API_KEY}`)
      ).json();

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

        setReview(() => ({
          review: resultReview.results,
        }));

        setUpcoming(() => ({
          upcoming: resultUpcoming.results,
        }));

        setTrailers(trailerArray);

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
      {console.log(trailers)}

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
            ="true"
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

      <h4>Vizyondaki Filmler</h4>

      <ActorCarousel>
        {nowPlaying.movie.map((movie) => (
          <MovieThumb
            key={movie.id}
            
        
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

      <div className="content-of-the-week">
        <div className="content-container container1">
          <img
            className="content-image"
            src={IMAGE_BASE_URL + POSTER_SIZE + trending.movie.poster_path}
            alt=""
            
          />
          <h5>Haftanın Filmi: {trending.movie.original_title}</h5>
          <p>{review.review[3].content}</p>
        </div>
        <div className="content-container container2">
          <img
            className="content-image"
            src={IMAGE_BASE_URL + POSTER_SIZE + trending.tv.poster_path}
            alt=""
            
          />
          <h5>Haftanın Dizisi: {trending.tv.name}</h5>
          <p>{review.review[3].content}</p>
        </div>
      </div>
    </div>
  );
};
