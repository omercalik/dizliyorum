import React from 'react';
import { Link } from '@reach/router';
import { Menu, MenuLink, Hamburger } from '../styles/StyledNavigation';

const SignedOutLinks = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>

      <Menu isOpen={isOpen}>
        <MenuLink>
          <Link to="/signup">Üye Ol</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/signin">Giriş Yap</Link>
        </MenuLink>
      </Menu>
    </>
  );
};

export default SignedOutLinks;
