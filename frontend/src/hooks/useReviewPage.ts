import { useRef, useState,useEffect } from "react";
import { ContentsType, getContentById, fetchAddReview, fetchAddStarRating } from "@/utils/api";
import { useParams, useNavigate } from "react-router-dom";
import useSearch from "./useSearch";

const useReviewPage = () => {
    const [content, setContent] = useState<ContentsType|null>(null);
    const [userRating, setUserRating] = useState(1);
    const { loadingUpdate, searchedContents, searchError, keywordRef, clearSearch, onChangeKeyword, fetchSearch } = useSearch();
    const { contentId } = useParams<{contentId: string}>();
    const navigate = useNavigate();

    const fetchContent = async (contentId: number) => {
        try {
            clearSearch();
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
