/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './worklog.css';
import { Comments } from '../../services/models/comment';
import { Worklogs } from '../../services/models/worklog';

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
    const { id, timeSpent, author: {
      displayName
    }, created, comment } = worklog;
    return (
      <React.Fragment>
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
