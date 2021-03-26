import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useSelector } from 'react-redux'


import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';

import './App.css';
import 'materialize-css';

function App() {
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized)
  const routes = useRoutes(isAuthenticated)
  return (
    <div className="app_container">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
    <Header />
    <Router>
      <div className="main_container">
        {routes}
      </div>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
