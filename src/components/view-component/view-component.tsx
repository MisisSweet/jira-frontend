import React, { Component } from 'react';
import { SwaggerService } from '../../services/generated-api';
import loacalStorageService from '../../services/local-storage';
import { Worklogs } from '../../services/models/Worklog/worklog';
import Calendars from '../calendar';
import CreateWorklog from '../create-worklog';
import Header from '../header';
import Worklog from '../worklog';
import './view-component.css'

export default class View extends Component {
    state = {
        worklog: []
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

    render() {
        const{worklog}=this.state;
        return (
            <div>
                <Header/>
                <div className=" view jumbotron rounded ">
                    <div className="mx-auto">
                    <h4 className="text">MT-3</h4>
                    <div className="row">
                        <div className="col-3 align-self-start">
                            <h6>Календарь</h6>
                            <Calendars/>
                        </div>
                        <div className="col-4 align-self-start">
                            <h6>Запись работы</h6>
                            <CreateWorklog />
                        </div>
                        <div className="worklog-card col-5">
                            <h6>Журнал работ</h6>
                            {worklog.slice(0).reverse().map(w => <Worklog worklog={w} onDelete={this.onDelete}/>)}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    async onDelete(worklog: Worklogs) {
        await SwaggerService.deleteSwaggerService({idworklog: worklog.id, email: loacalStorageService.getEmail()!, password: loacalStorageService.getPassword()!})
    }
}