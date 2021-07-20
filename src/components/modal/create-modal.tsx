import React, { Component } from 'react';
import './modal.css';

export default class CreateModal extends Component {

  state = {
    timeSpent: '',
    comment: '',
    project: ''
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <form className="form" onSubmit={e => {
        e.preventDefault();
        // const { timeSpent, comment } = this.state;
      }}>
        <div className="form-group">
          <label className="form-label mt-4">Проект</label>
          <input className="form-control" value={this.state.project}
            onChange={e => {
              this.setState({
                project: e.target.value
              })
            }}></input>
          <label className="form-label mt-4">Время</label>
          <input className="form-control" value={this.state.timeSpent}
            onChange={e => {
              this.setState({
                timeSpent: e.target.value
              })
            }}></input>
          <small className="form-text">Используйте формат: 2w 4d 6h 45m</small>
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Комментарий</label>
          <textarea className="form-control" value={this.state.comment}
            onChange={e => {
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
