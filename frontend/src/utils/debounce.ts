export const debounce = (func: Function, delay: number) => {
    let timer: number;
    return (...args: any) => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
