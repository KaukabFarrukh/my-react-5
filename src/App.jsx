import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Navbar from './pages/navbar.jsx';
import { Link} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Images from './pages/images.jsx';
import Maps from './pages/maps.jsx';
import News from './pages/news.jsx';
import Products from './pages/products.jsx';
import SignIn from './pages/SignIn.jsx';
import Video from './pages/video.jsx';



function App () {
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/video" element={<Video/>} />
        <Route path="/images" element={<Images/>} />
        <Route path="/maps" element={<Maps/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/signIn" element={<SignIn/>} />
      </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;