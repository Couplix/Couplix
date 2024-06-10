import Star from '@/assets/star.png';
import HalfStar from '@/assets/star-half-empty.png';
import EmptyStar from '@/assets/star-empty.png';
import styled from 'styled-components';

const StyledStar = styled.img`
    width: 20px; /* 별의 너비 조정 */
    height: auto; /* 높이를 너비에 맞게 자동으로 조정 */
`;

function StarRating({ starRating }: { starRating: number }) {
    const maxStars = 5;
    const filledStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 !== 0;

    return (
        <div>
            {[...Array(filledStars)].map((_, index) => (
                <StyledStar key={index} src={Star} alt="Filled Star" />
            ))}
            {hasHalfStar && <StyledStar src={HalfStar} alt="Half Star" />}
            {[...Array(maxStars - filledStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
                <StyledStar key={filledStars + (hasHalfStar ? 1 : 0) + index} src={EmptyStar} alt="Empty Star" />
            ))}
        </div>
    );
}

export default StarRating;
