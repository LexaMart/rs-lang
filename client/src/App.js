import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css';
import 'materialize-css';

import { useRoutes } from './routes';

function App() {
  const routes = useRoutes(false)
  return (
    <Router>
      <div className="container">
        {routes}
      </div>
    </Router>
  );
}

export default App;
