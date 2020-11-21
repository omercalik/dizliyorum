import React from 'react';
import { Link } from '@reach/router';

import { StyledMovieNavigation } from '../styles/StyledMovieNavigation';

export const NavigationTV = ({ TV }) => {
  return (
    <StyledMovieNavigation>
      <div className="navigation-content">
        <Link to="/tvserials">
          <p>Home</p>
        </Link>
        <p>|</p>
        <p>{TV}</p>
      </div>
    </StyledMovieNavigation>
  );
};
