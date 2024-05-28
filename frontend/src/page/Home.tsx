import useAsdf from "../hooks/useAsdf";

const Home = () => {
    const {count,count2,asdf,asdf2} = useAsdf();

    return (
        <div>
            <h1>Home</h1>
            <p>Count: {count}</p>
            <button onClick={asdf}>Increase</button>
            <p>Count2: {count2}</p>
            <button onClick={asdf2}>Increase</button>
        </div>
    );
};

export default Home;
