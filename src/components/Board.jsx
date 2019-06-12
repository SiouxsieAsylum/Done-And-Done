import React, {Component} from 'react';

class Board extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
				<>
					<h1>Board: {this.props.title}</h1>
				</>
			)
	}
}

export default Board;