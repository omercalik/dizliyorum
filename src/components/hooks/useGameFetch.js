import React, { useState, useEffect, useCallback } from 'react';
import { getStoredState } from 'redux-persist';

export const useGameFetch = () => {
  const [data, setData] = useState({ games: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async (endpoint) => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search('page');

    try {
      const response = await (await fetch(endpoint)).json();
      if (response.results.length === 0) {
        setData((prev) => ({
          ...prev,
          games: [{}],
        }));
        setLoading(false);
      } else {
        setData((prev) => ({
          ...prev,
          games:
            isLoadMore !== -1
              ? [...prev.games, ...response.results]
              : [...response.results],
          next: response.next,
        }));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(`https://rawg.io/api/games`);
  }, []);

  return [{ data, loading }, fetchData];
};
