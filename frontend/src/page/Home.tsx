import useHomePage from "@/hooks/useHomePage";
import { MainContainer, Input, ButtonWithHoverAnimation } from "@/styles";
import { SelectUserContainer,SelectUser,
    DescriptionContainer, BoldSpan,
    CategoriesContainer, Category,SelectedContents,
    SearchContainer, SearchButton,
    ContentsListContainer, ContentsList,
    URLSearchInput,
    URLSearchContainer,
 } from "@/styles/Home.style";
 import { Link } from "react-router-dom";

const Home = () => {
    const {
        loading, categories, error,
        searchedContents, searchError, loadingUpdate, currentUser,
        currentData, getPreferState, shareLink, rotatePreferState, addLikeContents,
        removeLikeContents, fetchSearch, setToUser1, setToUser2, keywordRef,
        canSubmit, onChangeKeyword, clickRecommend, loadingRecommend,
        recommendContents, handleURLSearch, urlInputRef,
        page,setPages,nextPages,prevPages
    } = useHomePage();

    return (
        <MainContainer>
            <SelectUserContainer>
                <SelectUser onClick={setToUser1} $active={currentUser === 1}>User1</SelectUser>
                <SelectUser onClick={setToUser2} $active={currentUser === 2}>User2</SelectUser>
            </SelectUserContainer>
            <URLSearchContainer>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                    <BoldSpan>현재 유저 정보 공유하기</BoldSpan>
                    <span className="material-icons" style={{fontSize:"1.5rem",cursor:"pointer"}} onClick={shareLink}>share</span>
                </div>
            </URLSearchContainer>
                <BoldSpan style={{margin:"auto"}}>유저 정보 불러오기</BoldSpan>
            <SearchContainer>
                <Input type="text" ref={urlInputRef} style={{maxWidth:500}} placeholder="공유받은 URL ex) https://couplix.raipen.com/?prefer="></Input>
                <SearchButton onClick={handleURLSearch}>확인</SearchButton>
            </SearchContainer>
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
                <Input type="text" ref={keywordRef} onChange={onChangeKeyword} placeholder="ex) kingdom"></Input>
                <SearchButton onClick={fetchSearch}>검색</SearchButton>
            </SearchContainer>
            <ContentsListContainer  style={{maxHeight: "500px"}}>
                {loadingUpdate && <div>검색 중...</div>}
                {!loadingUpdate && searchError && <div>{searchError}</div>}
                {!loadingUpdate && !searchError && searchedContents === null && <div> 재밌게 시청했던 콘텐츠를 검색해보세요.</div>}
                {!loadingUpdate && !searchError && searchedContents && searchedContents.map(v => (
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
            </ContentsListContainer>
            {canSubmit && <ButtonWithHoverAnimation style={{width:"100%",maxWidth:300,margin:"50px auto"}} onClick={clickRecommend}>추천받기</ButtonWithHoverAnimation>}
            {!canSubmit && <ButtonWithHoverAnimation style={{width:"100%",maxWidth:500,margin:"50px auto",flexDirection:"column"}} disabled>
                <span>추천받기</span>
                <span style={{fontWeight:"400"}}>각 사용자 별로 최소 1개 이상의 카테고리 선호도를 선택해주세요.</span>
                </ButtonWithHoverAnimation>}
            {loadingRecommend && <div>추천 중...</div>}
            {recommendContents && <ContentsListContainer>
                {recommendContents.length === 0 && <div>추천할 콘텐츠가 없습니다.</div>}
                {recommendContents.filter((e,i)=>i>(page-1)*10&&i<page*10).map(v => (
                    <ContentsList key={v.id} style={{userSelect:"auto",cursor:"default"}}>
                        <div>
                            <BoldSpan>{v.title}</BoldSpan>
                            <span> ({v.release_year})</span>
                            <br/>
                            <span> 추천점수: {v.score}</span>
                            <br/>
                            <span>{v.categories.join(", ")}</span>
                        </div>
                        <Link to={`/reviews/${v.id}`} style={{display:"flex",alignItems:"center",userSelect:"none",cursor:"pointer"}} reloadDocument target="_blank">
                        <span> 리뷰 및 정보 보기 </span>
                        <span className="material-icons">chevron_right</span>
                        </Link>
                    </ContentsList>
                ))}
                <div style={{display:"flex",justifyContent:"center",gap:10,alignItems:"center"}}>
                    {<span className="material-icons" onClick={prevPages} style={{
                            cursor:"pointer",
                            userSelect:"none"}}>arrow_back_ios</span>}
                    {Array.from({length:Math.ceil(recommendContents!.length/10)},
                        (v,i)=><span key={i} onClick={setPages(i+1)} style={{
                            cursor:"pointer",
                            userSelect:"none",
                            fontWeight:page===i+1?700:400,
                            fontSize:page===i+1?"1.2rem":"1rem",
                        }}>{i+1}</span>)
                    }
                    {<span className="material-icons" onClick={nextPages} style={{
                            cursor:"pointer",
                            userSelect:"none"}}>arrow_forward_ios</span>}
                </div>
            </ContentsListContainer>}
        </MainContainer>
    );
};

export default Home;
