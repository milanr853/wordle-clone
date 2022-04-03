import './App.css';

import { Navbar } from './Components/Navbar/Navbar';
import { News } from "./Components/News/News"
import { Exchanges } from "./Components/Exchange/Exchange"
import { Currencies } from "./Components/Currencies/Currencies"
import { Home } from "./Components/Home/Home"
import { Details } from "./Components/Details/Details"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>


      <div className="app">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/currencies' element={<Currencies />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/news' element={<News />} />
          <Route path='/currency/details/:id' element={<Details />} />
        </Routes>
      </div>


    </Router>
  );
}

export default App;
