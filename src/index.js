import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

