import styled from 'styled-components';

export const StyledMovieNavigation = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #393e46;
  color: #eeeeee;

  .navigation-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;

    p {
      font-family: 'Abel', sans-serif;
      font-size: 22px;
      float: left;
      color: #fff;
      padding-right: 10px;
      text-decoration: none;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
`;
