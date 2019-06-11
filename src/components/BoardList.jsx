import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import Board from './Board'
import Add from './Add'

const BoardNav = (props) => {
	const nav = (
			<ul>
				{props.boards && props.boards.map(board => {
					return <li key={board.title + '-nav'}>
						<Link to={props.pathname + '/' + board.title}>
							{board.title}
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
			add: false
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


	render(){
		 let pathname = '/boardlists'
		// let fullPathName  = pathname + '/:title';
		// console.log(pathname)
		return (
				<>
						<BoardNav 
							pathname={pathname}
							boards={this.props.boards}
						/>
						{this.props.boards.map((board) =>
						{	
							return <Route
								exact
								key={board.title}
								path={pathname + '/' + board.title} 
								render={() => (
									<Board
										title={board.title}
										dateCreated={board.dateCreated}
										tasklist={board.tasklist}
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