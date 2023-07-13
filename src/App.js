import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import TableComponent from './pages/Table/TableComponent'

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='table' element={<TableComponent />}></Route>
      </Routes>

    </div>
  );
}
export default App;
