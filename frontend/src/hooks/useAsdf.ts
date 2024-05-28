import { useState, useEffect } from "react";

const useAsdf = () => {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    
    const asdf = () => {
        setCount(count+1);
    }
    const asdf2 = () => {
        setCount2(count2+1);
    }

    useEffect(() => {
        window.document.title = `Home`+new Date().toLocaleString();
    },[count,count2]);

    return {count, count2, asdf, asdf2};
}

export default useAsdf;
