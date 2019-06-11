import React, { Component } from 'react'

class Add extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			message: ''
		}

		this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		let name = event.target.name;
		let value = event.target.value;
		this.setState({
			[name]: value
		})
	}

	handleSubmit(event){
		event.preventDefault();
		const returnVal = {
			title: this.state.title,
			message: this.state.message
		}
		this.props.submissionFunction(returnVal);
	}

	render(){
		return (
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<label>
						Title
						<input 
							name="title" 
							value={this.state.title} 
							onChange={this.handleChange}/>
					</label>
					{this.props.tag === 'task' &&
						<label>
							Message
							<input name="message" 
									value={this.state.message} 
									onChange={this.handleChange}/>
						</label>					}
					<input type='submit' value='Create' />
				</form>
			)
	}
}

export default Add;