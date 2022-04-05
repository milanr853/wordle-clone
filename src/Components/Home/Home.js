import "./home.css"

import { millify } from 'millify'
import API from "../../API/API"
import { getCoinsAndStats_Action, getDefaultValues_Action, getNewsData_Action, getNewsDefault_Action } from "../../Redux/Actions/Actions"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Currencies } from "../Currencies/Currencies"
import { News } from "../News/News"
import { Link } from "react-router-dom"

import { useState } from "react"
import NewsApi from "../../API/NewsApi"



export const Home = () => {

    const colorMode = useSelector(store => store.changeColorReducer)




    const dispatch = useDispatch()
    const [simplified, setSimplified] = useState(true)




    //__DISPATCH DEFAULT VALUES ACTION
    useEffect(() => {
        dispatch(getDefaultValues_Action())
        dispatch(getNewsDefault_Action())
    }, [])
    //__GETTING VALUES FROM STORE
    const values = useSelector(store => store.displayCryptosOverPage_Reducer)
    // const newsValues = useSelector(store => store.displayNewsOverPage_Reducer)




    // -----------------------------------------------------------------------------------
    // ___Sending Request to API then Data (Stats and Coins) To Store (through dispatch)
    useEffect(() => {
        const fetchData = async () => {
            const Obj = await API(values.limit ? values.limit : 10)
            dispatch(getCoinsAndStats_Action(Obj))
            // const response = await NewsApi("Cryptocurrency", newsValues.count && newsValues.count <= 3 ? newsValues.count : 3)
            // dispatch(getNewsData_Action(response))
        }
        fetchData()
    }, [values])

    // ___Receiving Data (Stats and Coins) from Store || Selector
    const statsObj = useSelector((store) => store.getCoinsAndStats_Reducer.stats)
    // -----------------------------------------------------------------------------------




    // ____________EVENT HANDLERS____________
    const showMoreCurrencies = () => {
        setSimplified(false)
    }
    const showMoreNews = async () => {
        setSimplified(false)
    }




    useEffect(() => {
        const homeParentWrapper = document.querySelectorAll('.homeParentWrapper')
        const Links = document.querySelectorAll('.showMore')
        if (colorMode === 'dark') {

            homeParentWrapper.forEach((item) => {
                item.style.color = "white"
            })
            Links.forEach((link) => {
                link.style.color = "white"
            })
        }
        else{

            homeParentWrapper.forEach((item) => {
                item.style.color = "black"
                item.style.transition = "0.7s"
            })
            Links.forEach((link) => {
                link.style.transition = "0.7s"
                link.style.color = "dodgerblue"
            })
        }
    }, [statsObj,colorMode])




    // -----------------------------------------------------------------------------------
    return (
        <>
            {
                statsObj ?
                    <div className="homeParentWrapperContainer">
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

                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }} className="sectionDivider">
                            <h2 className="sectionDividerHeading">Top 10 Crypto Currencies in the World</h2>
                            <Link to='/currencies' onClick={showMoreCurrencies} className='showMore'>Show More</Link>
                        </div>
                        <Currencies simplified={simplified} />

                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }} className="sectionDivider">
                            <h2 className="sectionDividerHeading">Latest Crypto News around the world</h2>
                            <Link to='/news' onClick={showMoreNews} className='showMore'>Show More</Link>
                        </div>
                        {/* <News simplified={simplified} /> */}
                    </div>
                    : <h1 className="firstHeading">Loading...</h1>
            }
        </>
    )
}