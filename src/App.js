import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Wrapper from './components/Wrapper'
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
      isLoggedIn: false,
      allBoards: {}
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setStateToLocalStorageValues = this.setStateToLocalStorageValues.bind(this);
  }

  componentWillMount(){
    this.setStateToLocalStorageValues();
  }

  setStateToLocalStorageValues(){
    this.setState((prevState) =>{
      let holderState = prevState
      holderState.user = localStorage.getItem('user') || '';
      holderState.isLoggedIn = (localStorage.getItem('isLoggedIn').trim() === 'true') || false;
      return holderState;
    })
  }

  login(event){
    let name = event.target.value.trim();
    let key = event.key;

    if (event.key === 'Enter'){
      this.setState((prevState) =>{
        let holderState = prevState;
        holderState.user = name;
        holderState.isLoggedIn = true;
        holderState.allBoards[name] = {};
        return holderState;
      })

      console.log(this.state);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', name);
    } 
  }

  logout(){
    this.setState((prevState) =>{
        let holderState = prevState;
        holderState.user = '';
        holderState.isLoggedIn = false;

        return holderState; 
    })

    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('user', '');
  }

  render(){
    let firstView;

    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() => (
              <Login 
                    user={this.state.user}
                    isLoggedIn={this.state.isLoggedIn}
                    logout={this.logout}
                    login={this.login}
                    />           
            )}/>            
            <Route path="/:user/boards" render={() => (
              <Wrapper
               user={this.state.user}
               logout={this.logout}
               isLoggedIn={this.state.isLoggedIn}
               boards={this.state.allBoards[this.state.user]}
               />
            )}
          />

        </div>
      </Router>
    );  
  }

}

export default App;
