import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Header from './components/Header/Header.js';
import { styled } from '@mui/material/styles';

import { QueryClient, QueryClientProvider } from "react-query";


const blueBloomColor = 'rgba(0, 153, 255, 0.3)'; 
const pinkBloomColor = 'rgba(255, 153, 204, 0.3)';  

const Background = styled('div')({
  height: '100%',
  background: `linear-gradient(to left top, ${pinkBloomColor}, black, ${blueBloomColor})`,
  
});
const queryClient = new QueryClient();

// import AboutUs from './pages/AboutUs';
// import PastEvents from './pages/PastEvents';
// import ContactUs from './pages/ContactUs';
// import FAQ from './pages/FAQ';

function App() { 
  return (
    <QueryClientProvider client={queryClient}>
      <Background>
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
      </Background>
    </QueryClientProvider>
  );
}

export default App;
