

const PriceHistoryApi = (id="Qwsogvtv82FCd",timePeriod="24h") => {
    const fetch = require('node-fetch');

    const url = `https://coinranking1.p.rapidapi.com/coin/${id}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': 'b53c14d694msh5968aec0a3c160dp1a1726jsndacdc73fb180'
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(data => data.data)

}


export default PriceHistoryApi