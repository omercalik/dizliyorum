import React, { useState, useEffect } from 'react';
import { ResultCard } from './ResultCard';

export const TopList = () => {
  const [results, setResults] = useState([]);

  let dataUrlNoPage = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=2500&api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=`;

  const handleErrors = (err) => {
    console.log(err);
  };

  const getData = (i) =>
    fetch(dataUrlNoPage + i)
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
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
    <div>
      {results.length > 0 &&
        results.map((movie, index) => (
          <ResultCard key={movie.id} movie={movie} index={index} />
        ))}
    </div>
  );
};
