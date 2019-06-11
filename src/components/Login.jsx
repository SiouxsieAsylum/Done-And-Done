import React, { Component } from 'react';
 import { Redirect } from 'react-router-dom'


class Login extends Component {
	constructor(props){
		super();

		this.loginInput = React.createRef();
	}

	componentDidMount(){
		this.loginInput.current.focus();
	}

	render(){
			if (this.props.isLoggedIn) {
				return <Redirect to="/:user/boards" />
			} else {
			return (
				<>	
					<input 
						aria-label='login'
						aria-required='true'
						onKeyUp={this.props.login}
						ref={this.loginInput}
						/>
					<button onClick={this.props.logout}>Logout</button>
					<h1>{this.props.user}</h1>
				</>
			)			
		}

      	


	}
}

export default Login;

