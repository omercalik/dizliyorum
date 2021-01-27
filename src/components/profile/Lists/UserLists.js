import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../config/fbConfig';
import Spinner from '../../dashboard/Spinner';
import { deleteList } from '../../../store/actions/listActions';
import './userlists.css';
import { Redirect } from '@reach/router';
import { Link } from '@reach/router';
import { navigate } from '@reach/router';
let db = firebase.firestore();

const UserLists = ({ state, auth, deleteList }) => {
  const [myLists, setMyLists] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchLists = () => {
      db.collection('users/' + auth.uid + '/lists')
        .get()
        .then((snapshot) => {
          let lists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setMyLists(lists);
        });
    };

    fetchLists();
  }, [reload]);

  const handleClick = (list) => {
    return navigate(`/lists/${list.title}`, {
      replace: true,
      state: { list, id: list.id },
    });
  };

  const handleDelete = (list) => {
    deleteList(list);
    setReload(!reload);
  };

  if (!auth.uid) return <Redirect from="/userlists" to="/" />;
  if (myLists === undefined) return <Spinner />;

  return (
    <div className="main-container">
      <div className="list-name-container">
        <h4>Listeleriniz</h4>
        {myLists.map((list) => {
          return (
            <div className="listt" style={{ backgroundColor: '#dc2f02' }}>
              <div>
                <p
                  onClick={() => {
                    handleClick(list);
                  }}
                  className="list-titlee"
                >
                  {list.title}
                </p>
                <p className="count" style={{ fontSize: '11px' }}>
                  {list.list.length} İçerik
                </p>
              </div>

              <i
                onClick={() => {
                  handleDelete(list);
                }}
                class=" material-icons delete-list-button"
              >
                delete
              </i>
            </div>
          );
        })}
      </div>
      <Link to="/create">
        <button className="btn create-list-button">Yeni Liste Oluştur</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList: (list) => dispatch(deleteList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLists);
