import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthGlobally } from '../../context/AuthContext';
import { useCartGlobally } from '../../context/CartContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { Badge } from '@mui/material';
import Search from '../search/Search';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Navbar.css'; // Renamed to match conventional naming

const Navbar = () => {
  const [auth, setAuth] = useAuthGlobally();
  const { cart } = useCartGlobally();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logout Successfully');
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/" className="logo">
          <img className="logo-img" src="/images/bio_life_Logo.png" alt="Bio Life Logo" />
        </Link>
        <div className="search-component">
          <Search />
        </div>
        <ul className="navlinks">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li>
            <NavLink to="/cart">
              <Badge badgeContent={cart.length} color="error">Cart</Badge>
            </NavLink>
          </li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          {auth?.user ? (
            <li onClick={handleLogout}><NavLink to="#">Logout</NavLink></li>
          ) : (
            <li><NavLink to="/login">Login</NavLink></li>
          )}
        </ul>
        <button className="hamburger-menu">
          <GiHamburgerMenu />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
