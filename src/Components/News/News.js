import "./news.css"
import moment from "moment"
import NewsApi from "../../API/NewsApi"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCoinsAndStats_Action, getNewsData_Action } from "../../Redux/Actions/Actions"
import API from "../../API/API"



export const News = ({ Limited }) => {

    const colorMode = useSelector(store => store.changeColorReducer)





    const dispatch = useDispatch()





    // -----------------------------------------------------------------------------------
    // ___Sending News Data Array To Store || Dispatch
    useEffect(() => {
        const fetchData = async () => {
            const response = await NewsApi("Cryptocurrency", 100)
            dispatch(getNewsData_Action(response))
        }
        fetchData()
    }, [])

    // ___Receiving Data (Stats and Coins) from Store || Selector
    const NewsArray = useSelector((store) => store.getNewsData_Reducer)


    // ----------------------------
    // ----------------------------
    //___RenderList Creation || MAP of News
    const limitedNewsArray = NewsArray ?
        NewsArray.filter((news) => {
            if (NewsArray.indexOf(news) < 3) return news
        })
        :
        []


    const renderList = Limited ?
        limitedNewsArray.length != 0 ? limitedNewsArray.map((news) => {


            const { name, datePublished, description, image, provider } = news


            return (
                <div className="newsWrapper" key={name}>
                    <div className="newsHeader">
                        <h3 className="newsTitle">
                            {name}
                        </h3>
                        <div className="newsImage">
                            <img src={image ? image.thumbnail.contentUrl : "https://bit.ly/3ndL2rH"} alt="news-image" />
                        </div>
                    </div>
                    <p className="newsDescription">
                        {description}
                    </p>
                    <div className="newsBottom">
                        <div className="postersInfo">
                            <div className="providersImageHolder">
                                <img src={provider[0].image ? provider[0].image.thumbnail.contentUrl : 'https://bit.ly/3ndL2rH'} alt="" />
                            </div>
                            <small className="providersName">{provider[0].name}</small>
                        </div>
                        <small className="newsTime">{moment(datePublished).startOf('ss').fromNow()}</small>
                    </div>
                </div>
            )
        }) : []
        :
        NewsArray ? NewsArray.map((news) => {


            const { name, datePublished, description, image, provider } = news


            return (
                <div className="newsWrapper" key={name}>
                    <div className="newsHeader">
                        <h3 className="newsTitle">
                            {name}
                        </h3>
                        <div className="newsImage">
                            <img src={image ? image.thumbnail.contentUrl : "https://bit.ly/3ndL2rH"} alt="news-image" />
                        </div>
                    </div>
                    <p className="newsDescription">
                        {description}
                    </p>
                    <div className="newsBottom">
                        <div className="postersInfo">
                            <div className="providersImageHolder">
                                <img src={provider[0].image ? provider[0].image.thumbnail.contentUrl : 'https://bit.ly/3ndL2rH'} alt="" />
                            </div>
                            <small className="providersName">{provider[0].name}</small>
                        </div>
                        <small className="newsTime">{moment(datePublished).startOf('ss').fromNow()}</small>
                    </div>
                </div>
            )
        }) : []
    // -----------------------------------------------------------------------------------





    // -----------------------------------------------------------------------------------
    //Sending request for crypto data
    useEffect(() => {
        const fetchData = async () => {
            const response = await API(100)
            dispatch(getCoinsAndStats_Action(response))
        }
        fetchData()
    }, [])
    //Getting Original Data Array From Store
    const cryptosArr = useSelector((store) => store.getCoinsAndStats_Reducer.coins)

    //Mapping only the name (of all currencies)
    const coinOptions = cryptosArr ? cryptosArr.map((currency) => currency.name) : []
    // ----------------------------
    // ----------------------------
    //Rendering Options List ||  MAP of currency names
    const renderOptions = coinOptions ? coinOptions.map(coin => {
        return (
            <option value={coin} key={coin}>{coin}</option>
        )
    }
    ) : []
    // -----------------------------------------------------------------------------------




    // ----------------------------
    // SETTING COLORS || DARK LIGHT MODE
    useEffect(() => {
        const newsWrapper = document.querySelectorAll('.newsWrapper')
        if (colorMode === "dark") {
            newsWrapper.forEach((item) => {
                // item.style.transition = "0.7s"
                item.style.backgroundColor = "#3C415C"
                item.style.color = "white"
            })
        }
        else {
            newsWrapper.forEach((item) => {
                item.style.transition = "0.7s"
                item.style.backgroundColor = "white"
                item.style.color = "black"
            })
        }
    }, [NewsArray, colorMode])
    // ----------------------------
    // ----------------------------




    // ____________EVENT HANDLERS____________
    const handleChange = async (e) => {
        const response = await NewsApi(e.target.value, 100)
        dispatch(getNewsData_Action(response))
    }





    // -----------------------------------------------------------------------------------
    return (
        <div className="newsParentWrapperContainer">
            {NewsArray.length != 0
                ? <>
                    <div className="newsSearchHolder">
                        <select name="select" className="select" onChange={handleChange} style={{ display: Limited ? "none" : "block" }}>
                            <option value="Cryptocurrency">Cryptocurrency</option>
                            {cryptosArr || coinOptions.length !== 0 ? renderOptions : <></>}
                        </select>
                    </div>
                    <div className="newsContainer">
                        {renderList}
                    </div>
                </>
                : <></>
            }
        </div>
    )
}
