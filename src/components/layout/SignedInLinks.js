import React, { useState } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { Menu, MenuLink, Hamburger } from '../styles/StyledNavigation';

const SignedInLinks = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink>
          <Link to="/create">New List</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/toplists">Top 100</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/nowplaying">Vizyondakiler</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/lists">Watchlist</Link>
        </MenuLink>
        <MenuLink>
          <a onClick={props.signOut}>Log Out </a>
        </MenuLink>
        <MenuLink>
          <Link to="/profile">{props.profile.initials}</Link>
        </MenuLink>
      </Menu>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
