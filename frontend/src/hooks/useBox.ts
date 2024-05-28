import { useState, useRef } from "react";

const useBox = () => {
    const [count, setCount] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const onClick = () => {
        setCount(inputRef.current?.value ? parseInt(inputRef.current.value) : 0);
    }

    return {count, inputRef, onClick};
}

export default useBox;
