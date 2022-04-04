// const ExchangeApi = () => {

//     const fetch = require('node-fetch');

//     const url = 'https://coinranking1.p.rapidapi.com/exchange/-zdvbieRdZ/markets?referenceCurrencyUuid=yhjMzLPhuIDl&limit=50&offset=0&orderBy=24hVolume&orderDirection=desc';

//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
//             'X-RapidAPI-Key': 'b53c14d694msh5968aec0a3c160dp1a1726jsndacdc73fb180'
//         }
//     };

//     return fetch(url, options)
//         .then(res => res.json())
//         .then(json => json)
// }

// export default ExchangeApi