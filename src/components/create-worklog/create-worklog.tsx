import React, {Component} from 'react';
import { SwaggerService } from '../../services/generated-api';
import loacalStorageService from '../../services/local-storage';
import './create-worklog.css';

export default class CreateWorklog extends Component{

  state={
    timeSpent: '',
    comment: ''
  }

  render(){
    return(
      <form className="form" onSubmit={e=>{
        e.preventDefault();
        const {timeSpent, comment}=this.state;
        SwaggerService.postSwaggerService({email: loacalStorageService.getEmail()!,password:loacalStorageService.getPassword()!, timeSpent, comment})
        .then(res=>console.log(JSON.parse(res)));
        this.setState({
          timeSpent:'',
          comment: ''
        })
      }}>
        <div className="form-group">
          <label className="form-label mt-4">Время</label>
          <input className="form-control" value={this.state.timeSpent}
          onChange={e=>{
            this.setState({
              timeSpent: e.target.value
            })
          }}></input>
          <small  className="form-text">Используйте формат: 2w 4d 6h 45m</small>
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Комментарий</label>
          <textarea className="form-control"value={this.state.comment}
          onChange={e=>{
            this.setState({
              comment: e.target.value
            })
          }}></textarea>
        </div>
        <button className="btn btn-primary"> Записать</button>
      </form>
    )
  }

}
