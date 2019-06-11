import React, { Component } from 'react';


class Login extends Component {
	constructor(props){
		super(props);

		this.loginInput = React.createRef();
	}

	componentDidMount(){
		this.loginInput.current.focus();
	}

	render(){
		return (
			<>
				<input 
					onKeyUp={this.props.login}
					ref={this.loginInput}
					/>
				<button onClick={this.props.logout}>Logout</button>
				<h1>{this.props.user}</h1>
			</>
		)
	}
}

export default Login;

