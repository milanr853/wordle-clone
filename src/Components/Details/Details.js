import "./details.css"
import { useParams } from "react-router-dom"

import { useState } from "react"
import { useEffect } from "react"
import { millify } from "millify"

import CoinApi from "../../API/Coin"
import HTMLReactParser from 'html-react-parser';

export const Details = () => {
    const [Currency, setCurrency] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const Coin = await CoinApi(id)
            setCurrency(Coin.data.coin)
        }
        fetchData()
    }, [])


// ------------------------------------------------------------



    return (
        <>
            {
                Currency.uuid ?
                    <>
                        {/* <h1>BTC Price</h1> */}

                        <div className="parentWrapper">
                            <div className="topWrapper">
                                <div className="iconholder">
                                    <img src={Currency.iconUrl} alt="icon" className="icon" />
                                </div>
                                <p className="name">{Currency.name}</p>
                            </div>

                            <div className="middleWrapper">
                                <div className="middleLeft">
                                    <div className="properties">
                                        <p className="marketCap">Market Cap: </p>
                                        <p className="price">Price in USD: </p>
                                        <p className="volume">24h Volume: </p>
                                        <p className="allHigh">All Time High: </p>
                                        <p className="change">Change: </p>
                                    </div>
                                    <div className="values">
                                        <strong>{`$${millify(Currency.marketCap)}`}</strong>
                                        <strong>{`$${millify(Currency.price)}`}</strong>
                                        <strong>{`$${millify(Currency["24hVolume"])}`}</strong>
                                        <strong>{`$${millify(Currency.allTimeHigh.price)}`}</strong>
                                        <strong>{Currency.change}%</strong>
                                    </div>
                                </div>


                                <div className="middleRight">
                                    <div className="properties">
                                        <p className="approvedSupply">Rank: </p>
                                        <p className="markets">No of Markets: </p>
                                        <p className="exchanges">No of Exchanges: </p>
                                        <p className="totalSupply">Total Supply: </p>
                                        <p className="circulatingSupply">Circulating Supply: </p>
                                    </div>
                                    <div className="values">
                                        <strong>{Currency.rank}</strong>
                                        <strong>{Currency.numberOfMarkets}</strong>
                                        <strong>{Currency.numberOfExchanges}</strong>
                                        <strong>{millify(Currency.supply.total)}</strong>
                                        <strong>{millify(Currency.supply.circulating)}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="extradata">
                            <h3 className="whatis">What is {Currency.name}?</h3>
                            {HTMLReactParser(Currency.description)}
                            <a href={Currency.websiteUrl} className="links">{Currency.name}</a>
                        </div>

                    </>
                    : <h1>Loading...</h1>
            }
        </>
    )
}