import React, { useState } from 'react';
import { TopListCard } from './TopListCard';

export const TopList = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  console.log(results);
  
    
    
    fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.errors) {
        setResults(data.results);
        
        
      } else {
        setResults([]);
      
      }
    });
  
    
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6">
          <div className="add-content">   
          <h1>Top 20</h1>        
            {results.length > 0 && (
                
              <ul className="results">
                {results.map((movie) => (
                  <li key={movie.id}>
                    <TopListCard movie={movie} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  
}

