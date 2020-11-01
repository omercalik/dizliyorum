import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  render() {
    const { auth, authError } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8">
            <div className="inner-content">
              <ul className="nav-links">
                <li>
                  <Link to="/">Watch List</Link>
                </li>

                <li>
                  <Link to="/add" className="btn">
                    Add
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col s4">
            <Link to="/lists">MY LISTS</Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    lists: state.firestore.ordered.lists,
    auth: state.firebase.auth,
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
