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
          <Link to="/create">Yeni Liste</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/toplists">Top 100</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/nowplaying">Vizyondakiler</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/lists">İzleme Listesi</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/movies">Filmler</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/tvserials">Diziler</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/oyun">Oyunlar</Link>
        </MenuLink>
        <MenuLink>
          <a onClick={props.signOut}>Çıkış Yap </a>
        </MenuLink>
        <MenuLink>
          <Link to="/profile">Profil</Link>
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
