import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import pathVars from '../utils/globals';
import Add from './Add';

const Task = (props) => {
    const today = new Date()
    const dateCreated = new Date(props.task.dateCreated)
    const dateClosed = new Date(props.task.dateClosed)

    const daysOpen = dateClosed ? dateClosed - dateCreated : today - dateCreated;

    return (
        <>
            <div>{props.task.title} {daysOpen}<span onClick="this.props.handleClick">{props.task.isComplete}</span></div>
            <div>{props.task.message}</div>
            <div>{daysOpen}</div>
        </>
    )
}

class TaskList extends Component{
    constructor(props){
        super(props)
        this.state = {
            add: false,
            statePathName: pathVars.tasklist
        }

        this.setAddTrue = this.setAddTrue.bind(this);
        this.handleTaskAddition = this.handleTaskAddition.bind(this);
    }

    setAddTrue(){
		this.setState({
			add: true
		})
	}

	handleTaskAddition(obj){
		this.props.addTaskList(obj, this.props.previousPathName);
		this.setState({
			add: false
		})
	}

    render(){
        return (
            <>
					<h1>TaskList: {this.props.tasklist.title} <button>Delete Tasklist</button></h1>
					{this.props.tasklist.map((task) =>
					{	
						return <Task
                                    task={task}
                                    toggleCompletion={this.props.toggleCompletion}
									/>
					    })}
                            <button onClick={this.setAddTrue}>Add Task</button>
                            {this.state.add && <Add 
                                    tag="task"
                                    submissionFunction={this.handleTaskAddition}
                                        />
                                    }
            </>
        )
    }
}

export default withRouter(TaskList);