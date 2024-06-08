import useReviewPage from "@/hooks/useReviewPage";
import { Input } from "@/styles";
import { SearchContainer, SearchButton, ContentsListContainer, 
    ContentsList, BoldSpan, DescriptionContainer } from "@/styles/Home.style";

const Review = () => {
    const {
        error,
        searchedContents,
        loadingUpdate,
        fetchSearch,
        keywordRef
    } = useReviewPage();

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
                    <ContentsList key={v.id}>
                        <div>
                            <BoldSpan>{v.title}</BoldSpan>
                            <span> ({v.releaseYear})</span>
                            <br/>
                            <span>{v.category}</span>
                            <br/>
                            <span>시청 등급: {v.rating}</span>
                        </div>
                    </ContentsList>
                ))}
                {error && <div>{error.message}</div>}
            </ContentsListContainer>
        </div>
    )
}

export default Review;