/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './worklog.css';
import { Comments } from '../../services/models/Worklog/comment';
import dateformat from 'dateformat';
import { Day } from '../../services/models/Calendar/day';
import { Worklogs } from '../../services/models/Worklog/worklog';

interface WorklogProps {
  worklog: Worklogs,
}
interface WorklogState {
  worklog: Worklogs,
}
export default class ViewWorklog extends Component<WorklogProps, WorklogState> {

  buildCommentPanel(comment: Comments) {
    return (
      <div>
        {comment.content?.map(({ content }) => content?.map((c1, i) => <p key={i}>{c1.text}</p>))}
      </div>
    );
  }

  render() {
    const { worklog} = this.props;
    const { timeSpent, created, author:{displayName}, project, comment } = worklog
    return (
      <React.Fragment>
        <div className="block">
          <div className="block-element">
            <img className="img mr-1"
              src={"https://secure.gravatar.com/avatar/5f60b4a03bb075cd7c04c6056f04d186?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"}></img>
            {displayName}
            <span> добавил запись в журнал проекта </span>
            {project}
            <span> </span>
            {timeSpent}
            <span> - </span>
            {dateformat(created, 'dd.mm.yyyy h:MM:ss TT')}
          </div>
          {comment?this.buildCommentPanel(comment):''}
        </div>
      </React.Fragment>
    )
  }

}


