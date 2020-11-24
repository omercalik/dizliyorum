import styled from 'styled-components';

export const StyledListSearchBar = styled.div`
  width: 50%;
  height: 85px;
  background: transparent;
  padding: 20px 30px 0px 20px;
  box-sizing: border-box;
  color: #fff;

  @media screen and (max-width: 720px) {
    width: 100%;
    font-size: 15px;

    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: transparent;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: transparent;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: transparent;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: transparent;
    }
    input::placeholder {
      color: transparent;
    }
    textarea::-webkit-input-placeholder {
      /* WebKit browsers */
      color: transparent;
    }
    textarea:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: transparent;
    }
    textarea::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: transparent;
    }
    textarea:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: transparent;
    }
    textarea::placeholder {
      color: transparent;
    }
  }
`;

export const StyledListSearchBarResultContainer = styled.div`
  display: block;
  max-height: 300px;
  overflow: auto;
`;

export const StyledListSearchBarContent = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 45px;
  background: #353535;
  margin: 0 auto;
  border-radius: 40px;
  position: relative;
  color: #fff;

  .fa-search {
    position: absolute;
    left: 20px;
    top: 7px;
    color: #fff;
    z-index: 1000;
  }

  input {
    font-family: 'Abel', sans-serif;
    font-size: 20px;
    position: absolute;

    left: 50px;
    margin: 8px 0;
    padding: 0 0 10px 60px;
    border: none !important;
    width: 95%;
    background: transparent;
    height: 40px;
    color: #fff;
    box-sizing: border-box;

    :focus {
      outline: none;
    }

    @media screen and (max-width: 720px) {
      font-size: 15px;
    }
  }
`;
