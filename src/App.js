import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Header from './components/Header/Header.js';
// import AboutUs from './pages/AboutUs';
// import PastEvents from './pages/PastEvents';
// import ContactUs from './pages/ContactUs';
// import FAQ from './pages/FAQ';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" exact element={<Home/>} />
        {/* <Route path="/about-us" component={AboutUs} /> */}
        {/* <Route path="/past-events" component={PastEvents} /> */}
        {/* <Route path="/contact-us" component={ContactUs} /> */}
        {/* <Route path="/faq" component={FAQ} />  */}
      </Routes>
    </Router>
  );
}

export default App;