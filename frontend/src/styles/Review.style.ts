import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
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
    ${MainColorBackground}
    ${FlexRowCenter};
    ${clickable};
    padding: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    font-align: center;
`