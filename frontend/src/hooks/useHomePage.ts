import { useState,useRef } from "react";
import useFetchUpdate from "./useFetchUpdate";
import useFetchWithRendering from "./useFetchWithRendering";
import { ContentsType, getCategories,searchContents, getRecommendContents } from "@/utils/api";
import { preferState } from "@/utils/types";

export type UserData = {
    prefer: number[];
    dislike: number[];
    likeContents: {
        id: number;
        title: string;
    }[];
};

const useHomePage = () => {
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
    const [searchedContents, setSearchedContents] = useState<ContentsType[]|null>(null);
    const [loadingUpdate, fetchUpdate] = useFetchUpdate(searchContents);
    const [loadingRecommend, fetchRecommend] = useFetchUpdate(getRecommendContents);
    const [recommendContents, setRecommendContents] = useState<ContentsType[]|null>(null);
    const keywordRef = useRef<HTMLInputElement>(null);

    const setUserData =  currentUser === 1 ? setUser1Data : setUser2Data;
    const currentData = currentUser === 1 ? user1Data : user2Data;

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
        setSearchedContents(null);
    };

    const removeLikeContents = (id: number) => () => {
        setUserData({...currentData, likeContents: currentData.likeContents.filter(v => v.id !== id)});
    };

    const onChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value) return setSearchedContents(null);
        const data = await fetchUpdate(e.target.value);
        setSearchedContents(data);
    }

    const fetchSearch = async (e:any) => {
        e.preventDefault();
        if(!keywordRef.current) return;
        const data = await fetchUpdate(keywordRef.current.value);
        setSearchedContents(data);
    };

    const setToUser1 = () => {
        setCurrentUser(1);
        setSearchedContents(null);
    };

    const setToUser2 = () => {
        setCurrentUser(2);
        setSearchedContents(null);
    };

    const canSubmit = user1Data.prefer.length + user1Data.dislike.length > 0 && user2Data.prefer.length + user2Data.dislike.length > 0;

    const clickRecommend = async () => {
        console.log(user1Data, user2Data);
        const data = await fetchRecommend(user1Data, user2Data);
        setRecommendContents(data);
    }

    return {
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
        onChangeKeyword,
        fetchSearch,
        setToUser1,
        setToUser2,
        keywordRef,
        canSubmit,
        clickRecommend,
        loadingRecommend,
        recommendContents
    };
}

export default useHomePage;
