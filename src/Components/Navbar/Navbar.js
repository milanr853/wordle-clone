import "./navbar.css"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"


import Styles from '../../Styles';
const {darkModeColors,lightModeColors,delay} = Styles()
const {lbg,lborderCol,lcontainerCol,llogoCol,ltextCol,lnavBarBg} = lightModeColors
const {dbg,dborderCol,dcontainerCol,dlogoCol,dtextCol,dnavBarBg} = darkModeColors


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
            hamBox.style.transition = delay
            hamBox.style.top = "100px"
            setOnHamBar(true)
        }
        else {
            hamBox.style.transition = delay
            hamBox.style.top = "-200px"
            setOnHamBar(false)
        }
    }
    // ----------------------------
    // ----------------------------


    const hideHambar = ()=>{
        const hamBox = document.querySelector(".hamburgerMenuBox")
        hamBox.style.top = "-200px"
        setOnHamBar(false)
    }



    // ----------------------------
    // SETTING COLORS || DARK LIGHT MODE
    useEffect(() => {
        const logo = document.querySelector('.LOGO')
        const nav = document.querySelector('.navbar')
        const divider = document.querySelector('.divider')
        const navoptions = document.querySelectorAll('.navOptions')
        const hamBox = document.querySelector(".hamburgerMenuBox")
        const bi = document.querySelector(".bi-list")


        if (colorMode === "dark") {
            if (bi) {
                bi.style.color = "bisque"
            }
            if (nav) {
                nav.style.backgroundColor = dnavBarBg
            }
            if (hamBox) {
                hamBox.style.backgroundColor = dnavBarBg
            }
            if (logo) {
                logo.style.textDecoration = "none"
                logo.style.color = dlogoCol
            }
            navoptions.forEach((item) => {
                item.style.color = dlogoCol
            })
            divider.style.backgroundColor = dborderCol
        }
        else {
            if (bi) {
                bi.style.transition = delay
                bi.style.color = "white"
            }
            if (nav) {
                nav.style.transition = delay
                nav.style.backgroundColor = lnavBarBg
            }
            if (hamBox) {
                hamBox.style.transition = delay
                hamBox.style.backgroundColor = lnavBarBg
            }
            if (logo) {
                logo.style.transition = delay
                logo.style.color = llogoCol
            }
            navoptions.forEach((item) => {
                item.style.transition = delay
                item.style.color = "white"
            })
            divider.style.transition = delay
            divider.style.backgroundColor = lborderCol
        }
    }, [colorMode])
    // ----------------------------
    // ----------------------------




    return (
        <>
            <div className="hamburgerMenuBox">
                <Link to='/' style={styles} className='navOptions' onClick={hideHambar}>Home</Link>
                <Link to='/currencies' style={styles} className='navOptions' onClick={hideHambar}>Cryptocurrencies</Link>
                <Link to='/exchanges' style={styles} className='navOptions' onClick={hideHambar}>Exchanges</Link>
                <Link to='/news' style={styles} className='navOptions' onClick={hideHambar}>News</Link>
            </div>

            <div className="navbar">
                <div className="wrapper">
                    <div className="logoHolder">
                        <i className="bi bi-list" onClick={generateHamBar}></i>
                        <h1 className="navLogo" onClick={hideHambar}><Link className="LOGO" to='/'>Cryptoverse</Link></h1>
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

