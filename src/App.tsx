import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Error/>}/>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

function Error() {
  return <div>Page Not Found!</div>;
}

export default App;