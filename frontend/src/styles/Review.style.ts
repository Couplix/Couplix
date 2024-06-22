import styled from "styled-components";
import {
    FlexRowCenter, FlexRowSpaceBetween,
    FlexColumnCenter, MainColorBackground, clickable,
    ButtonCss
} from './';

export const ContentContainer = styled.div`
    ${FlexColumnCenter};
`;

export const ContentDescriptionContainer = styled.div`
    margin-left: 1rem;
`;

export const RightAlignedContainer = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-end;
`;

export const StarRatingContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: flex-end;
`

export const StarRatingButton = styled.button`
    ${MainColorBackground};
    ${FlexRowCenter};
    ${clickable};
    padding: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    font-align: center;
`

export const ReviewInputContainer = styled.div`
    display: flex;
    align-items: flex-start;
`

export const ReviewInput = styled.textarea`
    width: 90%;
    overflow-y: scroll;
    height: 100px;
    resize: none;
    border-radius: 5px 0 0 5px;
`

export const ReviewButton = styled.button`
    ${MainColorBackground};
    ${ButtonCss};
    height: 100px;
    border-radius: 0 5px 5px 0;
`

export const Reviews = styled.div`
    width: 90%;
    border: 1px solid var(--header-color);
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 3px;
    background-color: #3a3a3a;
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

export const ReviewId = styled.span`
    flex-shrink: 0;
`;

export const ReviewText = styled.span`
    flex-grow: 1;
`;
