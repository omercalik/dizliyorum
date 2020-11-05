import React, { useState, useEffect } from 'react';
import MovieList from '../../projects/MovieList';
import Vizyondakiler from './Vizyondakiler';

export const NowPlaying = () => {
  const [results, setResults] = useState([]);
  //console.log(results);
  let dataUrlNoPage = `https://api.themoviedb.org/3/movie/now_playing?api_key=592dc9c56e6fc3de77c6c7e76a1c729d&language=en-US&page=`;

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


  return (
    <div className = "movie-container">
    {results.length > 0 &&
      results.map((movie) => <Vizyondakiler key = {movie.id} {...movie} />)
    }
    </div>
  );
};
