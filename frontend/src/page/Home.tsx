import useAsdf from "../hooks/useAsdf";

const Home = () => {
    const { data, clickHandler } = useAsdf();
    return (
        <div>
            <h1>Home</h1>
            <button onClick={clickHandler}>Click</button>
            <div>{data}</div>
        </div>
    );
};

export default Home;
