import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Home/>
    // <Login/>
    <Register/>
  );
}

export default App;