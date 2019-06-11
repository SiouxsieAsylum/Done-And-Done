import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'


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
						<h1>Wrapper</h1>
						<button onClick={this.props.logout}>Logout</button>
					</>
	  			)
  		}
	}
}

export default Wrapper;