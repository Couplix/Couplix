import React, { useState } from 'react';
import styled from 'styled-components';
import Star from '@/assets/star.png';
import EmptyStar from '@/assets/star-empty.png';

const StyledStar = styled.img`
    width: 20px;
    height: auto;
    cursor: pointer;
`;

const StarRatingInput = ({ maxStars = 5 }) => {
    const [currentRating, setCurrentRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleMouseEnter = (index) => setHoveredRating(index + 1);
    const handleMouseLeave = () => setHoveredRating(0);
    const handleClick = (index) => {
        const rating = index + 1;
        setCurrentRating(rating);
    };

    return (
        <div>
            {[...Array(maxStars)].map((_, index) => (
                <StyledStar
                    key={index}
                    src={(hoveredRating || currentRating) > index ? Star : EmptyStar}
                    alt={`${index + 1} star`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

export default StarRatingInput;
