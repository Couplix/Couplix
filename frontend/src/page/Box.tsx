import useBox from "../hooks/useBox";

const Home = () => {
    const {count, inputRef, onClick} = useBox();

    return (
        <div>
            <h1>Box</h1>
            <input ref={inputRef} type="number" />
            <button onClick={onClick}>Set</button>
            {
                Array.from({length: count}).map((_,i) => (
                    <div key={i} style={{width: "100px", height: "100px", backgroundColor: "red", margin: "10px"}}></div>
                ))
            }
        </div>
    );
};

export default Home;
