import React from 'react';
import FontAwesome from 'react-fontawesome';
import { calcTime, convertMoney } from '../../helpers';
import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';
import { connect } from 'react-redux';
import { addToWatchList } from '../../store/actions/watchListActions';

export const MovieInfoBar = (props) => {
  const handleClick = () => {
    props.addToWatchList(props.movie);
  };
  return (
    <StyledMovieInfoBar>
      <div className="movieinfobar-content">
        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-time" name="clock-o" size="2x" />
          <span className="movieinfobar-info">
            Running time: {calcTime(props.time)}
          </span>
        </div>

        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-budget" name="money" size="2x" />
          <span className="movieinfobar-info">
            Budget: {convertMoney(props.budget)}
          </span>
        </div>

        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-revenue" name="ticket" size="2x" />
          <span className="movieinfobar-info">
            Revenue: {convertMoney(props.revenue)}
          </span>
        </div>

        <div onClick={handleClick} className="movieinfobar-content-col">
          <FontAwesome className="fa-budget" name="money" size="2x" />
          <span className="movieinfobar-info">Add To Watchlist</span>
        </div>
      </div>
    </StyledMovieInfoBar>
  );
};

const mapStateToProps = (state) => {
  return {
    watchlist: state.firebase.profile.watchlist,
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWatchList: (movie) => dispatch(addToWatchList(movie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfoBar);
