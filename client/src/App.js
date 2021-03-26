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
      <Router>
        <Header />
        <div className="main_container">
          {routes}
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
