import "./home.css"

import { millify } from 'millify'
import API from "../../API/API"
import { getCoinDataAction, getCoinsAndStats_Action, getDefault, getDefaultValues_Action, getNewsArrayAction, getNewsDefault } from "../../Redux/Actions/Actions"
import { useDispatch, useStore } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Currencies } from "../Currencies/Currencies"
import { News } from "../News/News"
import { Link } from "react-router-dom"

import { getValuesActions, getNewsValuesActions } from "../../Redux/Actions/Actions"
import NewsApi from "../../API/NewsApi"
import { useState } from "react"



export const Home = () => {
    const dispatch = useDispatch()
    const [simplified,setSimplified] = useState(true)


    //__DISPATCH DEFAULT VALUES ACTION
    useEffect(()=>{
        dispatch(getDefaultValues_Action())
    },[])
    //__GETTING VALUES FROM STORE
    const values = useSelector(store=>store.displayCryptosOverPage_Reducer)




// -----------------------------------------------------------------------------------
// ___Sending Data (Stats and Coins) To Store || Dispatch
    useEffect(() => {
        const fetchData = async () => {
            const Obj = await API(values.limit && values.limit <= 10? values.limit : 10)
            dispatch(getCoinsAndStats_Action(Obj))
        }
        fetchData()
    }, [])

// ___Receiving Data (Stats and Coins) from Store || Selector
    const statsObj = useSelector((store) => store.getCoinsAndStats_Reducer.stats)
// -----------------------------------------------------------------------------------




    // ____________EVENT HANDLERS____________
    const showMoreCurrencies = () => {
        // setSimplified(false)
    }
    const showMoreNews = async () => {
        // const Data = await API(100)
        // dispatch(getCoinDataAction(Data))
        // dispatch(getNewsValuesActions())
    }




// -----------------------------------------------------------------------------------
    return (
        <>
            {
                statsObj ?
                    <>
                        <div className="home">
                            <div className="homeFirstSectionWrapper">
                                <h1 className="firstHeading">Global Crypto Stats</h1>
                                <div className="grid">
                                    <div className="gridItem">
                                        <p className="itemTitle">Total Cryptocurrencies</p>
                                        <h1 className="itemValue">{statsObj.total}</h1>
                                    </div>
                                    <div className="gridItem">
                                        <p className="itemTitle">Total Exchanges</p>
                                        <h1 className="itemValue">{statsObj.totalExchanges}</h1>
                                    </div>
                                    <div className="gridItem">
                                        <p className="itemTitle">Total Market Cap</p>
                                        <h1 className="itemValue">{millify(statsObj.totalMarketCap)}</h1>
                                    </div>
                                    <div className="gridItem">
                                        <p className="itemTitle">Total 24h Volumn</p>
                                        <h1 className="itemValue">{millify(statsObj.total24hVolume)}</h1>
                                    </div>
                                    <div className="gridItem">
                                        <p className="itemTitle">Total Markets</p>
                                        <h1 className="itemValue">{millify(statsObj.totalMarkets)}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                            <h2>Top 10 Crypto Currencies in the World</h2>
                            <Link to='/currencies' onClick={showMoreCurrencies}>Show More</Link>
                        </div>
                        <Currencies/>
                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                            <h2>Latest Crypto News around the world</h2>
                            <Link to='/news' onClick={showMoreNews}>Show More</Link>
                        </div>
                        <News/>
                    </>
                    : <h1 className="firstHeading">Loading...</h1>
            }
        </>
    )
}