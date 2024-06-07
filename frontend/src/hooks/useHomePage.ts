import { useState,useRef } from "react";
import useFetchUpdate from "./useFetchUpdate";
import useFetchWithRendering from "./useFetchWithRendering";
import { getCategories,searchConents } from "@/utils/api";
import { preferState } from "@/utils/types";

type UserData = {
    prefer: number[];
    dislike: number[];
    likeContents: {
        id: number;
        title: string;
    }[];
};

type ContentsType = {
    id: number;
    title: string;
    category: string;
    releaseYear: number;
    rating: number;
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
    const [loadingUpdate, fetchUpdate] = useFetchUpdate(searchConents);
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
        setUserData({...currentData, likeContents: [...currentData.likeContents, {id, title}]});
    };

    const removeLikeContents = (id: number) => () => {
        setUserData({...currentData, likeContents: currentData.likeContents.filter(v => v.id !== id)});
    };

    const fetchSearch = async () => {
        if(!keywordRef.current) return;
        const data = await fetchUpdate(keywordRef.current.value);
        setSearchedContents(data);
    };

    const setToUser1 = () => {
        setCurrentUser(1);
    };

    const setToUser2 = () => {
        setCurrentUser(2);
    };


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
        fetchSearch,
        setToUser1,
        setToUser2,
        keywordRef
    };
}

export default useHomePage;
