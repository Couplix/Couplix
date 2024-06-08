import { useState } from "react"

const useHeader = () => {
    const [currentMenu, setCurrentMenu] = useState<1|2>(1);

    const setSelected1 = () => {
        setCurrentMenu(1);
    };

    const setSelected2 = () => {
        setCurrentMenu(2);
    };

    return {
        currentMenu,
        setSelected1,
        setSelected2
    };
}

export default useHeader;