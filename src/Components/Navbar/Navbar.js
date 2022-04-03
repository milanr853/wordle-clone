import "./navbar.css"
import { Link } from "react-router-dom"
import API from "../../API/API"
import { useDispatch, useSelector } from "react-redux"
import { getDefault, getNewsDefault, getNewsValuesActions, getValuesActions } from "../../Redux/Actions/Actions"

export const Navbar = () => {
    const styles = {
        cursor: "pointer",
        textDecoration : "none",
        color:"#e2e2e2"
    }
    const dispatch = useDispatch()


    const handleCryptoClick = async ()=>{
        // dispatch(getValuesActions())
    }
    const handleNewsClick = ()=>{
        // dispatch(getNewsValuesActions())
    }
    const handleHomeClick = ()=>{
        // dispatch(getDefault())
        // dispatch(getNewsDefault())
    }


    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="logoHolder">
                    <h1>Cryptoverse</h1>
                </div>
                <div className="divider"></div>
                <div className="menuOptions">
                    <Link to='/' style={styles} onClick={handleHomeClick}>Home</Link>
                    <Link to='/currencies' style={styles} onClick={handleCryptoClick}>Cryptocurrencies</Link>
                    <Link to='/exchanges' style={styles}>Exchanges</Link>
                    <Link to='/news' style={styles} onClick={handleNewsClick}>News</Link>
                </div>
            </div>
        </div>
    )
}

