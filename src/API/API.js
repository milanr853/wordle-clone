

const API = (limit) => {

    const fetch = require('node-fetch');

    const url = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=${limit}&offset=0&`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': '5dab99cddemsh08c8be8993cdf47p19b44ejsn41fcb2739301'
        }
    };

    return fetch(url, options)
            .then(res => res.json())
            .then(data => data.data)
}

export default API