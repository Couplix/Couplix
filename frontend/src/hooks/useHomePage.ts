import useFetchUpdate from "./useFetchUpdate";
import useFetchWithRendering from "./useFetchWithRendering";
import { getCategories,searchConents } from "@/utils/api";

const useHomePage = () => {
    const [loading, data, error] = useFetchWithRendering(getCategories);
    const [loadingUpdate, fetchUpdate] = useFetchUpdate(searchConents);

    return {
        loading,
        data,
        error,
        loadingUpdate,
        fetchUpdate
    };
};

export default useHomePage;
