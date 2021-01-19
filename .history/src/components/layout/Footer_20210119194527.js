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
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container ftr">© 2020 - Dizliyorum</div>
        </div>
      </footer>
    </StyledFooter>
  );
};
