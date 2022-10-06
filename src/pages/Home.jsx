import React from 'react';
import { Home, Navbar } from '../components';
import { fetchLogout } from '../services/fetch-api';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  if (!Boolean(window.localStorage.isLoggedIn)) {
    setTimeout(() => navigate('/'), 500);
    fetchLogout();
  }
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default Homepage;
