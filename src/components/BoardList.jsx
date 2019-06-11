import React, {Component} from 'react';
import Board from './board'

class BoardList extends Component{
	constructor(props){
		super(props)
	}


	render(){
		return (
				<>
					<button onClick="this.props.addBoard"></button>
				</>
			)
	}
}

export default BoardList;