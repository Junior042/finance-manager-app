import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Home from './pages/home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Home/>
  );
}

export default App;