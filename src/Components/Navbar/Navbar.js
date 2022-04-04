import "./navbar.css"
import { Link } from "react-router-dom"





export const Navbar = () => {
    const styles = {
        cursor: "pointer",
        textDecoration : "none",
        color:"#e2e2e2"
    }






    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="logoHolder">
                    <h1>Cryptoverse</h1>
                </div>
                <div className="divider"></div>
                <div className="menuOptions">
                    <Link to='/' style={styles} >Home</Link>
                    <Link to='/currencies' style={styles} >Cryptocurrencies</Link>
                    <Link to='/exchanges' style={styles}>Exchanges</Link>
                    <Link to='/news' style={styles} >News</Link>
                </div>
            </div>
        </div>
    )
}

