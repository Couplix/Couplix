import { useRef, useState } from "react";
import useFetchUpdate from "./useFetchUpdate";
import useFetchWithRendering from "./useFetchWithRendering";
import { getCategories, getContentById, searchContents } from "@/utils/api";

type ContentsType = {
    id: number;
    title: string;
    director: string[];
    cast: string[];
    country: string;
    releaseYear: number;
    rating: string;
    duration: string;
    categories: string[];
    description: string;
    starRating: number;
    reviews: string[];
};

const useReviewPage = () => {
    const [content, setContent] = useState<ContentsType>();

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

    const fetchContent = async (contentId: number) => {
        try {
            setSearchedContents(null);
            const data = await getContentById(contentId);
            setContent(data);
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    };

    return {
        error,
        searchedContents,
        loadingUpdate,
        fetchSearch,
        keywordRef,
        content,
        fetchContent
    };
}

export default useReviewPage;