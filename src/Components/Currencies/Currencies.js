import "./currency.css"
import { millify } from "millify"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"



import Styles from '../../Styles';
const {darkModeColors,lightModeColors, delay} = Styles()
const {lbg,lborderCol,lcontainerCol,llogoCol,ltextCol,lnavBarBg} = lightModeColors
const {dbg,dborderCol,dcontainerCol,dlogoCol,dtextCol,dnavBarBg} = darkModeColors



export const Currencies = ({ Limited }) => {
    const colorMode = useSelector(store => store.changeColorReducer)




    const cryptosArr = useSelector((store) => store.getCoinsAndStats_Reducer.coins)
    // ----------------------------




    // ____________STATES____________
    const [searchTerm, setSearchTerm] = useState("")
    const [cryptosListAfterSearch, setCryptos] = useState([])
    // ----------------------------




    // ----------------------------
    //___setting up of available currencies (to render them)
    useEffect(() => {
        setCryptos(cryptosArr ? [...cryptosArr] : [])
    }, [cryptosArr])

    //filtering out all the currencies a/t the search term || then setting up the available currencies 
    useEffect(() => {
        const filteredArray = cryptosArr ? cryptosArr.filter((currency) => {
            if (currency.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return currency
            }
        }) : []

        setCryptos(filteredArray)
    }, [searchTerm])
    // ----------------------------





    // ----------------------------
    // ____________EVENT HANDLER____________
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    // ----------------------------



    // ----------------------------
    // SETTING COLORS || DARK LIGHT MODE
    useEffect(() => {
        const grid = document.querySelectorAll('.coinGridItem')
        const coinStatsValues = document.querySelectorAll('.coinStatsValues')
        const dividers = document.querySelectorAll(".c-divider")
        if (colorMode === "dark") {

            grid.forEach((item) => {
                item.style.backgroundColor = dcontainerCol
            })
            coinStatsValues.forEach((item) => {
                item.style.color = dtextCol
            })
            dividers.forEach((item) => {
                item.style.backgroundColor = dborderCol
            })
        }
        else {
            grid.forEach((item) => {
                item.style.transition = delay
                item.style.backgroundColor = lcontainerCol
            })
            coinStatsValues.forEach((item) => {
                item.style.transition = delay
                item.style.color = ltextCol
            })
            dividers.forEach((item) => {
                item.style.transition = delay
                item.style.backgroundColor = lborderCol
            })
        }
    }, [cryptosListAfterSearch, colorMode])
    // ----------------------------
    // ----------------------------



    // ____________RENDERING LIST OF FILTERED CURRENCIES || MAP____________
    const limitedItems = cryptosListAfterSearch ? cryptosListAfterSearch.filter((currency) => {
        if (currency.rank <= 10) return currency
    })
        : []



    const renderList =
        Limited ?
            limitedItems.length != 0 ? limitedItems.map((currency) => {
                return (
                    <Link to={`/currency/details/${currency.uuid}`} className="coinGridItem" key={currency.uuid}>
                        <div className="coinHolder">
                            <strong className="coinTitle coinStatsValues">{currency.rank}. {currency.name}</strong>
                            <div className="coinIcon">
                                <img src={currency.iconUrl} alt={currency.symbol} />
                            </div>
                        </div>
                        <div className="c-divider"></div>
                        <div className="coindetails">
                            <p className="coinStatsValues">Price: {millify(currency.price)}</p>
                            <p className="coinStatsValues">Market Cap: {millify(currency.marketCap)}</p>
                            <p className="coinStatsValues">Daily Change: {millify(currency.change)}</p>
                        </div>
                    </Link>
                )

            }) : []
            :
            cryptosListAfterSearch.length != 0 ? cryptosListAfterSearch.map((currency) => {
                return (
                    <Link to={`/currency/details/${currency.uuid}`} className="coinGridItem" key={currency.uuid}>
                        <div className="coinHolder">
                            <strong className="coinTitle coinStatsValues">{currency.rank}. {currency.name}</strong>
                            <div className="coinIcon">
                                <img src={currency.iconUrl} alt={currency.symbol} />
                            </div>
                        </div>
                        <div className="c-divider"></div>
                        <div className="coindetails">
                            <p className="coinStatsValues">Price: {millify(currency.price)}</p>
                            <p className="coinStatsValues">Market Cap: {millify(currency.marketCap)}</p>
                            <p className="coinStatsValues">Daily Change: {millify(currency.change)}</p>
                        </div>
                    </Link>
                )

            }) : []
    // ----------------------------





    // ------------------------------------------
    return (
        <div className="currenciesParentWrapperContainer">

            {cryptosListAfterSearch.length != 0
                ? <>
                    <div className="searchHolder" >
                        <input type="text" placeholder="Search Coin" className="search" onChange={handleChange} style={{ display: Limited ? "none" : "block" }} />
                    </div>
                    <div className="coinsGrid">
                        {renderList}
                    </div>
                </>
                : <></>
            }
        </div>
    )
}