import "./navbar.css"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"





export const Navbar = () => {

    const colorMode = useSelector(store => store.changeColorReducer)





    const styles = {
        cursor: "pointer",
        textDecoration: "none",
    }



    // ----------------------------
    // SETTING HAM-BAR
    const [onHamBar, setOnHamBar] = useState(false)

    const generateHamBar = () => {
        const hamBox = document.querySelector(".hamburgerMenuBox")
        if (!onHamBar) {
            hamBox.style.transition = "0.7s"
            hamBox.style.top = "100px"
            setOnHamBar(true)
        }
        else {
            hamBox.style.transition = "0.7s "
            hamBox.style.top = "-200px"
            setOnHamBar(false)
        }
    }
    // ----------------------------
    // ----------------------------



    // ----------------------------
    // SETTING COLORS || DARK LIGHT MODE
    useEffect(() => {
        const nav = document.querySelector('.navbar')
        const logo = document.querySelector('.logoHolder')
        const navoptions = document.querySelectorAll('.navOptions')
        const hamBox = document.querySelector(".hamburgerMenuBox")
        const bi = document.querySelector(".bi-list")


        if (colorMode === "dark") {
            if (bi) {
                // bi.style.transition = "0.7s"
                bi.style.color = "bisque"
            }
            if (nav) {
                // nav.style.transition = "0.7s"
                nav.style.backgroundColor = "#351F39"
            }
            if (hamBox) {
                // hamBox.style.transition = "0.7s"
                hamBox.style.backgroundColor = "#351F39"
            }
            if (logo) {
                // logo.style.transition = "0.7s"
                logo.style.color = "#B4A5A5"
            }
            navoptions.forEach((item) => {
                // item.style.transition = "0.7s"
                item.style.color = "#B4A5A5"
            })
        }
        else {
            if (bi) {
                bi.style.transition = "0.7s"
                bi.style.color = "white"
            }
            if (nav) {
                nav.style.transition = "0.7s"
                nav.style.backgroundColor = "#161853"
            }
            if (hamBox) {
                hamBox.style.transition = "0.7s"
                hamBox.style.backgroundColor = "#161853"
            }
            if (logo) {
                logo.style.transition = "0.7s"
                logo.style.color = "#1893da"
            }
            navoptions.forEach((item) => {
                item.style.transition = "0.7s"
                item.style.color = "white"
            })
        }
    }, [colorMode])
    // ----------------------------
    // ----------------------------




    return (
        <>
            <div className="hamburgerMenuBox">
                <Link to='/' style={styles} className='navOptions'>Home</Link>
                <Link to='/currencies' style={styles} className='navOptions'>Cryptocurrencies</Link>
                <Link to='/exchanges' style={styles} className='navOptions'>Exchanges</Link>
                <Link to='/news' style={styles} className='navOptions'>News</Link>
            </div>

            <div className="navbar">
                <div className="wrapper">
                    <div className="logoHolder">
                        <i class="bi bi-list" onClick={generateHamBar}></i>
                        <h1 className="navLogo">Cryptoverse</h1>
                    </div>
                    <div className="divider"></div>
                    <div className="menuOptions">
                        <Link to='/' style={styles} className='navOptions'>Home</Link>
                        <Link to='/currencies' style={styles} className='navOptions'>Cryptocurrencies</Link>
                        <Link to='/exchanges' style={styles} className='navOptions'>Exchanges</Link>
                        <Link to='/news' style={styles} className='navOptions'>News</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

