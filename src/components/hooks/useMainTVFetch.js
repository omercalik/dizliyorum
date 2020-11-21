import { useState, useEffect } from 'react';
import { POPULAR_BASE_URL_TV } from '../../config/apiConfig';

export const useMainTVFetch = () => {
  const [state, setState] = useState({ TVs: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTVs = async (endpoint) => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search('page');
    console.log(endpoint);

    try {
      const result = await (await fetch(endpoint)).json();
      console.log(result);
      setState((prev) => ({
        ...prev,
        TVs:
          isLoadMore !== -1
            ? [...prev.TVs, ...result.results]
            : [...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages,
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTVs(POPULAR_BASE_URL_TV);
  }, []);

  return [{ state, loading, error }, fetchTVs];
};
