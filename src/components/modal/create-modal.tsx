import React, { Component } from 'react';
import { Worklogs } from '../../services/models/Worklog/worklog';
import Worklog from '../worklog';
import './modal.css';

interface CreateModalProps {
  worklog?: Worklogs,
  date: Date,
  onClose?: Function,
}
interface CreateModalState {
  timeSpent: string,
  comment: string,
  project: string
}
export default class CreateModal extends Component<CreateModalProps, CreateModalState> {

  constructor(props: CreateModalProps) {
    super(props);

    const { worklog } = this.props;
    let commentText = '';

    this.state = {
      timeSpent: worklog?.timeSpent || '',
      comment: worklog?.comment?.content[0]?.content[0]?.text || '',
      project: worklog?.project || '',
    }
  }

  render() {
    const { project, comment, timeSpent } = this.state
    const { worklog, onClose } = this.props
    return (
      <form className="form" onSubmit={e => {
        e.preventDefault();
      }}>
        <div className="form-group">
          <label className="form-label mt-4">Проект</label>
          <input className="form-control" value={project}
            onChange={e => {
              this.setState({
                project: e.target.value
              })
            }}></input>
          <label className="form-label mt-4">Время</label>
          <input className="form-control" value={timeSpent}
            onChange={e => {
              this.setState({
                timeSpent: e.target.value
              })
            }}></input>
          <small className="form-text">Используйте формат: 2w 4d 6h 45m</small>
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Комментарий</label>
          <textarea className="form-control" value={comment}
            onChange={e => {
              this.setState({
                comment: e.target.value
              })
            }}></textarea>
        </div>
        <button className="btn btn-primary" onClick={this.handleSaveClick}> Записать</button>
        {worklog ? <button className="btn btn-primary" onClick={this.handleDeleteClick}> Удалить</button> : ''}
      </form>
    )
  }
  handleSaveClick = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose()
    }
  }
  handleDeleteClick = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose()
    }
  }
}
