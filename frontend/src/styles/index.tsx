import {styled, css } from 'styled-components';

export const FlexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexRowSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexRowLeftStart = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const FlexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FlexColumnLeftStart = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FlexColumnStretchCenter = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

export const MainColorBackground = css`
  background-color: var(--main-color);
  color: white;
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

export const ReverseMainColorBackground = css`
  background-color: white;
  color: var(--main-color);
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

export const lightGrayBackground = css`
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: black;
`;

export const GrayBackground = css`
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
`;

export const clickable = css`
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
`;

export const ButtonCss = css`
  ${FlexRowCenter};
  ${clickable};
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

export const ButtonWithHoverAnimation = styled.button<{ disabled?: boolean }>`
  ${ButtonCss};
  ${props => props.disabled ? GrayBackground : MainColorBackground};
  &:hover {
    ${props => props.disabled ? GrayBackground: ReverseMainColorBackground};
  }
`;

export const ReverseButtonWithHoverAnimation = styled.button`
  ${ButtonCss};
  ${ReverseMainColorBackground};
  &:hover {
    ${MainColorBackground};
  }
`;

export const HeaderButton = styled.button`
  ${ButtonCss};
  ${ReverseMainColorBackground};
`;

export const ButtonContainingIcon = styled.button<{ $margin?: string }>`
  ${ButtonCss};
  ${MainColorBackground};
  word-break: keep-all;
  padding: 5px 20px;
  ${props => props.$margin && `margin: ${props.$margin};`}
  gap: 10px;
  >span:first-child {
    font-size: 1rem;
  }
`;

export const DisabledButtonContainingIcon = styled(ButtonContainingIcon)`
  ${GrayBackground};
`;

export const ReverseButtonContainingIcon = styled.button<{ $margin?: string }>`
  ${ButtonCss};
  ${ReverseMainColorBackground};
  padding: 5px 20px;
  >span:first-child {
    font-size: 1rem;
  }
`;

export const MainContainer = styled.main<{ $background?: string, $flexdirection?: string }>`
  padding: 20px max(30px, calc(50% - 590px));
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: ${props => props.$flexdirection || 'column'};
  background: ${props => props.$background || 'none'};
  gap: 20px;
  flex-wrap: wrap;
`;

export const HomeContainer = styled.article`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: none !important;
  justify-content: center;
  gap: 20px;
  flex-wrap: nowrap;
  position: relative;
  opacity: 0;
  transform: translateY(50%);
  transition: all 0.5s ease-in-out;
  min-height: calc(70vh - 105px);
  &>*{
    word-break: keep-all;
  }
  &>h2{
    margin-bottom: 0;
  }
  &>p{
    max-width: 600px;
  }
`;

export const LoginContainer = styled.form`
  padding: 20px 30px;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  flex-grow: 1;
  max-width: 300px;
  height: 39px;
  &:focus {
    outline: none;
  }
`;

export const MiniInput = styled(Input)`
  width: 100%;
  margin: 0 5px;
  max-width: 150px;
`;
