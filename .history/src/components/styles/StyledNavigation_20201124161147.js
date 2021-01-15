import styled from 'styled-components';

export const StyledNavigation = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #2b2e4a;
`;

export const Logo = styled.div`

  padding: 1rem 0;
  color: #6a097d
  font-weight: 800;
  font-size 1.7rem;

  
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MenuLink = styled.div`
  a {
    padding: 1rem 2rem;
    cursor: pointer;
    text-align: center;
    color: #eeeeee;
    text-decoration: none;
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${(props) => (props.isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
  }
`;
