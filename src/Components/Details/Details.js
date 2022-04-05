import "./details.css"
import { useParams } from "react-router-dom"

import { useState } from "react"
import { useEffect } from "react"
import { millify } from "millify"

import CoinApi from "../../API/Coin"
import HTMLReactParser from 'html-react-parser';
import { useSelector } from "react-redux"


export const Details = () => {

    const colorMode = useSelector(store => store.changeColorReducer)



    const [Currency, setCurrency] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const Coin = await CoinApi(id)
            setCurrency(Coin.data.coin)
        }
        fetchData()
    }, [])



    useEffect(() => {
        const parentWrapper = document.querySelector('.parentWrapper')
        const DetailsWrapper_PARENT = document.querySelector('.DetailsWrapper_PARENT')
        const links = document.querySelectorAll('.extradata a')
        if (colorMode === 'dark') {
            if (parentWrapper) parentWrapper.style.backgroundColor = "#3C415C"
            if (DetailsWrapper_PARENT) DetailsWrapper_PARENT.style.color = "white"
            links.forEach((link)=>{
                link.style.color = "yellow"
            })
        }
        else {
            if (parentWrapper) {
                parentWrapper.style.transition = "0.7s"
                parentWrapper.style.backgroundColor = "white"
            }
            if (DetailsWrapper_PARENT) {
                DetailsWrapper_PARENT.style.transition = "0.7s"
                DetailsWrapper_PARENT.style.color = "black"
            }
            if (links) {
                links.forEach((link)=>{
                    link.style.transition = "0.7s"
                    link.style.color = "dodgerblue"
                })
            }
        }


    }, [Currency,colorMode])



    // ------------------------------------------------------------



    return (
        <>
            {
                Currency.uuid ?
                    <div className="DetailsWrapper_PARENT">
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

                            {/* <div className="chartParentWrapperContainer">
                                <LineChart price={Currency.price} name={Currency.name} id={Currency.id}/>
                            </div> */}

                        <div className="extradata">
                            <h3 className="whatis">What is {Currency.name}?</h3>
                            {HTMLReactParser(Currency.description)}
                            <a href={Currency.websiteUrl} className="links">{Currency.name}</a>
                        </div>

                    </div>
                    : <h2 className="loading">Loading...</h2>
            }
        </>
    )
}