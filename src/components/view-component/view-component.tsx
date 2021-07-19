import React, { Component } from 'react';
import { SwaggerService } from '../../services/generated-api';
import loacalStorageService from '../../services/local-storage';
import Calendar from '../calendar';
import CreateWorklog from '../create-worklog';
import Header from '../header';
import Worklog from '../worklog';
import './view-component.css'
import {json} from '../../services/json/json'
import { jsonWorklog } from '../../services/json/worklog';
import { Worklogs } from '../../services/models/Worklog/worklog';

export default class View extends Component {
    state = {
        worklog: [],
        showMore: false
    }

    swagger(){
        SwaggerService.getSwaggerService({email: loacalStorageService.getEmail()!,password: loacalStorageService.getPassword()!}).then(res=>{
            let data=JSON.parse(res)
            this.setState({
                worklog: data.worklogs
            })
        })
    }
    componentDidMount(){
        this.swagger();
    }

    componentDidUpdate(){
        this.swagger();
    }

    handleClick() {
        this.setState({showMore: true})
    }

    render() {
        const{worklog}=this.state;
        const numberOfItems = this.state.showMore ? worklog.length : 3;
        let i=1;
        const years = JSON.parse(json);
        const work=JSON.parse(jsonWorklog);
        return (
            <div>
                <Header/>
                <div className=" view jumbotron rounded ">
                    <div className="mx-auto">
                    <h4 className="text">MT-3</h4>
                    <div className="row">
                        <div className="col-sm align-self-start">
                            <h6>Календарь</h6>
                            <Calendar years={years}/>
                        </div>
                        <div className="col-sm-8 worklog-card col-5">
                        <h6>Запись работы</h6>
                            <CreateWorklog />
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