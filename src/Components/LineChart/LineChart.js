import './line.css'
import { Chart as ChartJS } from "chart.js/auto"
import { Line } from "react-chartjs-2"
import { useSelector } from 'react-redux'


export const LineChart = ({ priceHistory ,price, name, id, change }) => {
    const colorMode = useSelector(store => store.changeColorReducer)

            const timeStampArr = (priceHistory && priceHistory.history.length != 0 ? priceHistory.history.map(item => new Date(item.timestamp).toLocaleDateString()) : [])
            const priceChangeArr = (priceHistory && priceHistory.history.length != 0 ? priceHistory.history.map(item => item.price) : [])




    const data = {
        labels: timeStampArr,
        datasets: [
            {
                label: "Price in USD",
                data: priceChangeArr,
                backgroundColor: colorMode==="dark"?"white":"dodgerblue",
                borderColor: colorMode==="dark"?"#bababa":"#2066ac",
                borderWidth: 1,
                pointBorderColor:"black",
                fontColor:"white"
            }
        ]
    }





    return (
        <>
            <div className="chartHeader">
                <h3 className="chartTitle">{name} Price Chart</h3>
                <div className="priceContainer">
                    <h3 className="priceChange">{change}%</h3>
                    <h3 className="currentPrice">Current {name} Price:  ${price}</h3>
                </div>
            </div>

            <div className="chart">
                <Line data={data}/>
            </div>
        </>
    )
}