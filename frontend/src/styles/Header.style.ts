import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: var(--header-color);
  padding: 20px max(calc(50% - 600px), 20px);
  width: 100%;
  display: flex;
  user-select: none;
  *{
    height: 30px;
  }
  img{
    height: 30px;
  }
  @media (max-width: 600px){
    flex-direction: column;
    gap: 10px;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  margin-left: auto;
`;

export const Menu = styled.div<{$active: boolean}>`
  width: 150px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  border-radius: 5px;
  background-color: ${props => props.$active ? 'var(--main-color)' : 'var(--header-color)'};
`;
