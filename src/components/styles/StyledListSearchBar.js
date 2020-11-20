import styled from 'styled-components';

export const StyledListSearchBar = styled.div`
  width: 50%;
  height: 85px;
  background: transparent;
  padding: 20px 30px 0px 20px;
  box-sizing: border-box;
  color: #fff;
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
    left: 0px;
    margin: 8px 0;
    padding: 0 0 10px 60px;
    border: 0;
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
