import './line.css'
import PriceHistoryApi from "../../API/PriceHistoryApi"
import { useEffect } from 'react'
import { useState } from 'react'

import Chart from 'chart.js/auto';


export const LineChart = ({ price, name, id }) => {
    const [priceHistory, setPriceHistory] = useState()
    const [timeStampArr, setTimeStampArr] = useState([])
    const [priceChangeArr, setPriceChangeArr] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await PriceHistoryApi(id)
            setPriceHistory(response)
            setTimeStampArr(response && response.history.length != 0 ? response.history.map(item => new Date(item.timestamp).toLocaleDateString()) : [])
            setPriceChangeArr(response && response.history.length != 0 ? response.history.map(item => item.price) : [])
        }
        fetchData()
    }, [])







    return (
        <>
            <div className="chartHeader">
                <h3 className="chartTitle">{name} Price Chart</h3>
                <div className="priceContainer">
                    <h3 className="priceChange">{priceHistory ? priceHistory.change : 0}%</h3>
                    <h3 className="currentPrice">Current {name} Price:  ${price}</h3>
                </div>
            </div>

            <div className="chart">

            


            </div>
        </>
    )
}