import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Star from '@/assets/star.png';
import EmptyStar from '@/assets/star-empty.png';

const StyledStar = styled.img`
    width: 20px;
    height: auto;
    cursor: pointer;
`;

const StarRatingInput = ({ maxStars = 5 , onRatingChange }: { maxStars?: number; onRatingChange: (rating: number) => void }) => {
    const [currentRating, setCurrentRating] = useState(1);
    const [hoveredRating, setHoveredRating] = useState(1);

    const handleMouseEnter = (index:number) => setHoveredRating(index + 1);
    const handleMouseLeave = () => setHoveredRating(0);
    const handleClick = (index: number) => {
        const rating = index + 1;
        setCurrentRating(rating);
        onRatingChange(rating);
    };

    useEffect(() => {
        setCurrentRating(1);
    }, [window.location.pathname]);

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
