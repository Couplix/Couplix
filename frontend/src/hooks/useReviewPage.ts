import { useRef, useState,useEffect } from "react";
import useFetchUpdate from "./useFetchUpdate";
import { ContentsType, getContentById, searchContents, fetchAddReview, fetchAddStarRating } from "@/utils/api";
import { useParams, useNavigate } from "react-router-dom";

const useReviewPage = () => {
    const [content, setContent] = useState<ContentsType|null>(null);
    const [userRating, setUserRating] = useState(0);
    const [searchedContents, setSearchedContents] = useState<ContentsType[]|null>(null);
    const [searchError, setSearchError] = useState<string|null>(null);
    const [loadingUpdate, fetchUpdate] = useFetchUpdate(searchContents);
    const keywordRef = useRef<HTMLInputElement>(null);
    const { contentId } = useParams<{contentId: string}>();
    const navigate = useNavigate();

    const fetchSearch = async (e:any) => {
        e.preventDefault();
        if(!keywordRef.current) return;
        try{
            const data = await fetchUpdate(keywordRef.current.value);
            setSearchedContents(data);
        } catch(e) {
            setSearchError("검색 결과가 없습니다.");
        }
    };

    const onChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value.trim()) return setSearchedContents(null);
        const data = await fetchUpdate(e.target.value);
        setSearchedContents(data);
    }

    const fetchContent = async (contentId: number) => {
        try {
            setSearchedContents(null);
            const data = await getContentById(contentId);
            setContent(data);
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    };

    useEffect(() => {
        if(contentId) {
            fetchContent(Number(contentId));
        }
    }, [contentId]);

    const handleContentClick = (contentId: number) => {
        navigate(`/reviews/${contentId}`);
    };

    const handleRatingChange = (rating: number) => {
        setUserRating(rating);
    };

    const addStarRating = async () => {
        if (content) {
            const updatedStarRate = await fetchAddStarRating(content.id, userRating);
            const updatedContent = { ...content, starRate: updatedStarRate };
            setContent(updatedContent);
        }
    }

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const submitReview = async () => {
        if (!textAreaRef.current) return;
        const reviewContent = textAreaRef.current.value.trim();
        if (reviewContent === "") {
            console.log("리뷰 내용을 입력하세요.");
            return;
        }

        if (content) {
            const updatedContent = {
                ...content,
                reviews: [...content.reviews, reviewContent]
            };
            setContent(updatedContent);
            await fetchAddReview(content.id, reviewContent);
        }
        
        textAreaRef.current.value = "";
    };

    return {
        searchedContents,
        loadingUpdate,
        fetchSearch,
        keywordRef,
        content,
        addStarRating,
        handleContentClick,
        handleRatingChange,
        onChangeKeyword,
        textAreaRef,
        submitReview,
        searchError
    };
}

export default useReviewPage;
