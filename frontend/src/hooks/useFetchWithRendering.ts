import { useEffect, useState } from "react";

const useFetchWithRendering =  <T,U extends any[]>(fetchFunction: (...args:U) => Promise<T>, ...args:U)
    : [boolean, T | null, Error | null] => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        (async () => {
            try{
                const data = await fetchFunction(...args);
                setData(data);
                setLoading(false);
            } catch (e: unknown) {
                if(!(e instanceof Error)) return setError(new Error('알 수 없는 오류가 발생했습니다.'));
                setError(e);
            }
        })();
    // eslint-disable-next-line
    }, []);

    return [loading, data, error];
}

export default useFetchWithRendering;
