import { useState,useRef, useEffect } from "react";
import useFetchUpdate from "./useFetchUpdate";
import useFetchWithRendering from "./useFetchWithRendering";
import { ContentsType, getCategories, getRecommendContents, getContentById } from "@/utils/api";
import { preferState } from "@/utils/types";
import useSearch from "./useSearch";
import { useLocation, useNavigate } from 'react-router-dom';

export type UserData = {
    prefer: number[];
    dislike: number[];
    likeContents: {
        id: number;
        title: string;
    }[];
};

const useHomePage = () => {
    const { loadingUpdate, searchedContents, searchError, keywordRef, clearSearch, onChangeKeyword, fetchSearch } = useSearch();

    const [currentUser, setCurrentUser] = useState<1|2>(1);
    const [user1Data, setUser1Data] = useState<UserData>({
        prefer: [],
        dislike: [],
        likeContents: []
    });
    const [user2Data, setUser2Data] = useState<UserData>({
        prefer: [],
        dislike: [],
        likeContents: []
    });
    const [loading, categories, error] = useFetchWithRendering(getCategories);
    const [loadingRecommend, fetchRecommend] = useFetchUpdate(getRecommendContents);
    const [recommendContents, setRecommendContents] = useState<ContentsType[]|null>(null);
    const urlInputRef = useRef<HTMLInputElement>(null);

    const setUserData =  currentUser === 1 ? setUser1Data : setUser2Data;
    const currentData = currentUser === 1 ? user1Data : user2Data;

    const navigate = useNavigate();

    const getPreferState = (id: number) => {
        if(currentData.prefer.includes(id)) return preferState.prefer;
        if(currentData.dislike.includes(id)) return preferState.dislike;
        return preferState.none;
    }

    const rotatePreferState = (id: number) => () => {
        const state = getPreferState(id);
        switch(state) {
            case preferState.none:
                return setUserData({...currentData, prefer: [...currentData.prefer, id]});
            case preferState.prefer:
                return setUserData({...currentData, prefer: currentData.prefer.filter(v => v !== id), dislike: [...currentData.dislike, id]});
            case preferState.dislike:
                return setUserData({...currentData, dislike: currentData.dislike.filter(v => v !== id)});
        }
    }

    const addLikeContents = ({id,title}: ContentsType) => () => {
        if(currentData.likeContents.some(v => v.id === id)) return alert('이미 추가된 컨텐츠입니다.');
        setUserData({...currentData, likeContents: [...currentData.likeContents, {id, title}]});
        clearSearch();
    };

    const removeLikeContents = (id: number) => () => {
        setUserData({...currentData, likeContents: currentData.likeContents.filter(v => v.id !== id)});
    };

    const setToUser1 = () => {
        setCurrentUser(1);
        clearSearch();
    };

    const setToUser2 = () => {
        setCurrentUser(2);
        clearSearch();
    };

    const canSubmit = user1Data.prefer.length + user1Data.dislike.length > 0 && user2Data.prefer.length + user2Data.dislike.length > 0;

    const clickRecommend = async () => {
        console.log(user1Data, user2Data);
        const data = await fetchRecommend(user1Data, user2Data);
        setRecommendContents(data);
    }

    const updateQueryParams = () => {
        const queryParams = [
            ...currentData.prefer.map(cat => `prefer=${cat}`),
            ...currentData.dislike.map(cat => `dislike=${cat}`),
            ...currentData.likeContents.map(v => `likeContent=${v.id}`)
        ].join('&');
        navigate(`/?${queryParams}`);
    };

    useEffect(() => {
        updateQueryParams();
    }, [currentData]);

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const prefer = queryParams.getAll("prefer").map(Number);
        const dislike = queryParams.getAll("dislike").map(Number);
        const likeContent = queryParams.getAll("likeContent").map(Number);

        if (prefer.length > 0) {
            setUserData(prev => ({ ...prev, prefer }));
        }

        if (dislike.length > 0) {
            setUserData(prev => ({ ...prev, dislike }));
        }

        if (likeContent.length > 0) {
            Promise.all(likeContent.map(id => getContentById(id))).then(data => {
                const likeContents = data.map((content) => ({
                    id: content.id,
                    title: content.title
                }));
                setUserData(prev => ({ ...prev, likeContents }));
            });
        }
    }, [location.search]);

    const handleURLSearch = () => {
        if (urlInputRef.current) {
            const url = urlInputRef.current.value;
            const urlParams = new URLSearchParams(url.split("?")[1]);
    
            const newPrefer = urlParams.getAll("prefer").map(Number);
            const newDislike = urlParams.getAll("dislike").map(Number);
            const newLikeContent = urlParams.getAll("likeContent").map(Number);
    
            if (newPrefer.length > 0) {
                setUserData((prevData) => ({ ...prevData, prefer: newPrefer }));
            }
    
            if (newDislike.length > 0) {
                setUserData((prevData) => ({ ...prevData, dislike: newDislike }));
            }
    
            if (newLikeContent.length > 0) {
                Promise.all(newLikeContent.map((id) => getContentById(id))).then((data) => {
                    const likeContents = data.map((content) => ({
                        id: content.id,
                        title: content.title,
                    }));
                    setUserData((prevData) => ({ ...prevData, likeContents }));
                });
            }
        }
    };

    const shareLink = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if(isMobile){
            if(!navigator.canShare) return alert('공유 기능을 지원하지 않는 브라우저입니다.');
            navigator.share({
                title: '컨텐츠 추천 링크',
                text: '컨텐츠 추천을 받아보세요!',
                url: window.location.href
            });
            return;
        }
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('링크가 복사되었습니다.');
    }

    return {
        loading,
        categories,
        error,
        searchedContents,
        loadingUpdate,
        searchError,
        currentUser,
        currentData,
        getPreferState,
        shareLink,
        rotatePreferState,
        addLikeContents,
        removeLikeContents,
        onChangeKeyword,
        fetchSearch,
        setToUser1,
        setToUser2,
        keywordRef,
        canSubmit,
        clickRecommend,
        loadingRecommend,
        recommendContents,
        handleURLSearch,
        urlInputRef
    };
}

export default useHomePage;
