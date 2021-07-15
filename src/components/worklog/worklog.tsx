/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './worklog.css';
import { Comments } from '../../services/models/Worklog/comment';
import { Worklogs } from '../../services/models/Worklog/worklog';
import dateformat from 'dateformat';

interface WorklogProps {
  worklog: Worklogs,
  onDelete: Function
}
interface WorklogState {
  worklog: Worklogs
}
export default class ViewWorklog extends Component<WorklogProps, WorklogState> {

  buildCommentPanel(comment: Comments) {
    return (
      <div>
        {comment.content?.map(({ content }) => content?.map(c1 => <p>{c1.text}</p>))}
      </div>
    );
  }

  render() {
    const { worklog } = this.props;
    const { timeSpent, author: {
      displayName
    }, created, comment } = worklog;
    return (
      <React.Fragment>
        <div className="block">
          <div className="block-element">
            <img className="img mr-1"
              src={"https://secure.gravatar.com/avatar/5f60b4a03bb075cd7c04c6056f04d186?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"}></img>
            {displayName}
            <span> добавил запись в журнал </span>
            {timeSpent}
            <span> в </span>
            {dateformat(created, 'dd.mm.yyyy h:MM:ss TT')}
          </div>
          {comment ? this.buildCommentPanel(comment) : ""}
          <div>
            <button className="btn btn-danger mt-2" onClick={this.handleDelete}>Удалить</button>
          </div>
        </div>
      </React.Fragment>
    )
  }

  handleDelete = () => {
    const { onDelete } = this.props;
    const { worklog } = this.props;
    if (onDelete) {
      onDelete(worklog);
    }
  }

}


