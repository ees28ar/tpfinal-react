import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_API_URL } from '../../constants/constants'
import "./Home.css"



function Home() {
  return (
    <div className="container">
      <div className="left-section">
        <h1>Find the best product for you</h1>
        <p>
          Welcome to our website! We offer a wide range of high-quality products to suit your needs. Whether you're looking for electronics, fashion, home decor, or more, we've got you covered. Explore our categories and find the perfect product for you.
        </p>
        <Link to="/categories" className="button">Browse Categories</Link>
      </div>
      <div className="right-section">
        <img src={LOGO_API_URL} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default Home;
