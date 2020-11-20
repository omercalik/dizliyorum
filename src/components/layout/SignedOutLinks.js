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
          <Link to="/signup">Signup</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/signin">Login</Link>
        </MenuLink>
      </Menu>
    </>
  );
};

export default SignedOutLinks;
