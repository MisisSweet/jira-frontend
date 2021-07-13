/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import './view-worklog.css';
import {SwaggerService} from '../../services/generated-api/services/SwaggerService';
import loacalStorageService from '../../services/local-storage';
import { Comments } from '../../services/models/comment';

export default class ViewWorklog extends Component{

  state={
    worklog: []
  }

  componentDidMount(){
    SwaggerService.getSwaggerService({email: loacalStorageService.getEmail()!,password: loacalStorageService.getPassword()!}).then(res=>{
      let data=JSON.parse(res)
      this.setState({
        worklog: data.worklogs
      })
    })
  }

  buildCommentPanel(comment: Comments){
    return (
    <div>
      {comment.content?.map(({content})=>content?.map(c1=><p>{c1.text}</p>))}
    </div>
    );
  }

  render(){
    const {worklog}=this.state;
    return(
      <React.Fragment>
        {worklog.slice(0).reverse().map(({id, timeSpent, author:{
        displayName
        }, created, comment
      })=>{
        return(
        <div className="block" key={id}>
          <div className="block-element">
            <img className="img"
              src={"https://secure.gravatar.com/avatar/5f60b4a03bb075cd7c04c6056f04d186?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"}></img>
            {displayName}
            <span> добавил запись в журнал </span>
            {timeSpent}
            <span> в </span>
            {created}
          </div>
          {comment?this.buildCommentPanel(comment):""}
          <div>
            <button className="btn btn-danger mt-2" onClick={e=>{
              const email='margarita.semashko770@gmail.com';
              const password='at2uuC6E364EeMjBbfLf6B5A';
              SwaggerService.deleteSwaggerService({idworklog: id, email, password}).then(res=>{
                this.setState({
                  worklog: this.state.worklog
                })
              });
            }}>Удалить</button>
          </div>
        </div>
        )
      })}
      </React.Fragment>
    )
  }

}
