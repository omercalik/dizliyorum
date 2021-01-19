import styled from 'styled-components';

export const StyledActor = styled.div`
  font-family: 'Abel', sans-serif;
  color: white;
  background: #0b090a;
  border-radius: 20px;
  padding: 5px;
  text-align: center;

  img {
    display: block;
    width: 100%;
    object-fit: fill;
    border-radius: 15px;
  }

  .actor-name {
    display: block;
    font-size: 18px;
    margin: 10px 0 0 0;
  }

  .actor-character {
    display: block;
    font-size: 16px;
    margin: 0 0 10px 0;
  }
`;
