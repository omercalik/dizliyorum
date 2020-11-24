import React, { useState, useEffect } from 'react';
import Grid from '../../dashboard/Grid';
import MovieThumb from '../../dashboard/MovieThumb';
import NoImage from '../../images/no_image.jpg';
import Spinner from '../../dashboard/Spinner';

import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
} from '../../../config/apiConfig';

export const NowPlaying = () => {
  const [results, setResults] = useState([]);
  //console.log(results);
  let dataUrlNoPage = `https://api.themoviedb.org/3/movie/now_playing?api_key=592dc9c56e6fc3de77c6c7e76a1c729d&language=tr&region=TR&page=`;

  const handleErrors = (err) => {
    console.log(err);
  };

  const getData = (i) =>
    fetch(dataUrlNoPage + i)
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);
          throw new Error(data.errors);
        }
        return data.results;
      });
  // Retrieve results only once, on mount:
  useEffect(() => {
    Promise.all(Array.from({ length: 5 }, (_, i) => getData(i + 1)))
      .then((allResults) => {
        setResults(allResults.flat());
      })
      .catch(handleErrors);
  }, []);

  if (!results[0]) return <Spinner />;
  return (
    <div>
      <Grid header="Vizyondaki Filmler">
        {results.map((movie) => (
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
          />
        ))}
      </Grid>
    </div>
  );
};
