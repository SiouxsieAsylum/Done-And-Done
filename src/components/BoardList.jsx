import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import pathVars from '../utils/globals';
import Board from './Board'
import Add from './Add'

const BoardNav = (props) => {
	const nav = (
			<ul>
				{props.boards && Object.keys(props.boards).map(board => {
					let boardObj = props.boards[board];
					return <li key={board + '-nav'}>
						<Link to={"/" + props.pathname + '/' + boardObj.url}>
							{boardObj.title}
						</Link>
					</li>
				})}
			</ul>
		)

	return nav;
}

class BoardList extends Component{
	constructor(props){
		super(props)

		this.state = {
			add: false,
			statePathName: pathVars.boardlist
		}
		this.setAddTrue = this.setAddTrue.bind(this);
		this.handleBoardAddition = this.handleBoardAddition.bind(this);
	}

	setAddTrue(){
		this.setState({
			add: true
		})
	}

	handleBoardAddition(obj){
		this.props.addBoard(obj);
		this.setState({
			add: false
		})
	}

	componentWillUpdate(){
		console.log(this.props);
	}


	render(){
		return (
				<>
					<BoardNav 
						pathname={pathVars.boardlist}
						boards={this.props.boards}
					/>
					{this.props.boards && Object.keys(this.props.boards).map((title) =>
					{	let board = this.props.boards[title]
						let newPath = "/" + pathVars.boardlist + '/' + board.url
						return <Route
							exact
							key={title + '-board'}
							path={newPath} 
							render={() => (
								<Board
									board={board}
									addTaskList={this.props.addTaskList}
									previousPathName={newPath}
									/>
						)}/>
					})}
					<button onClick={this.setAddTrue}>Add Board</button>
					{this.state.add && <Add 
										tag="board"
										submissionFunction={this.handleBoardAddition}
											/>
										}

				</>
			)
	}
}

export default withRouter(BoardList);