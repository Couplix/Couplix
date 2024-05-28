import {styled, css, keyframes } from 'styled-components';

const FlexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexRowSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexRowLeftStart = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const FlexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexColumnLeftStart = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FlexColumnStretchCenter = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const MainColorBackground = css`
  background-color: var(--main-color);
  color: white;
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

const ReverseMainColorBackground = css`
  background-color: white;
  color: var(--main-color);
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

const lightGrayBackground = css`
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: black;
`;

const GrayBackground = css`
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
`;

const clickable = css`
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
`;

const ButtonCss = css`
  ${FlexRowCenter};
  ${clickable};
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

export const ButtonWithHoverAnimation = styled.button`
  ${ButtonCss};
  ${MainColorBackground};
  &:hover {
    ${ReverseMainColorBackground};
  }
`;

export const ReverseButtonWithHoverAnimation = styled.button`
  ${ButtonCss};
  ${ReverseMainColorBackground};
  &:hover {
    ${MainColorBackground};
  }
`;

export const HeaderButton = ReverseButtonWithHoverAnimation;

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
  border: 1px solid var(--main-color);
  border-radius: 5px;
  flex-grow: 0;
  &:focus {
    outline: none;
    border: 1px solid var(--main-color);
  }
`;

export const MiniInput = styled(Input)`
  width: 100%;
  margin: 0 5px;
  max-width: 150px;
`;

export const WordbookListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 220px);
  padding: 10px 15px;
  height: 100%;
  margin-left: auto;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0;
  }
`;

export const Title = styled.div`
  ${FlexRowSpaceBetween};
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 10px;
`;

export const Expend = styled.span`
  ${clickable};
  color: var(--main-color);
  padding: 5px 20px;
  font-size: 2rem;
`;

export const WordbookContainer = styled.div`
  ${FlexRowSpaceBetween};
  margin-bottom: 10px;
  border-top: 1px solid var(--main-color);
  padding: 10px;
  gap: 10px;
`;

export const AddWordbookContainer = styled(WordbookContainer)`
  ${FlexRowLeftStart};
  gap: 10px;
`;

export const WordbookMenu = styled.div`
  ${FlexColumnCenter};
  &>span{
    ${clickable};
    font-size: 1.2rem;
  }
  color: var(--muted-text-color);
  font-weight: 300;
  gap: 10px;
`;

export const WordbookInfo = styled.div`
  ${FlexColumnLeftStart};
  font-size: 1rem;
  font-weight: 300;
  max-width: calc(100% - 50px);
  flex: 1;
  color: var(--muted-text-color);
`;

export const WordbookName = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &>a:last-child {
    color: var(--main-color);
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &>input{
    font-weight: 600;
    width: calc(100% - 21px);
  }
  &>.material-icons-sharp{
    font-size: 1rem;
    margin-right: 5px;
  }
`;

export const VocaListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: calc(100% - 320px);
  padding: 10px 15px;
  height: 100%;
  margin-left: auto;
  @media (max-width: 750px) {
    width: 100%;
    max-width: none;
    padding: 0;
  }
`;

export const VocaListElement = styled.div`
  display: grid;
  width: auto;
  max-width: calc(100vw - 320px);
  min-width: 300px;
  grid-template-columns: auto 1px auto;
  margin-bottom: 10px;
  align-items: start;
  overflow-wrap: anywhere;
  &>div {
    border-top: 1px solid var(--main-color);
  }
  @media (max-width: 750px) {
    width: 100%;
    max-width: none;
    min-width: 0;
  }
`;

export const SeparateLine = styled.div`
  padding: 0;
  background: linear-gradient(0, white 10%, #ccc 20%, #ccc 80%, white 90% );
  width: 100%;
  height: 100%;
`;

export const Icon = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  padding-block: 0;
  padding-inline: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--main-color);
`;

export const UnactivatableIcon = styled(Icon)`
  ${clickable};
  &:hover {
    color: #ccc;
  }
`;

export const ActivatableIcon = styled(Icon)`
  ${clickable};
  color: #ccc;
  &:hover {
    color: var(--main-color);
  }
`;

export const WarningClickableIcon = styled(Icon)`
  ${clickable};
  color: red;
  &:hover {
    color: #ccc;
  }
`;

export const Meaning = styled.div`
  ${FlexColumnStretchCenter};
  counter-reset: meaning;
  height: 100%;
  padding: 5px 10px;
`;

export const MeaningCount = styled.div`
  ${FlexRowLeftStart};
  gap: 5px;
  padding: 5px 0;
  &::before {
    counter-increment: meaning;
    content: counter(meaning) ". ";
    flex-shrink: 0;
  }
`;

export const MeaningWithAnswer = styled.div<{ $correct?: boolean }>`
  ${FlexColumnLeftStart};
  &>span:first-child {
    font-weight: 600;
    color: ${props => props.$correct ? '#00c000' : '#ff4444'};
    text-decoration: ${props => props.$correct ? 'none' : 'line-through'};
  }
  &>span:last-child {
    font-weight: 300;
    font-size: 0.9rem;
    margin-left: 10px;
  }
`;

export const FilpCardContainer = styled.div<{$reversed?: boolean}>`
  display: inline-block;
  width: 100%;
  padding-left: 5px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
  &:hover{
    border-radius: 5px;
    box-shadow: 0 0 10px 0 #ccc;
    border-color: white;
  }
`;

export const FilpCard = styled.div<{$reversed?: boolean}>`
  width: fit-content;
  transition: all 0.3s ease-in-out;
  transform: perspective(1500px) rotateX(${props => props.$reversed?180:0}deg);
  backface-visibility: hidden;
`;

export const MeaningHeader = styled.div`
  ${FlexRowCenter};
  padding: 5px 10px;
  >div {
    ${clickable};
    padding: 5px 10px;
    margin: 0 5px;
    ${lightGrayBackground};
    &:hover {
      ${GrayBackground};
    }
  }
`;

export const SelectButton = styled.div<{$active: boolean}>`
  ${FlexRowCenter};
  ${clickable};
  ${props => props.$active?MainColorBackground:lightGrayBackground};
  padding: 5px 10px;
  font-weight: 600;
  >span:first-child {
    font-size: 1rem;
  }
  &:hover {
    ${props => !props.$active&&GrayBackground};
  }
`;

export const InputWithLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PageLink = styled.div`
  width: fit-content;
  gap: 5px;
  padding: 5px 10px;
  ${clickable};
  border-radius: 5px;
  &:hover {
    color: var(--main-color);
    background-color: RGBA(0,0,0,0.1);
  }
  &>span {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  &>.material-icons-sharp {
    font-size: 1rem;
    text-decoration: none;
    margin-right: 5px;
  }
`;

export const NewPageLink = ({text}:{text: string|undefined}) => {
  return (
    <PageLink>
      <div className="material-icons-sharp">open_in_new</div>
      <span>{text}</span>
    </PageLink>
  );
}

const BounceAnimation = keyframes`
    0%, 100% {
      transform: translate(-50%, 0);
    }
    50% {
      transform: translate(-50%, 10px);
    }
`;

export const ScrollBottom = styled.div`
  ${clickable};
  position: absolute;
  bottom: 10px;
  left: 50%;
  font-size: 3rem;
  width: fit-content;
  animation: ${BounceAnimation} 1s infinite;
`;

export const ImageContainer = styled.img`
  border: 3px solid var(--main-color);
  border-radius: 10px;
`;

