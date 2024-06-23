import { useState,useRef } from "react";
import { debounce } from "@/utils/debounce";
import useFetchUpdate from "./useFetchUpdate";
import { ContentsType, getCategories,searchContents, getRecommendContents, getContentById } from "@/utils/api";

const useSearch = () => {
    const [searchedContents, setSearchedContents] = useState<ContentsType[]|null>(null);
    const [searchError, setSearchError] = useState<string|null>(null);
    const [loadingUpdate, fetchUpdate] = useFetchUpdate(searchContents);
    const keywordRef = useRef<HTMLInputElement>(null);

    const searchByKeyword = debounce(async (keyword: string) => {
        try{
            const data = await fetchUpdate(keyword);
            setSearchedContents(data);
            setSearchError(null);
        } catch(e) {
            setSearchError("검색 결과가 없습니다.");
        }
    }, 500);

    const onChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value) return setSearchedContents(null);
        searchByKeyword(e.target.value);
    }

    const fetchSearch = async (e:any) => {
        e.preventDefault();
        if(!keywordRef.current) return;
        searchByKeyword(keywordRef.current.value);
    };

    const clearSearch = () => {
        setSearchedContents(null);
        if(keywordRef.current) keywordRef.current.value = "";
    }
    
    return { loadingUpdate, searchedContents, searchError, keywordRef, clearSearch, onChangeKeyword, fetchSearch };

}

export default useSearch;
