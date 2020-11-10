import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  return (
    <ul className="right">
      <li>
        <Link to="/create">New List</Link>
      </li>
      <li>
        <Link to="/toplists">Top 100</Link>
      </li>
      <li>
        <Link to="/nowplaying">Vizyondakiler</Link>
      </li>
      <li>
        <Link to="/details">Detay</Link>
      </li>
      <li>
        <a onClick={props.signOut}>Log Out </a>
      </li>
      <li>
        <Link to="/profile" className="btn btn-floating pink lighten-1">
          {props.profile.initials}
        </Link>
      </li>
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
