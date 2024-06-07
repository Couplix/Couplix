import { useState } from "react";

const useFetchUpdate =  <T,U extends any[]>(fetchFunction: (...args:U) => Promise<T>)
    : [boolean, (...args:U)=>Promise<T>] => {
    const [loading, setLoading] = useState(false);
    
    const fetch = async (...args:U) => {
        setLoading(true);
        try {
            return await fetchFunction(...args); 
        } catch (e : unknown) {
            if(!(e instanceof Error)) throw new Error('알 수 없는 오류가 발생했습니다.');
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return [loading, fetch];
}

export default useFetchUpdate;
