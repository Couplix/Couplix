import { useState, useRef, useEffect } from "react";
import axios from "axios";

const useAsdf = () => {
    const [data, setData] = useState<any[]>([]);

    const showList = async () => {
        const response = await axios.get("/api/user/list");
        setData(response.data);
    };

    const addUser = async () => {
        const input = inputRef.current;
        if (input) {
            const name = input.value;
            await axios.post("/api/user", { name });
            showList();
        }
    };

    useEffect(() => {
        showList();
    }, []);

    const inputRef = useRef<HTMLInputElement>(null);

    return { data, showList, addUser, inputRef };
}

export default useAsdf;
