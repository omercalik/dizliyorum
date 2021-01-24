import React from 'react';
import FontAwesome from 'react-fontawesome';
import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';
import { connect } from 'react-redux';
import { addToWatchList } from '../../store/actions/watchListActions';
import './tvinfo.css';

export const TVInfoBar = (props) => {
  const handleClick = () => {
    props.addToWatchList(props.TV);
  };

  return (
    <StyledMovieInfoBar>
      <div className="movieinfobar-content">
        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-time" name="clock-o" size="2x" />
          <span className="movieinfobar-info">
            Bölüm Süresi:{' '}
            {props.time
              ? props.time[1]
                ? props.time[0] + '-' + props.time[1] + 'dk'
                : props.time[0] + 'dk'
              : 'Bilgi bulunamadı.'}
          </span>
        </div>

        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-budget" name="money" size="2x" />
          <span className="movieinfobar-info">
            Sezon Sayısı:{' '}
            {props.season_count ? props.season_count : 'Bilgi bulunamadı.'}
          </span>
        </div>

        <div className="movieinfobar-content-col">
          <FontAwesome className="fa-revenue" name="ticket" size="2x" />
          <span className="movieinfobar-info">
            Durum:{' '}
            {props.status
              ? props.status === 'Returning Series'
                ? 'Devam Ediyor'
                : 'Sona Erdi'
              : 'Bilgi bulunamadı'}
          </span>
        </div>

        <div
          onClick={handleClick}
          className="movieinfobar-content-col add-to-watchlist"
        >
          <FontAwesome className="fa-budget" name="plus" size="2x" />
          <span className="movieinfobar-info">İzleme Listesine ekle</span>
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
    addToWatchList: (tv) => dispatch(addToWatchList(tv)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TVInfoBar);
