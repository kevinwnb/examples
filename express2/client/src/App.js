import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Downloads from './component/Downloads';
import Navigation from './component/Navigation';
import Products from './component/Products';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import Register from './component/Register';
import Login from './component/Login';
import { useState, useEffect } from 'react';

function App() {

  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (token)
      localStorage.setItem("token", token)
    else
      localStorage.removeItem("token")

    console.log(localStorage.getItem("token"))
  }, [token])

  const logout = () => {
    setToken("")
  }

  return (
    <div className="App">
      <Navigation logout={logout} token={token} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/downloads' element={<Downloads />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/login' element={<Login token={token} setToken={setToken} />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
