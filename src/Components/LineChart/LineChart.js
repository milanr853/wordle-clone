import './line.css'
import { Chart as ChartJS } from "chart.js/auto"
import { Line } from "react-chartjs-2"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'


export const LineChart = ({ priceHistory ,price, name, id, change }) => {
    const [windowSize,setWindowSize] = useState(1500)

    const colorMode = useSelector(store => store.changeColorReducer)

            let timeStampArr = priceHistory && priceHistory.history.length != 0 ? priceHistory.history.map(item => new Date(item.timestamp).toLocaleDateString()) : []

            
            let priceChangeArr = priceHistory && priceHistory.history.length != 0 ? priceHistory.history.map(item => item.price) : []
            


            // Limiting the arr of data for smaller screen || Using limited Data
            window.addEventListener("resize",()=>{setWindowSize(window.innerWidth)})
                if(window.innerWidth <= 500){
                    timeStampArr =  priceHistory.history.filter((item)=>{
                        if (priceHistory.history.indexOf(item)<=25){
                            return item
                        }
                    }).map((item=>new Date(item.timestamp).toLocaleDateString())) 
                
                    priceChangeArr = priceHistory.history.filter((item)=>{
                        if (priceHistory.history.indexOf(item)<=25){
                            return item
                        }
                    }).map((item=>item.price))
                    
                }




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
                <Line data={data} className="line"/>
            </div>
        </>
    )
}