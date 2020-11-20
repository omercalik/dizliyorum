import React from 'react';
import { Link } from '@reach/router';

import { StyledMovieNavigation } from '../styles/StyledMovieNavigation';

export const Navigation = ({ movie }) => {
  return (
    <StyledMovieNavigation>
      <div className="navigation-content">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>|</p>
        <p>{movie}</p>
      </div>
    </StyledMovieNavigation>
  );
};
