import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Inicio } from './pages/Inicio';

function App() {
  return (
      <Router>
        <Routes>
          <Route>
            <Route path='/' element={<Inicio />}/>
          </Route>
        </Routes>
      </Router> 
  );
}

export default App;
