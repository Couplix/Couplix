import { useRef, useState,useEffect } from "react";
import useFetchUpdate from "./useFetchUpdate";
import { ContentsType, getContentById, searchContents, fetchAddReview, fetchAddStarRating } from "@/utils/api";
import { useParams, useNavigate } from "react-router-dom";

const useReviewPage = () => {
    const [content, setContent] = useState<ContentsType|null>(null);
    const [userRating, setUserRating] = useState(0);
    const [searchedContents, setSearchedContents] = useState<ContentsType[]|null>(null);
    const [loadingUpdate, fetchUpdate] = useFetchUpdate(searchContents);
    const keywordRef = useRef<HTMLInputElement>(null);
    const { contentId } = useParams<{contentId: string}>();
    const navigate = useNavigate();

    const fetchSearch = async (e:any) => {
        e.preventDefault();
        if(!keywordRef.current) return;
        const data = await fetchUpdate(keywordRef.current.value);
        setSearchedContents(data);
    };
    const onChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value) return setSearchedContents(null);
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
            const result = await fetchAddStarRating(content.id, userRating);
            setContent({ ...content, starRate: result });
        }
    }

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const submitReview = () => {
        if(!textAreaRef.current) return;
        if (textAreaRef.current.value.trim() === "") {
            console.log("리뷰 내용을 입력하세요.");
            return;
        }

        if (content) {
            const updatedContent = {
                ...content,
                reviews: [
                    ...content.reviews,
                    textAreaRef.current.value
                ]
            };
            setContent(updatedContent);
        }
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
        submitReview
    };
}

export default useReviewPage;
