// import { useParams } from "react-router-dom"
import "./exchange.css"
import ExchangeApi from "../../API/Exchanges"
import { useEffect } from "react"
import { useState } from "react"
import { millify } from "millify"
import { useSelector } from "react-redux"


import Styles from '../../Styles';
const {darkModeColors,lightModeColors,delay} = Styles()
const {lbg,lborderCol,lcontainerCol,llogoCol,ltextCol,lnavBarBg} = lightModeColors
const {dbg,dborderCol,dcontainerCol,dlogoCol,dtextCol,dnavBarBg} = darkModeColors


export const Exchanges = () => {
    const colorMode = useSelector(store => store.changeColorReducer)

    const [arr, setArr] = useState([])
    const [extend, setExtend] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            const response = await ExchangeApi()
            setArr(response ? response.coins : [])
        }
        fetchData()
    }, [])



    useEffect(() => {
        const exchangesWrapper = document.querySelectorAll(".exchangesWrapper")
        const exchangeMiddleWrapper = document.querySelectorAll(".exchangeMiddleWrapper")
        const squareDown = document.querySelectorAll(".fa-caret-square-down")
        const exchangesHeader = document.querySelector(".exchangesHeader")


        if (colorMode === "dark") {
            exchangesWrapper.forEach(element => {
                element.style.color = dtextCol
                element.style.backgroundColor = dcontainerCol
                element.style.borderBottom = `1px solid ${dborderCol}`
            })
            exchangeMiddleWrapper.forEach((element) => {
                element.style.backgroundColor = dbg
                element.style.color = dtextCol
            })

            squareDown.forEach((element) => {
                element.style.color = dtextCol
            })
            exchangesHeader.style.color = dtextCol
        }
        else {
            exchangesWrapper.forEach(element => {
                element.style.transition = delay
                element.style.color = ltextCol
                element.style.backgroundColor = lcontainerCol
                element.style.borderBottom = `1px solid ${lborderCol}`
            })
            exchangeMiddleWrapper.forEach((element) => {
                element.style.transition = delay
                element.style.backgroundColor = lbg
                element.style.color = ltextCol
            })

            squareDown.forEach((element) => {
                element.style.transition = delay
                element.style.color = ltextCol
            })
            exchangesHeader.style.color = ltextCol
        }
    }, [arr, colorMode])





    const extendDetails = (e) => {

        const item = e.target.parentNode.nextSibling
        if (extend) {
            item.style.transition = delay
            item.style.boxSizing = "border-box "
            item.style.padding = "10px 15px"
            item.style.height = "150px"
            setExtend(false)
        }
        else {
            item.style.transition = delay
            item.style.padding = "0 15px"
            item.style.height = "0"
            setExtend(true)
        }


    }





    const renderList = arr ? arr.map((item) => {
        const { uuid, name, change, iconUrl, symbol } = item
        return (
            <div className="outerWrapper" key={uuid}>
                <div className="exchangesWrapper" >
                    <i className="far fa-caret-square-down" onClick={extendDetails}></i>
                    <div className="exchangeData">
                        <div className="exchangeCoinIcon">
                            <img src={iconUrl} alt="" />
                        </div>
                    </div>
                    <p className="exchangeData">{millify(item["24hVolume"])}</p>
                    <p className="exchangeData">{symbol}</p>
                    <p className="exchangeData">{change}%</p>
                </div>
                <div className="exchangeMiddleWrapper">
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi cupiditate tenetur illum fuga beatae nesciunt in autem dolor laboriosam odio!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam repellendus, nobis eos tempora dolore laudantium. Fugit rerum, non ducimus itaque, officiis optio quis voluptates ex libero corporis alias suscipit! Labore, omnis doloremque. Dignissimos error illum voluptate consequatur officia! Rem quaerat cum suscipit deserunt? Rem, placeat nesciunt quas ab eum earum voluptatibus! Harum rerum facere, expedita numquam quis necessitatibus saepe tenetur.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe obcaecati unde ratione reprehenderit soluta. Eius recusandae distinctio perferendis itaque natus sunt amet earum autem harum corrupti exercitationem labore sequi eligendi consequuntur ducimus eveniet fugiat fuga voluptatum, nam magni dolore error dolores placeat quidem? Perferendis rerum est neque aspernatur, dolorem, tempora sint dolorum enim corrupti iusto maxime incidunt rem? Quibusdam voluptatem dolorem blanditiis saepe debitis odit minima beatae voluptatibus maiores, nam eligendi at consequuntur harum reiciendis, quo provident ipsa numquam! Porro!
                    </p>
                </div>
            </div>
        )
    }) : []






    return (
        <div className="exchangesParentContainer">

            <div className="exchangesHeader">
                {
                    renderList.length != 0
                        ? <>
                            <p>Exchanges</p>
                            <p>Trade</p>
                            <p>Symbol</p>
                            <p>Change</p>
                        </>
                        : <></>
                }
            </div>
            {renderList.length != 0?renderList:<></>}


        </div>
    )
}