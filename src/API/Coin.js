

const CoinApi = (uuid) => {
    const fetch = require('node-fetch');

    const url = `https://coinranking1.p.rapidapi.com/coin/${uuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': '08d22be50emsh6b4b2db3e41126dp1679b1jsn18506609ca5e'
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(data => data)
}

export default CoinApi