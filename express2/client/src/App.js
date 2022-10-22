import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.min.css"
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Downloads from './component/Downloads';
import Navigation from './component/Navigation';
import Products from './component/Products';
import "bootstrap/dist/js/bootstrap"
import Register from './component/Register';
import Login from './component/Login';
import { useState, useEffect } from 'react';
import $ from "jquery"
import Shop from "./component/Shop";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeLink, setActiveLink] = useState("home")
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (token)
      localStorage.setItem("token", token)
    else
      localStorage.removeItem("token")

    console.log(localStorage.getItem("token"))
  }, [token])

  useEffect(() => {
    console.log(error)
    if (error) {
      $(".error").animate({ top: "+=115px", opacity: 1 }, 250, () => {
        setTimeout(() => {
          $(".error").animate({ top: "-=115px", opacity: 0 }, 250, () => {
            setError("")
          })
        }, 3000);
      })
    }

    if (success) {
      $(".success").animate({ top: "+=115px", opacity: 1 }, 250, () => {
        setTimeout(() => {
          $(".success").animate({ top: "-=115px", opacity: 0 }, 250, () => {
            setSuccess("")
          })
        }, 3000);
      })
    }
  }, [error, success])

  useEffect(() => {
    fetch("/api/cart", {
      headers: {
        Authorization: "bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => setCartItems(data.items))
  }, [])

  const logout = () => {
    setToken("")
  }

  return (
    <div className="App">
      <div className="error mt-3 alert alert-danger" role="alert">
        {error}
      </div>
      <div className="success mt-3 alert alert-success" role="alert">
        {success}
      </div>
      <Navigation cartItems={cartItems} activeLink={activeLink} logout={logout} token={token} />
      <div className="wrapper">
        <Routes>
          <Route path='/' element={<Home setActiveLink={setActiveLink} />}></Route>
          <Route path='/downloads' element={<Downloads token={token} setActiveLink={setActiveLink} />}></Route>
          <Route path='/products' element={<Products setActiveLink={setActiveLink} setError={setError} token={token} />}></Route>
          <Route path='/shop' element={<Shop setCartItems={setCartItems} setActiveLink={setActiveLink} setError={setError} token={token} />}></Route>
          <Route path='/login' element={<Login setActiveLink={setActiveLink} setError={setError} token={token} setToken={setToken} />}></Route>
          <Route path='/register' element={<Register setSuccess={setSuccess} setActiveLink={setActiveLink} />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
