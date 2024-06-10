import useHomePage from "@/hooks/useHomePage";
import { MainContainer, Input, ButtonWithHoverAnimation } from "@/styles";
import { SelectUserContainer,SelectUser,
    DescriptionContainer, BoldSpan,
    CategoriesContainer, Category,SelectedContents,
    SearchContainer, SearchButton,
    ContentsListContainer, ContentsList
 } from "@/styles/Home.style";
 import { Link } from "react-router-dom";

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
        canSubmit,
        clickRecommend,
        loadingRecommend,
        recommendContents
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
            <br/>
            <br/>
            <br/>
            <DescriptionContainer>
                <BoldSpan>재밌게 시청했던 콘텐츠를 골라주세요.</BoldSpan>
                <br/>
                <span>지금까지 시청한 작품 중 인상 깊었거나 기억에 남는 작품들을 골라주세요.</span>
                <span>콘텐츠를 추천하는데 참고할 것입니다.</span>
            </DescriptionContainer>
            <CategoriesContainer>
                {currentData.likeContents.length === 0 && <SelectedContents>검색을 통해 콘텐츠를 추가해주세요.</SelectedContents>}
                {currentData.likeContents.map(v => (
                    <SelectedContents key={v.id}>
                        {v.title}
                        <span className="material-icons" onClick={removeLikeContents(v.id)} style={{color:"var(--main-color)",fontSize:"1rem"}}>cancel</span>
                    </SelectedContents>
                ))}
            </CategoriesContainer>
            <SearchContainer>
                <Input type="text" ref={keywordRef} />
                <SearchButton onClick={fetchSearch}>검색</SearchButton>
            </SearchContainer>
            <ContentsListContainer>
                {loadingUpdate && <div>검색 중...</div>}
                {!loadingUpdate && searchedContents === null && <div> 재밌게 시청했던 콘텐츠를 검색해보세요.</div>}
                {searchedContents && searchedContents.map(v => (
                    <ContentsList key={v.id} onClick={addLikeContents(v)}>
                        <div>
                            <BoldSpan>{v.title}</BoldSpan>
                            <span> ({v.release_year})</span>
                            <br/>
                            <span>{v.categories.join(", ")}</span>
                        </div>
                        <span className="material-icons" style={{color:"#33cc88"}}>add_circle</span> 
                    </ContentsList>
                ))}
                {error && <div>{error.message}</div>}
            </ContentsListContainer>
            {canSubmit && <ButtonWithHoverAnimation style={{width:"100%",maxWidth:300,margin:"50px auto"}}>추천받기</ButtonWithHoverAnimation>}
            {!canSubmit && <ButtonWithHoverAnimation style={{width:"100%",maxWidth:500,margin:"50px auto",flexDirection:"column"}} disabled>
                <span onClick={clickRecommend}>추천받기</span>
                <span style={{fontWeight:"400"}}>각 사용자 별로 최소 1개 이상의 카테고리 선호도를 선택해주세요.</span>
                </ButtonWithHoverAnimation>}
            {loadingRecommend && <div>추천 중...</div>}
            <ContentsListContainer>
                {recommendContents && recommendContents.map(v => (
                    <ContentsList key={v.id}>
                        <div>
                            <BoldSpan>{v.title}</BoldSpan>
                            <span> ({v.release_year})</span>
                            <br/>
                            <span>{v.categories.join(", ")}</span>
                        </div>
                        <Link className="material-icons" to={`/review/${v.id}`}>add_circle</Link>
                    </ContentsList>
                ))}
            </ContentsListContainer>
        </MainContainer>
    );
};

export default Home;
