

const NewsApi = (category, count) => {
    const fetch = require('node-fetch');

    const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`;

    const options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
            'X-RapidAPI-Key': '08d22be50emsh6b4b2db3e41126dp1679b1jsn18506609ca5e'
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(data => data.value)

}


export default NewsApi