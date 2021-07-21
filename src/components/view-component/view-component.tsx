import React, { Component } from 'react';
import Calendar from '../calendar';
import Header from '../header';
import Worklog from '../worklog';
import './view-component.css'
import { json } from '../../services/json/json'
import { Year } from '../../services/models/Calendar/year';
import { Month } from '../../services/models/Calendar/month';
import { Week } from '../../services/models/Calendar/week';
import { Day } from '../../services/models/Calendar/day';
import { Worklogs } from '../../services/models/Worklog/worklog';
import Modal from 'react-responsive-modal';
import ModalAll from '../modal/idex';

export default class View extends Component {
    state = {
        worklog: [],
        showMore: false,
        open: false,
        selectedDate: new Date(),
        selectedDateToModal: new Date(),
        selectedWorklog: undefined
    }

    handleShowMoreClick = () => {
        this.setState({ showMore: true })
    }
    handleDayDoubleClick = (date: Date) => {
        this.setState({
            open: true,
            selectedDateToModal: date,
        })
    }
    handleProjectClick = (worklog: Worklogs, date: Date) => {
        this.setState({
            open: true,
            selectedWorklog: worklog,
            selectedDateToModal: date
        })
    }

    handleChangeSelectedDate = (date: Date) => {
        this.setState({
            selectedDate: date
        })
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({
            open: false,
            selectedWorklog: undefined,
        });
    };

    render() {
        const { open, selectedDate, selectedDateToModal, selectedWorklog } = this.state;
        const years = JSON.parse(json);
        const numberOfItems = this.state.showMore ? 10 : 3;
        let i = 1;
        return (
            <React.Fragment>
                <div>
                    <Header />
                    <div className=" view jumbotron rounded ">
                        <div className="mx-auto">
                            <div className="row">
                                <div className="col-sm align-self-start">
                                    <h6>Календарь</h6>
                                    <Calendar
                                        selectedDate={selectedDate}
                                        onChangeSelectedDate={this.handleChangeSelectedDate}
                                        onProjectClick={this.handleProjectClick}
                                        onDayDoubleClick={this.handleDayDoubleClick} />
                                </div>
                                <div className="col-sm-8 worklog-card col-5">
                                    <h6>Записать в журнал</h6>
                                    <button className="btn btn-primary" onClick={this.onOpenModal}>Записать</button>
                                    <Modal open={open} onClose={this.onCloseModal}>
                                        <ModalAll date={selectedDateToModal} worklog={selectedWorklog} onClose={this.onCloseModal} />
                                    </Modal>
                                    <h6>Журнал работ</h6>
                                    {years.map(
                                        (y: Year) => y.months.map(
                                            (m: Month) => m.weeks.map(
                                                (w: Week) => w.days.reverse().slice(0, numberOfItems).map(
                                                    (d: Day) => d.worklog.map(
                                                        (work: Worklogs) =>
                                                            <Worklog worklog={work} key={i++} />
                                                    )
                                                )
                                            )))}
                                    {/* {work.reverse().slice(0, numberOfItems).map((w: Worklogs) => <Worklog day={w} key={i++}/>)} */}
                                    <button className="btn btn-primary w-100" onClick={() => this.handleShowMoreClick()}>Показать больше</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <ModalAll date={selectedDateToModal} worklog={selectedWorklog} onClose={this.onCloseModal} />
                </Modal>
            </React.Fragment>

        )
    }
}