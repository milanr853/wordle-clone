import "./currency.css"
import { millify } from "millify"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import API from "../../API/API"
import { getCoinsAndStats_Action, getUpdatedValues_Actions } from "../../Redux/Actions/Actions"



export const Currencies = ({ simplified }) => {

    const colorMode = useSelector(store => store.changeColorReducer)





    const dispatch = useDispatch()
    // ____________STATES____________
    const [searchTerm, setSearchTerm] = useState("")
    const [cryptosListAfterSearch, setCryptos] = useState([])
    // ----------------------------




    //__GETTING VALUES FROM STORE
    const value = useSelector(store => store.displayCryptosOverPage_Reducer)




    // ----------------------------
    // SETTING NEW VALUES Condition
    useEffect(() => {
        if (!simplified) {
            dispatch(getUpdatedValues_Actions())
        }
    }, [])
    // ----------------------------





    // ----------------------------
    // ___Sending Data (Stats and Coins) To Store || Dispatch
    useEffect(() => {
        const fetchData = async () => {
            const Obj = await API(value.limit ? value.limit : 100)
            dispatch(getCoinsAndStats_Action(Obj))
        }
        fetchData()
    }, [value])
    // ___Receiving Data (Stats and Coins) from Store || Selector
    const cryptosArr = useSelector((store) => store.getCoinsAndStats_Reducer.coins)
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


    useEffect(() => {
        const grid = document.querySelectorAll('.coinGridItem')
        const coinStatsValues = document.querySelectorAll('.coinStatsValues')
        if (colorMode === "dark") {

            grid.forEach((item) => {
                item.style.backgroundColor = "#3C415C"
            })
            coinStatsValues.forEach((item) => {
                item.style.color = "white"
            })
        }
        else {

            grid.forEach((item) => {
                item.style.transition = "0.7s"
                item.style.backgroundColor = "white"
            })
            coinStatsValues.forEach((item) => {
                item.style.transition = "0.7s"
                item.style.color = "black"
            })
        }
    }, [cryptosListAfterSearch,colorMode])



    // ____________RENDERING LIST OF FILTERED CURRENCIES || MAP____________
    const renderList = cryptosListAfterSearch ? cryptosListAfterSearch.map((currency) => {
        const { uuid, symbol, name, change, iconUrl, marketCap, price, rank } = currency

        return (

            <Link to={`/currency/details/${uuid}`} className="coinGridItem" key={uuid}>
                <div className="coinHolder">
                    <strong className="coinTitle coinStatsValues">{rank}. {name}</strong>
                    <div className="coinIcon">
                        <img src={iconUrl} alt={symbol} />
                    </div>
                </div>
                <div className="c-divider"></div>
                <div className="coindetails">
                    <p className="coinStatsValues">Price: {millify(price)}</p>
                    <p className="coinStatsValues">Market Cap: {millify(marketCap)}</p>
                    <p className="coinStatsValues">Daily Change: {millify(change)}</p>
                </div>
            </Link>

        )
    }) : []
    // ----------------------------





    // ------------------------------------------
    return (
        <div className="currenciesParentWrapperContainer">
            {/* <h1>Crypto Currencies</h1> */}
            <div className="searchHolder" >
                <input type="text" placeholder="Search Coin" className="search" onChange={handleChange} style={{ display: value.display ? value.display : "block" }} />
            </div>
            <div className="coinsGrid">
                {cryptosListAfterSearch.length !== 0 ? renderList : <p>Loading...</p>}
            </div>
        </div>
    )
}