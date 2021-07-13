import React, { Component } from 'react';
import { SwaggerService } from '../../services/generated-api';
import loacalStorageService from '../../services/local-storage';
import { Worklogs } from '../../services/models/worklog';
import { worklogApi } from '../../store/worklog';
import CreateWorklog from '../create-worklog';
import Worklog from '../worklog';

export default class View extends Component {
    state = {
        worklog: []
    }

    componentDidMount(){
        worklogApi.getAll();
        SwaggerService.getSwaggerService({email: loacalStorageService.getEmail()!,password: loacalStorageService.getPassword()!}).then(res=>{
        let data=JSON.parse(res)
        this.setState({
            worklog: data.worklogs
        })
        })
    }

    render() {
        const{worklog}=this.state;
        return (
            <div className="app jumbotron rounded">
                <CreateWorklog />
                {worklog.slice(0).reverse().map(w => <Worklog worklog={w} onDelete={this.onDelete}/>)}
            </div>
        )
    }

    onDelete(worklog: Worklogs) {
        SwaggerService.deleteSwaggerService({idworklog: worklog.id, email: loacalStorageService.getEmail()!, password: loacalStorageService.getPassword()!})
    }
}