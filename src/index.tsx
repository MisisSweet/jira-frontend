import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {Route, Router} from 'react-router';
import View from './components/view-component';
import { createBrowserHistory } from 'history'

ReactDOM.render(
  <React.StrictMode>
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={App}/>
      <Route path="/view-component" component={View}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
