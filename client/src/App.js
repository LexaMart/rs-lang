import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRoutes } from './routes';

import './App.css';
import 'materialize-css';




function App() {
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized)
  const routes = useRoutes(isAuthenticated)
  return (
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
  );
}

export default App;
