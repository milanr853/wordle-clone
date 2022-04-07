

const NewsApi = (category, count) => {
    const fetch = require('node-fetch');

    const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`;

    const options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
            'X-RapidAPI-Key': '23a5285fb0mshdfab220707b2cb6p1dc129jsn8d5919bf8582'
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(json => json.value)

}


export default NewsApi