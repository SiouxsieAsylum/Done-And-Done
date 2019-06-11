import React, { Component } from 'react';


class Login extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
				<input onKeyUp={this.props.login}/>
				<button onClick={this.props.logout}>Logout</button>
				<h1>{this.props.user}</h1>
			</>
		)
	}
}

export default Login;

