import React from 'react';
import FontAwesome from 'react-fontawesome';
import { calcTime, convertMoney } from '../../helpers';
import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';
import { connect } from 'react-redux';
import { addToWatchList } from '../../store/actions/watchListActions';

export const MovieInfoBar = (props) => {
  const handleClick = () => {
    props.addToWatchList(props.movie);
    console.log(props.watchlist);
  };
  return (
    <StyledMovieInfoBar>
      <div className="movieinfobar-content">
        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-time" name="clock-o" size="2x" />
          <span className="movieinfobar-info">
            Süre: {props.time ? calcTime(props.time) : 'Bilgi bulunamadı.'}
          </span>
        </div>

        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-budget" name="money" size="2x" />
          <span className="movieinfobar-info">
            Bütçe:{' '}
            {props.budget ? convertMoney(props.budget) : 'Bilgi bulunamadı.'}
          </span>
        </div>

        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-revenue" name="ticket" size="2x" />
          <span className="movieinfobar-info">
            Hasılat:{' '}
            {props.revenue ? convertMoney(props.revenue) : 'Bilgi bulunamadı.'}
          </span>
        </div>

        <div onClick={handleClick} className="movieinfobar-content-col">
          <FontAwesome className="fa-budget" name="money" size="2x" />
          <span className="movieinfobar-info">Watchliste ekle</span>
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
