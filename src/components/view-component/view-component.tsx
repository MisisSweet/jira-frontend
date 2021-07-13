import React, { Component } from 'react';
import { SwaggerService } from '../../services/generated-api';
import loacalStorageService from '../../services/local-storage';
import { Worklogs } from '../../services/models/worklog';
import CreateWorklog from '../create-worklog';
import Worklog from '../worklog';

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
            <div className="app jumbotron rounded">
                <CreateWorklog />
                {worklog.slice(0).reverse().map(w => <Worklog worklog={w} onDelete={this.onDelete}/>)}
            </div>
        )
    }

    async onDelete(worklog: Worklogs) {
        await SwaggerService.deleteSwaggerService({idworklog: worklog.id, email: loacalStorageService.getEmail()!, password: loacalStorageService.getPassword()!})
    }
}