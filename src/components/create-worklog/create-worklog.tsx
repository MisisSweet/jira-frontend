import React, {Component} from 'react';
import { SwaggerService } from '../../services/generated-api';
import './create-worklog.css';

export default class CreateWorklog extends Component{
 
  state={
    timeSpent: ''
  }


  render(){
    

    return(
      <form className="form" onSubmit={e=>{
        e.preventDefault();
        const password='at2uuC6E364EeMjBbfLf6B5A';
        const email='margarita.semashko770@gmail.com';
        const {timeSpent}=this.state;
        SwaggerService.postSwaggerService({email,password, timeSpent});
        this.setState({
          timeSpent:''
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
          <textarea className="form-control"></textarea>
        </div>
        <button className="btn btn-primary"> Записать</button>
      </form>
    )
  }

}
