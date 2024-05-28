import useAsdf from "../hooks/useAsdf";

const Home = () => {
    const { data, showList, addUser, inputRef } = useAsdf();
    return (
        <div>
            <h1>Home</h1>
            <button onClick={showList}>전체보기</button>
            <input type="text" ref={inputRef} />
            <button onClick={addUser}>추가하기</button>
            <ul>
                {
                    data.map((item, index) => (
                        <li key={index}>
                            {`id: ${item.id}, name: ${item.name}`}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;
