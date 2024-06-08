import useReviewPage from "@/hooks/useReviewPage";
import { Input } from "@/styles";
import { SearchContainer, SearchButton, ContentsListContainer, 
    ContentsList, BoldSpan, DescriptionContainer } from "@/styles/Home.style";
import { ContentContainer, ContentDescriptionContainer } from "@/styles/Review.style";

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
        <div>
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
                    <BoldSpan>{content.title}</BoldSpan>
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
                </div>
            ) : (
                null
            )}
            </ContentContainer>

        </div>
    )
}

export default Review;