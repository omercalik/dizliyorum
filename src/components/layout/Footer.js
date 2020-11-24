import React from 'react';
import { StyledFooter } from '../styles/StyledFooter';

export const Footer = () => {
  return (
    <StyledFooter>
      <footer class="page-footer">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="white-text">Dizliyorum</h5>
              <p class="grey-text text-lighten-4">
                Türkiyenin eğlence platformu
              </p>
            </div>
            <div class="col l4 offset-l2 s12">
              <h5 class="white-text">Links</h5>
              <ul>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container ftr">
            © 2020 - Dizliyorum tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </StyledFooter>
  );
};
