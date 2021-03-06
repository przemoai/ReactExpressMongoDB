import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Finalize from "./pages/Finalize"

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={!user ? <Navigate to="/" /> : <Cart />} />
        <Route path="/cart/finalize" element={!user ? <Navigate to="/" /> : <Finalize />} />
        <Route path="/account" element={!user ? <Navigate to="/" /> : <Account />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  )
};

export default App;