import { styled } from "styled-components";
import {
    FlexRowCenter, FlexRowSpaceBetween, FlexRowLeftStart,
    FlexColumnCenter, FlexColumnLeftStart, FlexColumnStretchCenter,
    MainColorBackground, ReverseMainColorBackground, clickable, ButtonCss, lightGrayBackground
} from './';
import { preferState } from "@/utils/types";

export const SelectUserContainer = styled.div`
    ${FlexRowCenter}
    margin: 0px auto 10px;
    border-radius: 5px;
    width: fit-content;
    overflow: hidden;
`;

export const SelectUser = styled.div<{$active: boolean}>`
    background-color: ${props => props.$active ? 'var(--main-color)' : '#791010'};
    color: white;
    font-weight: ${props => props.$active ? '700' : '400'};
    box-shadow: ${props => props.$active ? '0 0 15px 10px rgba(0,0,0,0.5)' : 'none'};
    z-index: ${props => props.$active ? '1' : '0'};
    ${clickable}
    border-radius: 0;
    padding: 2px 30px;
    cursor: pointer;
`;

export const DescriptionContainer = styled.div`
    ${FlexColumnCenter}
    margin-bottom: 10px;
    gap: 5px;
`;

export const BoldSpan = styled.span`
    font-weight: 700;
    font-size: 1.2rem;
`;

export const CategoriesContainer = styled.div`
    ${FlexRowCenter}
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
`;

export const Category = styled.div<{$preferState: preferState}>`
    background-color: ${props => props.$preferState === preferState.prefer ? '#ffc0cb' : props.$preferState === preferState.dislike ? '#ccc' : '#fff'};
    color: ${props => props.$preferState === preferState.prefer ? '#000' : props.$preferState === preferState.dislike ? '#666' : '#000'};
    ${clickable}
    padding: 5px 10px;
    width: 130px;
    display: flex;
    align-items: center;
    border-radius: 5px;

    &::before {
        content: ${props => props.$preferState === preferState.prefer ? '"favorite"' : props.$preferState === preferState.dislike ? '"highlight_off"' : '""'};
        color: ${props => props.$preferState === preferState.prefer ? '#ff3399' : props.$preferState === preferState.dislike ? '#f00' : '#000'};
        font-family: 'Material Icons';
        display: inline-block;
        width: 20px;
    }
`;

export const SearchContainer = styled.div`
    ${FlexRowCenter}
    margin-bottom: 10px;
`;

export const SearchButton = styled.button`
    ${ButtonCss}
    ${MainColorBackground}
    padding: 8px 10px;
`;
