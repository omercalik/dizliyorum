import React from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from '@reach/router';
import './profile.css';
import { navigate } from '@reach/router';
import firebase from '../../config/fbConfig';
import Spinner from '../dashboard/Spinner';
import { ListThumb } from './Lists/ListThumb';
import NoImage from '../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config/apiConfig';
import MovieThumb from '../dashboard/MovieThumb';

let db = firebase.firestore();

const Profile = ({ auth, state, watchlist }) => {
  const [myLists, setMyLists] = React.useState();
  const [isFetched, setisFetched] = React.useState(false);
  console.log(watchlist);

  React.useEffect(() => {
    const fetchLists = () => {
      db.collection('users/' + auth.uid + '/lists')
        .get()
        .then((snapshot) => {
          let movieLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setMyLists(movieLists);
          setisFetched(true);
        });
    };
    fetchLists();
  }, []);

  const handleClick = (list) => {
    return navigate(`/lists/${list.title}`, {
      replace: true,
      state: { list, id: list.id },
    });
  };

  if (!auth.uid) return <Redirect from="/profile" to="/" />;
  if (myLists === undefined) return <Spinner />;
  return (
    <div style={{ minHeight: '80vh' }} className="container">
      <div className="row">
        <div className="col s8">
          <div className="innerr-content">
            <h3>
              {state.firebase.profile.firstName}{' '}
              {state.firebase.profile.lastName}
            </h3>
            <div className="lists-container">
              <div className="headerrr">
                <Link className="see-more" to="/userlists">
                  <h5 className="list-headerr">LİSTELERİM</h5>
                </Link>

                <Link to="/create">
                  <button className="btn create-list-button">
                    Yeni Liste Oluştur
                  </button>
                </Link>
              </div>
              {myLists.slice(-3).map((list) => {
                let thumbImage =
                  list.list.length !== 0
                    ? IMAGE_BASE_URL + POSTER_SIZE + list.list[0].poster_path
                    : NoImage;

                return (
                  <div
                    onClick={() => {
                      handleClick(list);
                    }}
                    className="listt-thumb-container"
                  >
                    <ListThumb
                      className="listt-thumb"
                      image={thumbImage}
                      key={list.id}
                      list={list}
                    />
                  </div>
                );
              })}
            </div>
            <Link to="/lists">
              <h5 className="list-headerr">WATCHLIST</h5>
            </Link>

            <div className="profile-movie-thumb-container">
              {watchlist.slice(0, 3).map((movie) => {
                return (
                  <MovieThumb
                    className="day"
                    clickable
                    key={movie.id}
                    image={
                      movie.poster_path
                        ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                        : NoImage
                    }
                    movie={movie}
                    movieName={movie.original_title}
                    content={movie}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="col s4">
          <ul className="quick-links">
            <Link to="/userlists">
              <li className="quick-link">Listelerim</li>
            </Link>
            <Link to="/lists">
              <li className="quick-link">Watchlist</li>
            </Link>
            <Link to="/profileYorum">
              <li className="quick-link">Yorumlarım</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    lists: state.firestore.ordered.lists,
    auth: state.firebase.auth,
    state: state,
    watchlist: state.firebase.profile.watchlist,
  };
};

export default compose(
  firestoreConnect(() => [
    {
      collection: 'lists',
      //orderBy: ['createdAt', 'desc'],
    },
  ]),
  connect(mapStateToProps)
)(Profile);
