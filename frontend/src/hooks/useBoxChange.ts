import { useState } from "react";

const useBoxChange = () => {
    const [count, setCount] = useState(0);
    const [inputData, setInput] = useState(0);
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(parseInt(e.target.value));
    }

    const onClick = () => {
        setCount(inputData);
    }

    return {count, inputData, onChange, onClick};
}

export default useBoxChange;
