import React, { useState } from 'react';
import { Link } from '@reach/router';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { StyledNavigation, Logo, Hamburger } from '../styles/StyledNavigation';

const Navbar = (props) => {
  const { auth, profile } = props;

  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  return (
    <StyledNavigation>
      <Logo>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Dizliyorum
        </Link>
      </Logo>

      {links}
    </StyledNavigation>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
