import React from 'react';
import NoImage from '../images/no_image.jpg';

import { IMAGE_BASE_URL, CAROUSEL_POSTER_SIZE } from '../../config/apiConfig';
import { StyledActor } from '../styles/StyledActor';

export const Actor = ({ actor }) => {
  return (
    <StyledActor>
      <img
        style={{ width: '185px' }}
        src={
          actor.profile_path
            ? `${IMAGE_BASE_URL}${CAROUSEL_POSTER_SIZE}${actor.profile_path}`
            : NoImage
        }
        alt="actorthumb"
      />
      <span className="actor-name">{actor.name}</span>
      <span className="actor-character">{actor.character}</span>
    </StyledActor>
  );
};
