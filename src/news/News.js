import { useState, useEffect } from 'react';
import axios from 'axios';

export const News = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [news, setNews] = useState(['one', 'two']);
    const [query, setQuery] = useState('tesla');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const response = await axios(`https://hn.algolia.com/api/v1/search?query=${query}`);
                setNews(response.data.hits);
            } catch (error) {
                setIsError(error);
            }
            //console.log(response);
            setIsLoading(false);
        }
        console.log('hit effect');
        getData();
    }, [query]);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>The count: {count}</button>
            <h1>Hello news!</h1>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            ></input>
            {isError && <div>Something went wrong...{String(isError)}</div>}
            {isLoading ? (<div>...Loading</div>) :
                <ul>
                    {news.map((e, i) => (
                        <li key={String(i) + e.title}>
                            <a href={e.url}>{e.title}</a>
                        </li>
                    ))}
                </ul>
            }
        </>
    );
};