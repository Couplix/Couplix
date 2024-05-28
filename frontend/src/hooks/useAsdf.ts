import { useState, useEffect } from "react";
import axios from "axios";

const useAsdf = () => {
    const [data, setData] = useState<any>(null);

    const clickHandler = async () => {
        const result = await axios.get("/api/user/find?id=5");
        console.log(result.status);
        setData(result.data.name);
    }

    return { data, clickHandler };
}

export default useAsdf;
