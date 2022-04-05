import './App.css';

import { Navbar } from './Components/Navbar/Navbar';
import { News } from "./Components/News/News"
import { Exchanges } from "./Components/Exchange/Exchange"
import { Currencies } from "./Components/Currencies/Currencies"
import { Home } from "./Components/Home/Home"
import { Details } from "./Components/Details/Details"
import { changeColorMode, changeToDark, changeToLight } from './Redux/Actions/Actions';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()





  const colorMode = useSelector(store => store.changeColorReducer)

  useEffect(() => {
    const button = document.querySelector('.button')
    const buttonHolder = document.querySelector('.buttonHolder')
    const app = document.querySelector('.app')


    if (colorMode === "dark") {
      if (app) app.style.backgroundColor = "#726A95"

      button.style.margin = "0"
      button.style.backgroundColor = "rgb(224, 224, 171)"
      buttonHolder.style.backgroundColor = "#402445"

    }
    else {
      if (app) {
        app.style.transition = "0.7s"
        app.style.backgroundColor = "#e2e8f0"
      }
            button.style.marginLeft = "62%"
      button.style.transition = "0.7s"
      button.style.backgroundColor = "#351F39"
      buttonHolder.style.transition = "0.7s"
      buttonHolder.style.backgroundColor = "#C7B198"
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
          {/* <Route path='/news' element={<News />} /> */}
          <Route path='/currency/details/:id' element={<Details />} />
        </Routes>
      </div>


    </Router>
  );
}

export default App;
