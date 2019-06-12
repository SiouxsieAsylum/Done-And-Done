import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import pathVars from '../utils/globals';



class Login extends Component {
	constructor(props){
		super();

		this.loginInput = React.createRef();
	}

	componentDidMount(){
		this.loginInput.current && this.loginInput.current.focus();
	}

	render(){
			if (this.props.isLoggedIn) {
				return <Redirect to={"/" + pathVars.boardlist} />
			} else {
			return (
				<>	
					<input 
						aria-label='login'
						aria-required='true'
						onKeyUp={this.props.login}
						ref={this.loginInput}
						/>
				</>
			)			
		}

      	


	}
}

export default Login;

