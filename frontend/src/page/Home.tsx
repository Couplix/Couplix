import useHomePage from "@/hooks/useHomePage";
import { MainContainer, Input } from "@/styles";
import { SelectUserContainer,SelectUser,
    DescriptionContainer, BoldSpan,
    CategoriesContainer, Category,
    SearchContainer, SearchButton
 } from "@/styles/Home.style";

const Home = () => {
    const {
        loading,
        categories,
        error,
        searchedContents,
        loadingUpdate,
        currentUser,
        currentData,
        getPreferState,
        rotatePreferState,
        addLikeContents,
        removeLikeContents,
        fetchSearch,
        setToUser1,
        setToUser2,
        keywordRef,
    } = useHomePage();

    return (
        <MainContainer>
            <SelectUserContainer>
                <SelectUser onClick={setToUser1} $active={currentUser === 1}>User1</SelectUser>
                <SelectUser onClick={setToUser2} $active={currentUser === 2}>User2</SelectUser>
            </SelectUserContainer>
            <DescriptionContainer>
                <BoldSpan>선호/기피하는 카테고리들을 골라주세요.</BoldSpan>
                <BoldSpan>선택한 장르의 콘텐츠가 더 많이 추천됩니다.</BoldSpan>
                <br/>
                <span> 선호하는 카테고리는 한번, 기피하는 카테고리는 두번 클릭해주세요.</span>
            </DescriptionContainer>
            <CategoriesContainer>
                {loading && <div>카테고리 불러오는 중...</div>}
                {error && <div>{error.message}</div>}
                {categories && categories.map(v => (
                    <Category key={v.id} onClick={rotatePreferState(v.id)} $preferState={getPreferState(v.id)}>
                        {v.name}
                    </Category>
                ))}
            </CategoriesContainer>
            <DescriptionContainer>
                <BoldSpan>재밌게 시청했던 콘텐츠를 골라주세요.</BoldSpan>
                <br/>
                <span>지금까지 시청한 작품 중 인상 깊었거나 기억에 남는 작품들을 골라주세요.</span>
                <span>콘텐츠를 추천하는데 참고할 것입니다.</span>
            </DescriptionContainer>
            <CategoriesContainer>
                {currentData.likeContents.map(v => (
                    <div key={v.id}>
                        {v.title}
                        <button onClick={removeLikeContents(v.id)}>삭제</button>
                    </div>
                ))}
            </CategoriesContainer>
            <SearchContainer>
                <Input type="text" ref={keywordRef} />
                <SearchButton onClick={fetchSearch}>검색</SearchButton>
            </SearchContainer>
            <SearchContainer>
                {loadingUpdate && <div>검색 중...</div>}
                {!loadingUpdate && searchedContents === null && <div> 재밌게 시청했던 콘텐츠를 검색해보세요.</div>}
                {searchedContents && searchedContents.map(v => (
                    <div key={v.id}>
                        <div>
                            <span>{v.title}</span>
                            <span>{v.category}</span>
                            <span>{v.releaseYear}</span>
                            <span>{v.rating}</span>
                        </div>
                        <button onClick={addLikeContents(v)}>추가</button>
                    </div>
                ))}
                {error && <div>{error.message}</div>}
            </SearchContainer>
        </MainContainer>
    );
};

export default Home;
