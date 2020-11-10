import React from 'react';
import { Link } from '@reach/router';

import { StyledNavigation } from '../styles/StyledNavigation';

export const Navigation = ({ movie }) => {
  return (
    <StyledNavigation>
      <div className="navigation-content">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>|</p>
        <p>{movie}</p>
      </div>
    </StyledNavigation>
  );
};
