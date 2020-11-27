import React from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from '@reach/router';

class Profile extends React.Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  render() {
    const { auth, authError } = this.props;
    if (!auth.uid) return <Redirect from="/profile" to="/" />;
    return (
      <div style={{ minHeight: '80vh' }} className="container">
        <div className="row">
          <div className="col s8">
            <div className="inner-content">
              <ul className="nav-links">
                <li>
                  <Link to="/">Watch List</Link>
                </li>

                <li></li>
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
