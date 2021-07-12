import React, {Component} from 'react';
import CreateWorklog from '../create-worklog';
import ViewWorklog from '../view-worklog';

export default class View extends Component{

render(){
    
    return(
    <div className="app jumbotron rounded">
        <CreateWorklog/>
        <ViewWorklog/>
    </div>
    )
}

}
