import React, {Component} from 'react';
import LoginPanel from '../login-panel';

import './App.css';

export default class App extends Component{

  render(){
    
    return(
      <div className="app jumbotron rounded">
        <LoginPanel/>
      </div>
    )
  }

}
