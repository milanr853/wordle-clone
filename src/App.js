import './App.css';

import { Navbar } from './Components/Navbar/Navbar';
import { News } from "./Components/News/News"
import { Exchanges } from "./Components/Exchange/Exchange"
import { Currencies } from "./Components/Currencies/Currencies"
import { Home } from "./Components/Home/Home"
import { Details } from "./Components/Details/Details"
import Error from './Components/Error/Error';
import { changeToDark, changeToLight } from './Redux/Actions/Actions';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Styles from './Styles';
import { useLocation } from 'react-router-dom';
const {darkModeColors,lightModeColors,delay} = Styles()
const {lbg,lborderCol,lcontainerCol,llogoCol,ltextCol,lnavBarBg} = lightModeColors
const {dbg,dborderCol,dcontainerCol,dlogoCol,dtextCol,dnavBarBg} = darkModeColors



function App() {
  const dispatch = useDispatch()



    // ----------------------------
    // SETTING HAM-BAR
  const colorMode = useSelector(store => store.changeColorReducer)

  useEffect(() => {
    const button = document.querySelector('.button')
    const buttonHolder = document.querySelector('.buttonHolder')
    const app = document.querySelector('.app')


    if (colorMode === "dark") {
      if (app) app.style.backgroundColor = dbg

      button.style.margin = "0"
      button.style.backgroundColor = "rgb(224, 224, 171)"
      buttonHolder.style.backgroundColor = "#476D7C"

    }
    else {
      if (app) {
        app.style.transition = delay
        app.style.backgroundColor = lbg
      }
            button.style.marginLeft = "62%"
      button.style.transition = delay
      button.style.backgroundColor = "#333C83"
      buttonHolder.style.transition = delay
      buttonHolder.style.backgroundColor = "#5089C6"
    }

  }, [colorMode])

  const changeMode = () => {
    if (colorMode === "dark") {
      dispatch(changeToLight())
    }
    else {
      dispatch(changeToDark())
    }

  }

  // SETTING HAM-BAR
    // ----------------------------




  return (
    <Router>


      <div className="app">
        <div className="buttonHolder">
          <div className="button" onClick={changeMode}></div>
        </div>



        <Navbar />
        <div className="extra"></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/currencies' element={<Currencies />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/news' element={<News />} />
          <Route path='/currency/details/:id' element={<Details />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </div>


    </Router>
  );
}

export default App;
