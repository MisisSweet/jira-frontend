import React, {Component} from 'react';
import './create-worklog.css';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CreateModal from './create-modal';

export default class CreateWorklog extends Component{
  state={
    open: false
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render(){
    const { open } = this.state;
    return(
      <div>
        <button className="btn btn-primary" onClick={this.onOpenModal}>Добавить запись в журнал</button>
        <Modal open={open} onClose={this.onCloseModal}>
          <CreateModal/>
        </Modal>
      </div>
      )
  }

}
