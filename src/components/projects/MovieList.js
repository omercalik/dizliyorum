import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const MovieList = ({ lists }) => {
  console.log(lists);
  return (
    <div className="project-list section">
      {lists &&
        lists.map((list) => {
          return (
            <Link to={'/list/' + list.id} key={list.id}>
              {list.title}
            </Link>
          );
        })}
    </div>
  );
};

export default MovieList;
