import "./currency.css"
import { millify } from "millify"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import API from "../../API/API"
import { getCoinsAndStats_Action, getUpdatedValues_Actions } from "../../Redux/Actions/Actions"



export const Currencies = ({ simplified }) => {
    const dispatch = useDispatch()



    //__GETTING VALUES FROM STORE
    const value = useSelector(store => store.displayCryptosOverPage_Reducer)


    // ----------------------------
    // SETTING NEW VALUES
    useEffect(() => {
        if (!simplified) {
            dispatch(getUpdatedValues_Actions())
        }
    }, [])
    // ----------------------------



    // ____________STATES____________
    const [searchTerm, setSearchTerm] = useState("")
    const [cryptosListAfterSearch, setCryptos] = useState([])
    // ----------------------------







    // ----------------------------
    // ___Sending Data (Stats and Coins) To Store || Dispatch
    useEffect(() => {
        const fetchData = async () => {
            const Obj = await API(value.limit ? value.limit : 10)
            dispatch(getCoinsAndStats_Action(Obj))
        }
        fetchData()
    }, [value])
    // ___Receiving Data (Stats and Coins) from Store || Selector
    const cryptosArr = useSelector((store) => store.getCoinsAndStats_Reducer.coins)
    // ----------------------------




    // ----------------------------
    //___initial rendering of all available currencies
    useEffect(() => {
        setCryptos([...cryptosArr])
    }, [cryptosArr])

    //___final rendering after filtering from search term
    useEffect(() => {
        const filteredArray = cryptosArr.filter((currency) => {
            if (currency.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return currency
            }
        })

        setCryptos(filteredArray)
    }, [searchTerm])
    // ----------------------------




    // ----------------------------
    // ____________EVENT HANDLER____________
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    // ----------------------------




    // ____________RENDER-LIST____________
    const renderList = cryptosListAfterSearch.map((currency) => {
        const { uuid, symbol, name, change, iconUrl, marketCap, price, rank } = currency

        return (

            <Link to={`/currency/details/${uuid}`} className="coinGridItem" key={uuid}>
                <div className="coinHolder">
                    <strong className="coinTitle">{rank}. {name}</strong>
                    <div className="coinIcon">
                        <img src={iconUrl} alt={symbol} />
                    </div>
                </div>
                <div className="c-divider"></div>
                <div className="coindetails">
                    <p>Price: {millify(price)}</p>
                    <p>Market Cap: {millify(marketCap)}</p>
                    <p>Daily Change: {millify(change)}</p>
                </div>
            </Link>

        )
    })
    // ----------------------------




    // ------------------------------------------
    return (
        <>
            {/* <h1>Crypto Currencies</h1> */}
            <div className="coinsGrid">
                <div className="searchHolder" >
                    <input type="text" placeholder="Search Coin" className="search" onChange={handleChange} style={{ display: value.display ? value.display : "block" }} />
                </div>
                {cryptosListAfterSearch.length != 0 ? renderList : <p>Loading...</p>}
            </div>
        </>
    )
}