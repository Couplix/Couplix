import styled from "styled-components";
import { FlexRowCenter, clickable, MainColorBackground } from ".";

export const ContentContainer = styled.div`
    margin: 0 5rem;
`;

export const ContentDescriptionContainer = styled.div`
    margin: 0 1rem;
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

export const ReviewContainer = styled.div`
    
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
`

export const ReviewButton = styled.button`
    background-color: var(--main-color);
    color: white;
    border: 1px solid var(--main-color);
    ${FlexRowCenter};
    ${clickable};
    padding: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    font-align: center;
    width: 10%;
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