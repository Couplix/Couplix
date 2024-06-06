import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: var(--background-color);
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
  }
`;
