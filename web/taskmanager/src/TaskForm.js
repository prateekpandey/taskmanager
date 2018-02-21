import React from 'react';
import Display from './display';
import Header from './Header';
import TaskList from "./TaskList";


class TaskForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {datas : [], 'title' : '', 'Description' :'' ,'Status' : '', 'Priority' : ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
    return(
        <form onSubmit={this.handleSubmit}>

            <div className="login-input-item">
                <input className="login-user-input"
                       id="title"
                       placeholder="Title"
                       onChange={e => this.setState({title : e.target.value})}
                />
            </div>

            <div className="login-input-item">
                <input className="login-user-input"
                       id="Description"
                       placeholder="Description"
                       onChange={e => this.setState({Description : e.target.value})}
                />
            </div>

            <div className="login-input-item">
                <input
                    className="login-user-input"
                    id="Status"
                    aria-describedby="emailHelp"
                    placeholder="Status Choices: Initiated Completed Deferred Ignored"
                    onChange={e => this.setState({Status : e.target.value})}
                />
            </div>

            <div className="login-input-item">
                <input
                    className="login-user-input-password login-user-input"
                    id="Priority"
                    placeholder="Priority Choices: Low Medium High"
                    onChange={e => this.setState({Priority : e.target.value})}
                />
            </div>

            <button type="submit" className="buttonStyle" onSubmit={e => e.preventDefault()}>Add Task</button>

        </form>);
    };
}


export default TaskForm;