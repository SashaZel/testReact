import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useState } from 'react';

const options = [
    { value: 'Mercedes', label: 'mercedes' },
    { value: 'BMW', label: 'bmw' },
    { value: 'Audi', label: 'audi' }
];

export const Search = () => {

    const [choice, setChoice] = useState(null);
    const [fetchedNews, setFetchedNews] = useState(null);

    const fetchNews = (query, callback) => {
        //console.log(query);
        //const responses = [];
        fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
            .then(response => response.json())
            .then(response => callback(response.hits.map(element => ({ value: element, label: element.title }))))
            .catch(error => console.error(error));
        //console.log(responses);
        //callback([{ value: 'Mercedes', label: 'mercedes' },
        //{ value: 'BMW', label: 'bmw' }]);
    }

    const handleChange = ({value, _}) => {
        //console.log(value);
        setFetchedNews(value);
    }

    return (
        <>
            <p>Fetch from API</p>
            {fetchedNews && <p><a href={fetchedNews.url}>{fetchedNews.title}</a> - {fetchedNews.created_at.split('T')[0]}</p>}
            <AsyncSelect
                loadOptions={fetchNews}
                onChange={handleChange}
                defaultOptions
            />
            <p>selected: {choice}</p>
            <Select
                options={options}
                onChange={(choice) => setChoice(choice.value)}
            />
        </>
    );
}