import useReviewPage from "@/hooks/useReviewPage";
import { Input, MainContainer } from "@/styles";
import { SearchContainer, SearchButton, ContentsListContainer, 
    ContentsList, BoldSpan, DescriptionContainer } from "@/styles/Home.style";
import { ContentContainer, ContentDescriptionContainer, RightAlignedContainer, StarRatingButton, StarRatingContainer } from "@/styles/Review.style";
import StarRating from "@/components/StarRating";
import StarRatingInput from "@/components/StarRatingInput";

const Review = () => {
    const {
        error,
        searchedContents,
        loadingUpdate,
        fetchSearch,
        keywordRef,
        content,
        fetchContent
    } = useReviewPage();

    const handleContentClick = (contentId: number) => {
        fetchContent(contentId);
    };

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
                            <span> ({v.releaseYear})</span>
                            <br/>
                            <span>{v.categories.map((c, index) => (
                                index === v.categories.length - 1 ? c : c + ", "
                            ))}</span>
                        </div>
                    </ContentsList>
                ))}
                {error && <div>{error.message}</div>}
            </ContentsListContainer>
            <ContentContainer>
            {content?.title ? (
                <div>
                    <RightAlignedContainer>
                        <BoldSpan>{content.title}</BoldSpan>
                            <StarRating starRating={content.starRating}/>
                        <BoldSpan>{content.starRating}</BoldSpan>
                    </RightAlignedContainer>
                    <br/>
                    <br/>
                    <ContentDescriptionContainer>
                        <span>감독: {content.director.join(", ")}</span>
                        <br/>
                        <span>출연: {content.cast.join(", ")}</span>
                        <br/>
                        <span>개봉연도: {content.releaseYear}</span>
                        <br/>
                        <br/>
                        <span>{content.description}</span>
                    </ContentDescriptionContainer>
                    <br/>
                    <br/>
                    <StarRatingContainer>
                        <StarRatingInput />
                        <StarRatingButton>평점 작성</StarRatingButton>
                    </StarRatingContainer>
                </div>
            ) : (
                null
            )}
            </ContentContainer>
        </MainContainer>
    )
}

export default Review;