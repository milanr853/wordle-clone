import "./home.css"

import { millify } from 'millify'
import API from "../../API/API"
import { getCoinsAndStats_Action} from "../../Redux/Actions/Actions"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Currencies } from "../Currencies/Currencies"
import { News } from "../News/News"
import { Link } from "react-router-dom"

import { useState } from "react"




export const Home = () => {

    const colorMode = useSelector(store => store.changeColorReducer)

    const [Limited, setLimited] = useState(true)



    const dispatch = useDispatch()




    // -----------------------------------------------------------------------------------
    // ___Sending Request to API then Data (Stats and Coins) To Store (through dispatch)
    useEffect(() => {
        const fetchData = async () => {
            const Obj = await API(100)
            dispatch(getCoinsAndStats_Action(Obj))
        }
        fetchData()
    }, [])



    const showMoreCurrencies = () => {
        setLimited(false)
    }
    const showMoreNews = () => {
        setLimited(false)
    }




    // ___Receiving Data (Stats and Coins) from Store || Selector
    const statsObj = useSelector((store) => store.getCoinsAndStats_Reducer.stats)
    // -----------------------------------------------------------------------------------

    // ----------------------------
    // SETTING COLORS || DARK LIGHT MODE
    useEffect(() => {
        const homeParentWrapper = document.querySelectorAll('.homeParentWrapperContainer')
        const Links = document.querySelectorAll('.showMore')

        if (colorMode === 'dark') {
            homeParentWrapper.forEach((item) => {
                // item.style.transition = "0.7s"
                item.style.color = "white"
            })
            Links.forEach((link) => {
                // link.style.transition = "0.7s"
                link.style.color = "white"
            })
        }
        else {
            homeParentWrapper.forEach((item) => {
                item.style.transition = "0.7s"
                item.style.color = "black"
            })
            Links.forEach((link) => {
                link.style.transition = "0.7s"
                link.style.color = "dodgerblue"
            })
        }
    }, [statsObj, colorMode])
    // ----------------------------
    // ----------------------------

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
                            <Link to='/currencies' className='showMore' onClick={showMoreCurrencies}>Show More</Link>
                        </div>
                        <Currencies Limited={Limited} />

                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }} className="sectionDivider">
                            <h2 className="sectionDividerHeading">Top Crypto News all around the world</h2>
                            <Link to='/news' className='showMore' onClick={showMoreNews}>Show More</Link>
                        </div>
                            <News Limited={Limited}/>
                        
                    </div>

                    : <h2 className="loading">Loading...</h2>
            }
        </>
    )
}