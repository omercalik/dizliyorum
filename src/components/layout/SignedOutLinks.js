import React from 'react';
import { Link } from '@reach/router';

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/signin">Login</Link>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
