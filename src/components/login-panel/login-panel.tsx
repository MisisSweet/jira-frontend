import React, {Component} from 'react';
import './login-panel.css';
import { Link } from 'react-router-dom';
import loacalStorageService from '../../services/local-storage';

export default class LoginPanel extends Component{

  state={
    email:'',
    password:''
  }

  render(){
    return(
      <form className="form" >
        <div className="form-group">
          <label className="form-label mt-4">Email</label>
          <input className="form-control" type="email" value={this.state.email}
          onChange={e=>{
            this.setState({
              email: e.target.value
            })
          }}
          ></input>
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Пароль</label>
          <input className="form-control" type="password" value={this.state.password}
          onChange={e=>{
            this.setState({
              password: e.target.value
            })
          }}
          ></input>
        </div>
        <button type="button" className="btn btn-primary" onClick={e=>{
        e.preventDefault();
        loacalStorageService.setEmail(this.state.email);
        loacalStorageService.setPassword(this.state.password);
        window.location.href='/view-component';
      }  
      }>Войти</button>
      </form>
    )
  }

}
