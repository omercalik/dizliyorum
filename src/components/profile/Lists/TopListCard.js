import React from 'react';
import '../../../Results.css';

const IMG_API = "https://image.tmdb.org/t/p/w1280";
    
 const Vizyondakiler = ({ title, poster_path, overview, vote_average }) => (
    
        <div className = "movieTopList">
            
            <img src = {IMG_API + poster_path} alt = {title}/>
            <div className = "movieTopList-info">
            <h3>{title}</h3>
            <span>{vote_average}</span>
            </div>
            <div className = "movieTopList-over">
            <h2>Overview:</h2>
            <p>{overview}</p>
            </div>
        </div>
 )
 


export default Vizyondakiler;