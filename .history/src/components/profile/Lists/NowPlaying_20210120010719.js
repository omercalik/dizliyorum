import React, { useState, useEffect } from 'react';
import Grid from '../../dashboard/Grid';
import MovieThumb from '../../dashboard/MovieThumb';
import NoImage from '../../images/no_image.jpg';
import Spinner from '../../dashboard/Spinner';
import { useGameHomeFetch } from '../../hooks/useGameHomeFetch';

import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
} from '../../../config/apiConfig';
import { useGameFetch } from '../../hooks/useGameFetch';

export const NowPlaying = () => {
  const [searchTerm, setSearchTerm] = useState();

  const [{ data, loading }, fetchData] = useGameFetch(searchTerm);

  const loadMoreGames = async () => {
    const endpoint = data.next;
    await fetchData(endpoint);
  };
};
