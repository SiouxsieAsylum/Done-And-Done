import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import pathVars from '../utils/globals';
import Add from './Add'
import TaskList from './TaskList';

const TaskListNav = (props) => {
	const nav = (
			<ul>
				{props.tasklists && Object.keys(props.tasklists).map(tasklist => {
					let tasklistObj = props.tasklists[tasklist];
					return <li key={tasklist + '-nav'}>
						<Link to={props.pathname + '/' + tasklistObj.url}>
							{tasklistObj.title}
						</Link>
					</li>
				})}
			</ul>
		)

	return nav;
	
}

class Board extends Component{
	constructor(props){
		super(props)

		this.state ={
			add: false,
			statePathName: pathVars.tasklist,
		}

		this.setAddTrue = this.setAddTrue.bind(this);
		this.handleTaskListAddition = this.handleTaskListAddition.bind(this);
	}

	setAddTrue(){
		this.setState({
			add: true
		})
	}

	handleTaskListAddition(obj){
		this.props.addTaskList(obj, this.props.previousPathName + "/" + this.state.statePathName);
		this.setState({
			add: false
		})
	}

	render(){
		return (
				<>
					<TaskListNav 
						pathname={this.state.statePathName}
						tasklists={this.props.board.tasklists}
					/>
					<h1>Board: {this.props.board.title} <button>Delete Board</button></h1>
					{Object.keys(this.props.board.tasklists).map((title) =>
					{	let tasklist = this.props.board.tasklists[title];
						let newPath = this.props.previousPathName + '/'  + this.state.statePathName + '/' + tasklist.url;
						return <Route
							exact
							key={title + '-tasklist'}
							path={newPath} 
							render={() => (
								<TaskList
									tasklist={tasklist}
									previousPathName={newPath}
									/>
						)}/>
					})}
						<button onClick={this.setAddTrue}>Add Task List</button>
						{this.state.add && <Add 
								tag="tasklist"
								submissionFunction={this.handleTaskListAddition}
									/>
								}
				</>
			)
	}
}

export default Board;