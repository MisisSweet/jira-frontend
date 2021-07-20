import React, { Component } from 'react';
import Calendar from '../calendar';
import Header from '../header';
import Worklog from '../worklog';
import './view-component.css'
import {json} from '../../services/json/json'
import { Year } from '../../services/models/Calendar/year';
import { Month } from '../../services/models/Calendar/month';
import { Week } from '../../services/models/Calendar/week';
import { Day } from '../../services/models/Calendar/day';
import { Worklogs } from '../../services/models/Worklog/worklog';

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
        const years = JSON.parse(json);
        const numberOfItems = this.state.showMore ? 10 : 3;
        let i=1;
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
                            <h6>Журнал работ</h6>
                            {years.map(
                                (y: Year)=>y.months.map(
                                    (m:Month)=>m.weeks.map(
                                        (w:Week)=>w.days.reverse().slice(0, numberOfItems).map(
                                            (d:Day)=>d.worklog.map(
                                                (work: Worklogs)=>
                                                <Worklog worklog={work} key={i++}/>
                                            )
                                            )
                                        )))}
                            {/* {work.reverse().slice(0, numberOfItems).map((w: Worklogs) => <Worklog day={w} key={i++}/>)} */}
                            <button className="btn btn-primary w-100" onClick={()=> this.handleClick()}>Показать больше</button>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}