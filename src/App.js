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
    this.initStateWithLocalStorageValues = this.initStateWithLocalStorageValues.bind(this);

    this.addBoard = this.addBoard.bind(this);
  }

  ///////////////////////// 'AUTH' FUNCTIONS ///////////////////////////

  componentWillMount(){
    this.initStateWithLocalStorageValues();
  }

  componentWillUnmount(){
    
  }

  initStateWithLocalStorageValues(){
    this.setState((prevState) =>{
      let holderState = {};
      holderState.user = localStorage.getItem('user') || '';
      holderState.isLoggedIn = (localStorage.getItem('isLoggedIn') === 'true') || false;

      let allBoards = localStorage.getItem('allBoards');
      holderState.allBoards = allBoards ? JSON.parse(allBoards) : {}
      return holderState;
    })
  }

  login(event){
    let name = event.target.value.trim();
    let key = event.key;

    if (event.key === 'Enter'){
      this.setState((prevState) =>{
        let holderState = {};
        holderState.user = name;
        holderState.isLoggedIn = true;
        

        return holderState;
      })
      console.log(this.state.allBoards)
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', name);
      //localStorage.setItem('allBoards', JSON.stringify(this.state.allBoards))
    } 
  }

  logout(){
    this.setState((prevState) =>{
        let holderState = {};
        holderState.user = '';
        holderState.isLoggedIn = false;

        return holderState; 
    })

    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('user', '');
    localStorage.setItem('allBoards', JSON.stringify(this.state.allBoards))

  }

  //////////////////////////// BOARD CRUD /////////////////////////

  addBoard(obj){
    obj.dateCreated = new Date().toString()
    this.setState((prevState) =>{
        let holderState = prevState;
        holderState.allBoards = prevState.allBoards[this.state.user].push(obj)
        return holderState;
    })
  }

  deleteBoard(event){
    this.setState({

    })
  }

  ////////////////////////// TASK LIST CRUD ///////////////////////


  //////////////////////////// TASK CRUD //////////////////////////

  addTask(event){
    this.setState({

    })
  }

  deleteTask(event){
    this.setState({

    })
  }

  toggleCompletion(event){
    this.setState({

    })
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
            <Route path={'/boardlists'} render={() => (
              <Wrapper
               user={this.state.user}
               logout={this.logout}
               isLoggedIn={this.state.isLoggedIn}
               addBoard={this.addBoard}
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
