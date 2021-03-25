import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import 'materialize-css';
import { useRoutes } from './routes';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';

function App() {
  const routes = useRoutes(true)
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
