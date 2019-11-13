import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import App from './App';

function Main() {
  return (
      <Router>
          <App/>
      </Router>
  );
}

export default Main;
