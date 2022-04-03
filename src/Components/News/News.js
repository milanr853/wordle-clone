import "./news.css"
import moment from "moment"
import NewsApi from "../../API/NewsApi"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNewsData_Action,getNewsUpdatedValues_Actions, getUpdatedValues_Actions } from "../../Redux/Actions/Actions"



export const News = ({ simplified }) => {
    const dispatch = useDispatch()


    //__DISPATCH DEFAULT NEWS VALUES ACTION
    useEffect(() => {
        if (!simplified) {
            dispatch(getNewsUpdatedValues_Actions())
        }
    }, [])
    //__GETTING VALUES FROM STORE
    const newsValues = useSelector(store => store.displayNewsOverPage_Reducer)



    // -----------------------------------------------------------------------------------
    // ___Sending News Data Array To Store || Dispatch
    useEffect(() => {
        const fetchData = async () => {
            const response = await NewsApi("Cryptocurrency", newsValues.count ? newsValues.count : 3)
            dispatch(getNewsData_Action(response))
        }
        fetchData()
    }, [newsValues])
    // ___Receiving Data (Stats and Coins) from Store || Selector
    const NewsArray = useSelector((store) => store.getNewsData_Reducer)
    // ----------------------------

    // ----------------------------
    //___RenderList Creation || MAP of News
    const renderList = NewsArray.map((news) => {


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
    })
    // -----------------------------------------------------------------------------------





    // -----------------------------------------------------------------------------------
    //Getting Original Data Array From Store
    const cryptosArr = useSelector((store) => store.getCoinsAndStats_Reducer.coins)


    //Mapping only the name (of all currencies)
    const coinOptions = cryptosArr.map((currency) => currency.name)
    // ----------------------------

    // ----------------------------
    //Rendering Options List ||  MAP of currency names
    const renderOptions = coinOptions.map(coin => {
        return (
            <option value={coin} key={coin}>{coin}</option>
        )
    }
    )
    // -----------------------------------------------------------------------------------




    // ____________EVENT HANDLERS____________
    const handleChange = async (e) => {
        const response = await NewsApi(e.target.value, 100)
        dispatch(getNewsData_Action(response))
    }





    // -----------------------------------------------------------------------------------
    return (
        <>
            {/* <h1>News</h1> */}
            <div className="newsContainer">
                <div className="newsSearchHolder">
                    <select name="select" className="select" onChange={handleChange} style={{ display: newsValues.display ? newsValues.display : "block" }}>
                        <option value="Cryptocurrency">Cryptocurrency</option>
                        {cryptosArr && coinOptions.length != 0 ? renderOptions : <></>}
                    </select>
                </div>
                {
                    NewsArray && NewsArray.length != 0 ? renderList : <h1>Loading...</h1>
                }
            </div>
        </>
    )
}
