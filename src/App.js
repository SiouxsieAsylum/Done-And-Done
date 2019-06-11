import React, { Component } from 'react';
import Login from './components/Login';
import BoardList from './components/BoardList'
import './App.css';

/*
  {
    user: [
        {
          title: '',
          dateCreated: xx/xx/xx,
          tasklist: [
            {
              title: '',
              message: '',
              isComplete: false,
              dateCreated: xx/xx/xx,
              dateCompleted: xx/xx/xx
            },
            {
  
            }
          ]
        },
        {
          title: '',
          dateCreated: xx/xx/xx,
          tasklist: [
            {
              title: '',
              message: '',
              isComplete: false,
              dateCreated: xx/xx/xx,
              dateCompleted: xx/xx/xx
            },
            {
  
            }
          ]
        },
        ...
      
    ],
    user2: [

    ],
    ... 
  }
*/

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: '',
      allBoards: {}
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getAllUserBoards = this.getAllUserBoards.bind(this);
  }

  getAllUserBoards(){

  }

  login(event){
    let name = event.target.value.trim();
    let key = event.key;

    if (event.key === 'Enter'){
      this.setState(() =>{
        let holderState = this.state;
        holderState['user'] = name;
        holderState['allBoards'][name] = {};

        return holderState;
      })
    } 
  }

  logout(){
    this.setState(() =>{
        return {user: ''} 
    })
  }

  render(){

    return (
      <div className="App">
        <Login 
          user={this.state.user}
          login={this.login}
          logout={this.logout}
          />
      </div>
    );  
  }

}

export default App;
