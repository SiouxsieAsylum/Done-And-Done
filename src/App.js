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

  ///////////////////////// 'AUTH' FUNCTIONS ///////////////////////////

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


  ////////////////////////// BOARDLIST CRUD ///////////////////////

  addBoardList(event){
    
  }

  deleteBoardList(event){
    
  }



  //////////////////////////// BOARD CRUD /////////////////////////

  addBoard(event){

  }

  deleteBoard(event){

  }


  //////////////////////////// TASK CRUD //////////////////////////

  addTask(event){

  }

  deleteTask(event){

  }

  toggleCompletion(event){

  }


  render(){

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
            <Route path={'/boards'} render={() => (
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
