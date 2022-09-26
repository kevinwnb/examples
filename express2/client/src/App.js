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

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/downloads' element={<Downloads />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
