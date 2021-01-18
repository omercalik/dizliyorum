import React from 'react';
import { StyledFooter } from '../styles/StyledFooter';

export const Footer = () => {
  return (
    <StyledFooter>
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="grey-text text-lighten-4">Dizliyorum</h5>
              <p className="grey-text text-lighten-4">
                Türkiyenin eğlence platformu
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="grey-text text-lighten-4">Links</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container ftr">© 2020 - Dizliyorum</div>
        </div>
      </footer>
    </StyledFooter>
  );
};
