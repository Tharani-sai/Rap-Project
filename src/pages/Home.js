import React from 'react';
import { Link } from "react-router-dom";
import rapImage from '../rapImage.svg';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={rapImage} className="App-logo" alt="rap" />
        <Link className='App-link' to="/table">View Table Component</Link>
      </header>
    </div>
  );
}
export default Home;
