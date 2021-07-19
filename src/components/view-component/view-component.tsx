import React, { Component } from 'react';
import { SwaggerService } from '../../services/generated-api';
import loacalStorageService from '../../services/local-storage';
import Calendar from '../calendar';
import Header from '../header';
import Worklog from '../worklog';
import './view-component.css'
import {json} from '../../services/json/json'
import { jsonWorklog } from '../../services/json/worklog';
import { Worklogs } from '../../services/models/Worklog/worklog';
import ModalAll from '../modal/modal';
import Modal from 'react-responsive-modal';

export default class View extends Component {
    state = {
        worklog: [],
        showMore: false,
        open: false
    }

    handleClick() {
        this.setState({showMore: true})
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const{worklog, open}=this.state;
        const numberOfItems = this.state.showMore ? worklog.length : 3;
        let i=1;
        const years = JSON.parse(json);
        const work=JSON.parse(jsonWorklog);
        return (
            <div>
                <Header/>
                <div className=" view jumbotron rounded ">
                    <div className="mx-auto">
                    <div className="row">
                        <div className="col-sm align-self-start">
                            <h6>Календарь</h6>
                            <Calendar/>
                        </div>
                        <div className="col-sm-8 worklog-card col-5">
                        <h6>Запись работы</h6>
                        <button className="btn btn-primary" onClick={this.onOpenModal}>Добавить запись в журнал</button>
                            <Modal open={open} onClose={this.onCloseModal}>
                                <ModalAll/>
                            </Modal>
                            <h6>Журнал работ</h6>
                            {work.reverse().slice(0, numberOfItems).map((w: Worklogs) => <Worklog worklog={w} key={i++}/>)}
                            <button className="btn btn-primary w-100" onClick={()=> this.handleClick()}>Показать больше</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}