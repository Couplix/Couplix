import useBoxChange from "../hooks/useBoxChange";

const Home = () => {
    const {count, inputData, onChange, onClick} = useBoxChange();

    return (
        <div>
            <h1>Box</h1>
            <input type="number" onChange={onChange} value={inputData} />
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
