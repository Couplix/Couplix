import { useRef, useState } from "react";
import useFetchUpdate from "./useFetchUpdate";
import useFetchWithRendering from "./useFetchWithRendering";
import { getCategories, searchContents } from "@/utils/api";

type ContentsType = {
    id: number;
    title: string;
    category: string;
    releaseYear: number;
    rating: number;
};

const useReviewPage = () => {
    const [loading, categories, error] = useFetchWithRendering(getCategories);
    const [searchedContents, setSearchedContents] = useState<ContentsType[]|null>(null);
    const [loadingUpdate, fetchUpdate] = useFetchUpdate(searchContents);
    const keywordRef = useRef<HTMLInputElement>(null);

    const fetchSearch = async (e:any) => {
        e.preventDefault();
        if(!keywordRef.current) return;
        const data = await fetchUpdate(keywordRef.current.value);
        setSearchedContents(data);
    };

    return {
        error,
        searchedContents,
        loadingUpdate,
        fetchSearch,
        keywordRef
    };
}

export default useReviewPage;