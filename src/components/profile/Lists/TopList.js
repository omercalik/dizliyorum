import React, { useState, useEffect } from 'react';
import  TopListCard  from './TopListCard';

export const TopList = () => {
  const [results, setResults] = useState([]);

  let dataUrlNoPage = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=tr&page=`;

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
    <div className = "movieTopList-container">
    {results.length > 0 &&
      results.map((movie) => <TopListCard key = {movie.id} {...movie} />)
    }
    </div>
  );
};
