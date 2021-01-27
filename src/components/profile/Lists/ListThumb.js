import React from 'react';
import './listthumb.css';
import { Link } from '@reach/router';

export const ListThumb = ({ image, list }) => {
  return (
    <div className="list-container">
      <img src={image} alt="list thumb" className="list-thumbnail" />
      {console.log(image)}
      <div className="list-title">
        <h5 className="list-text">{list.title}</h5>
        <h7 className="list-text">{list.list.length} İçerik</h7>
      </div>
    </div>
  );
};
