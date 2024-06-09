import { useRef, useState } from "react";
import useFetchUpdate from "./useFetchUpdate";
import useFetchWithRendering from "./useFetchWithRendering";
import { ContentsType, contents, getCategories, getContentById, searchContents } from "@/utils/api";

const useReviewPage = () => {
    const [content, setContent] = useState<ContentsType>();
    const [userRating, setUserRating] = useState(0);
    const [loading, categories, error] = useFetchWithRendering(getCategories);
    const [searchedContents, setSearchedContents] = useState<ContentsType[]|null>(null);
    const [loadingUpdate, fetchUpdate] = useFetchUpdate(searchContents);
    const keywordRef = useRef<HTMLInputElement>(null);
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

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

    const handleContentClick = (contentId: number) => {
        fetchContent(contentId);
    };

    const calculateAverageRating = (ratings: number[]) => {
        if (!ratings || ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        return sum / ratings.length;
    };

    const handleRatingChange = (rating: number) => {
        setUserRating(rating);
    };

    const addStarRating = () => {
        if (content) {
            const updatedContent = { ...content, starRating: [...content.starRating, userRating] };
            setContent(updatedContent);
            contents[content.id].starRating.push(userRating);
        }
    };

    const submitReview = () => {
        if (inputText.trim() === '') {
            console.log("리뷰 내용을 입력하세요.");
            return;
        }

        if (content) {
            const updatedContent = {
                ...content,
                reviews: [
                    ...content.reviews,
                    { id: content.reviews.length + 1, text: inputText }
                ]
            };
            setContent(updatedContent);
            contents[content.id].reviews.push({ id: content.reviews.length, text: inputText })
            setInputText('');
        }
    };

    return {
        error,
        searchedContents,
        loadingUpdate,
        fetchSearch,
        keywordRef,
        content,
        addStarRating,
        handleContentClick,
        calculateAverageRating,
        handleRatingChange,
        inputText,
        handleInputChange,
        submitReview
    };
}

export default useReviewPage;