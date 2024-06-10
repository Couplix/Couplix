import useReviewPage from "@/hooks/useReviewPage";
import { Input, MainContainer } from "@/styles";
import { SearchContainer, SearchButton, ContentsListContainer, 
    ContentsList, BoldSpan, DescriptionContainer } from "@/styles/Home.style";
import { ContentContainer, ContentDescriptionContainer, ReviewButton, ReviewContainer, ReviewId, ReviewInput, ReviewInputContainer, ReviewText, Reviews, RightAlignedContainer, StarRatingButton, StarRatingContainer } from "@/styles/Review.style";
import StarRating from "@/components/StarRating";
import StarRatingInput from "@/components/StarRatingInput";

const Review = () => {
    const {
        searchedContents,
        loadingUpdate,
        fetchSearch,
        keywordRef,
        content,
        addStarRating,
        handleContentClick,
        handleRatingChange,
        textAreaRef,
        submitReview
    } = useReviewPage();

    return (
        <MainContainer>
            <DescriptionContainer>
                <br/>
                <br/>
                <br/>
                <BoldSpan>콘텐츠의 평점과 리뷰를 살펴보세요.</BoldSpan>
                <br/>
                <span>시청하려고 하는 콘텐츠의 평점과 리뷰를 살펴볼 수 있습니다.</span>
                <span>시청한 콘텐츠에 대해 평점과 리뷰를 작성할 수 있습니다.</span>
                <br/>
            </DescriptionContainer>
            <SearchContainer>
                <Input type="text" ref={keywordRef} />
                <SearchButton onClick={fetchSearch}>검색</SearchButton>
            </SearchContainer>
            <ContentsListContainer>
                {loadingUpdate && <div>검색 중...</div>}
                {!loadingUpdate && searchedContents === null}
                {searchedContents && searchedContents.map(v => (
                    <ContentsList key={v.id} onClick={() => handleContentClick(v.id)}>
                        <div>
                            <BoldSpan>{v.title}</BoldSpan>
                            <span> ({v.release_year})</span>
                            <br/>
                            <span>{v.categories.map((c, index) => (
                                index === v.categories.length - 1 ? c : c + ", "
                            ))}</span>
                        </div>
                    </ContentsList>
                ))}
            </ContentsListContainer>
            <ContentContainer>
            {content && (
                <div>
                    <RightAlignedContainer>
                        <BoldSpan>{content.title}</BoldSpan>
                            <StarRating starRating={content.starRate}/>
                        <BoldSpan>{content.starRate}</BoldSpan>
                    </RightAlignedContainer>
                    <br/>
                    <br/>
                    <ContentDescriptionContainer>
                        <span>감독: {content.director}</span>
                        <br/>
                        <span>출연: {content.cast}</span>
                        <br/>
                        <span>개봉연도: {content.release_year}</span>
                        <br/>
                        <br/>
                        <span>{content.description}</span>
                    </ContentDescriptionContainer>
                    <br/>
                    <br/>
                    <StarRatingContainer>
                        <StarRatingInput onRatingChange={handleRatingChange} />
                        <StarRatingButton onClick={addStarRating}>평점 작성</StarRatingButton>
                    </StarRatingContainer>
                    <ReviewContainer>
                        <DescriptionContainer>
                            <br/>
                            <br/>
                            <br/>
                            <BoldSpan>콘텐츠에 대한 리뷰를 작성해 주세요.</BoldSpan>
                            <br/>
                            <span>콘텐츠를 시청하려고 하는 사용자가 시청 전에 확인할 수 있습니다.</span>
                            <span>다른 사용자를 위해 영화를 평가해 주세요.</span>
                            <br/>
                        </DescriptionContainer>
                        <ReviewInputContainer>
                            <ReviewInput
                                maxLength={500}
                                placeholder="텍스트를 입력하세요. (500자 이하)"
                                ref={textAreaRef}
                            />
                            <ReviewButton onClick={submitReview}>작성하기</ReviewButton>
                        </ReviewInputContainer>
                        <br />
                        <br />
                        <br />
                        {content.reviews.map((review,index) => (
                            <Reviews key={index+1}>
                                <ReviewId>{index+1}:</ReviewId>
                                <ReviewText>{review}</ReviewText>
                                <br />
                            </Reviews>
                        ))}
                    </ReviewContainer>
                </div>
            )}
            </ContentContainer>
        </MainContainer>
    )
}

export default Review;
