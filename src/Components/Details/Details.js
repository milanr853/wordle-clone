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
            console.log(Coin.data)
            setCurrency(Coin.data.coin)
        }
        fetchData()
    }, [])



    // ----------------------------
    // SETTING COLORS || DARK LIGHT MODE
    useEffect(() => {
        const parentWrapper = document.querySelector('.parentWrapper')
        const DetailsWrapper_PARENT = document.querySelector('.DetailsWrapper_PARENT')
        const links = document.querySelectorAll('.extradata a')
        if (colorMode === 'dark') {
            if (parentWrapper) {
                // parentWrapper.style.transition = "0.7s"
                parentWrapper.style.backgroundColor = "#3C415C"}
            if (DetailsWrapper_PARENT) {
                // DetailsWrapper_PARENT.style.transition = "0.7s"
                DetailsWrapper_PARENT.style.color = "white"}
            links.forEach((link)=>{
                // link.style.transition = "0.7s"
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
    // ----------------------------
    // SETTING COLORS || DARK LIGHT MODE



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
                                <p className="name">{Currency.name?Currency.name:"Null"}</p>
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
                                        <strong>{Currency.marketCap?`$${millify(Currency.marketCap)}`:0}</strong>
                                        <strong>{Currency.price?`$${millify(Currency.price)}`:0}</strong>
                                        <strong>{Currency["24hVolume"]?`$${millify(Currency["24hVolume"])}`:0}</strong>
                                        <strong>{Currency.allTimeHigh.price?`$${millify(Currency.allTimeHigh.price)}`:0}</strong>
                                        <strong>{Currency.change?Currency.change:0}%</strong>
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
                                        <strong>{Currency.rank?Currency.rank:0}</strong>
                                        <strong>{Currency.numberOfMarkets?Currency.numberOfMarkets:0}</strong>
                                        <strong>{Currency.numberOfExchanges?Currency.numberOfExchanges:0}</strong>
                                        <strong>{Currency.supply.total?millify(Currency.supply.total):"Null"}</strong>
                                        <strong>{Currency.supply.circulating?millify(Currency.supply.circulating):0}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                            {/* <div className="chartParentWrapperContainer">
                                <LineChart price={Currency.price} name={Currency.name} id={Currency.id}/>
                            </div> */}

                        <div className="extradata">
                            <h3 className="whatis">What is {Currency.name?Currency.name:"Null"}?</h3>
                            {HTMLReactParser(Currency.description?Currency.description:"Null")}
                            <a href={Currency.websiteUrl} className="links">{Currency.name?Currency.name:"Null"}</a>
                        </div>

                    </div>
                    : <h2 className="loading">Loading...</h2>
            }
        </>
    )
}