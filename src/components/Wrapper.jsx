import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import BoardList from './BoardList'
// import ToolBar from './Toolbar'


function Toolbar(props){
	return (
		<h1>
			Toolbar 					
			<button onClick={props.logout}>Logout</button>
		</h1>
	)
}

class Wrapper extends Component{
	constructor(props){
		super(props)
	}
	render(){
		if (!this.props.isLoggedIn) {
			return <Redirect to="/" />
		} else {
  		return (
				<>
					<Toolbar 
						logout={this.props.logout}
						/>
					<BoardList 
						boards={this.props.boards}
						/>
				</>
  			)
  		}
	}
}

export default Wrapper;