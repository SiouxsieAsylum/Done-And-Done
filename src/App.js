import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Wrapper from './components/Wrapper';
import PathUtilities from './utils/pathUtilities';
import pathVars from './utils/globals';
import './App.css';


  // {
  //   user: [
  //       title:{
  //         title: '',
  //         dateCreated: xx/xx/xx,
  //         tasklists: [
  //           {
  //             title: '',
  //             message: '',
  //             isComplete: false,
  //             dateCreated: xx/xx/xx,
  //             dateCompleted: xx/xx/xx
  //           },
  //           {
  
  //           }
  //         ]
  //       },
  //       title:{
  //         title: '',
  //         dateCreated: xx/xx/xx,
  //         tasklists: 
  //           title: {
  //             title: '',
  //             description: '',
  //             list: [
  //               {
  //                 title: '',
  //                 message: '',
  //                 isComplete: false,
  //                 dateCreated: xx/xx/xx,
  //                 dateCompleted: xx/xx/xx
  //               },
  //               {
      
  //               }
  //             ]
  //           },
  //           title:{
  //             // ...
  //           }
  //         },
  //         title: {
  //           // ...
  //         }
  //       },
  //       // ...
      
  //   ],
  //   user2: [

  //   ],
  //   ... 
  // }

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
    this.initStateWithsessionStorageValues = this.initStateWithsessionStorageValues.bind(this);
    this.setStateInSessionStorage = this.setStateInSessionStorage.bind(this);

    this.addBoard = this.addBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.addTaskList = this.addTaskList.bind(this);
    this.deleteTaskList = this.deleteTaskList.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  ///////////////////////// 'AUTH' FUNCTIONS ///////////////////////////

  componentWillMount(){
    this.initStateWithsessionStorageValues();
    window.addEventListener('beforeunload', this.setStateInSessionStorage)
  }

  componentWillUnmount(){
    this.setStateInSessionStorage();
    window.removeEventListener('beforeunload', this.setStateInSessionStorage)
  }

  setStateInSessionStorage(){
     sessionStorage.setItem('allBoards', JSON.stringify(this.state.allBoards))
  }

  initStateWithsessionStorageValues(){
    this.setState((prevState) =>{
      let holderState = {};
      holderState.user = sessionStorage.getItem('user') || '';
      holderState.isLoggedIn = (sessionStorage.getItem('isLoggedIn') === 'true') || false;

      let allBoards = sessionStorage.getItem('allBoards');
      holderState.allBoards = allBoards ? JSON.parse(allBoards) : {}
      return holderState;
    })
  }

  login(event){
    let name = event.target.value.trim();
    let key = event.key;

    if (event.key === 'Enter'){
      this.setState((prevState) =>{
        let oldState = { ...prevState }
        let holderState = {};
        holderState.user = name;
        holderState.isLoggedIn = true;
        holderState.allBoards = oldState.allBoards;
        if (!holderState.allBoards[name]) holderState.allBoards[name] = {};

        return holderState;
      })
      sessionStorage.setItem('isLoggedIn', true);
      sessionStorage.setItem('user', name);
    }
  }

  logout(){
    this.setState((prevState) =>{
        let holderState = {};
        holderState.user = '';
        holderState.isLoggedIn = false;

        return holderState; 
    })

    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.setItem('user', '');
    sessionStorage.setItem('allBoards', JSON.stringify(this.state.allBoards))

  }

  //////////////////////////// BOARD CRUD /////////////////////////

  addBoard(obj){
    let today = new Date().toString();
    let pathUtil = PathUtilities()
    let boardObj = {
      dateCreated: today,
      title: obj.title,
      url: pathUtil.urlPath(obj.title),
      tasklists: {}
    }
    this.setState((prevState) =>{
        let oldState = { ...prevState }
        let holderState = {};
        holderState.allBoards = oldState.allBoards;
        holderState.allBoards[this.state.user][boardObj.url] = boardObj
        return holderState;
    })
  }

  deleteBoard(title){
    this.setState((prevState) => {
      let oldState = { ...prevState }
      let holderState = {};
      holderState.allBoards = oldState.allBoards;
      delete holderState.allBoards[this.state.user][title];
    })
  }

  ////////////////////////// TASK LIST CRUD ///////////////////////

  addTaskList(obj, path){
    let today = new Date().toString()
    let pathUtil = PathUtilities()
    let tasklistObj = {
      dateCreated: today,
      title: obj.title,
      description: obj.description,
      url: pathUtil.urlPath(obj.title),
      tasks: []
    }
    this.setState((prevState) =>{
        let oldState = { ...prevState }
        let holderState = {};
        holderState.allBoards = oldState.allBoards;
        pathUtil.setPropertyByPath(holderState.allBoards[this.state.user],path, tasklistObj)
        console.log(holderState)
        return holderState;
    })
  }

  deleteTaskList(title, path){
    this.setState((prevState) => {
      let oldState = { ...prevState }
      let holderState = {};
      holderState.allBoards = oldState.allBoards;
      //integrate path into this
      // delete holderState.allBoards[this.state.user][title];
    })
  }


  //////////////////////////// TASK CRUD //////////////////////////

  addTask(obj, path){
    let today = new Date().toString()
    let pathUtil = PathUtilities()
    let taskObj = {
      title: obj.title,
      message: obj.message,
      isComplete: false,
      dateCompleted: null,
      dateCreated: today
    }

    this.setState((prevState) =>{
        let oldState = { ...prevState }
        let holderState = {};
        holderState.Boards = oldState.Boards;
        //integrate path into this
        //holderState.allTasks[this.state.user][taskObj.title] = taskObj
        return holderState;
    })
  }

  deleteTask(title, path){
    this.setState((prevState) => {
      let oldState = { ...prevState }
      let holderState = {};
      holderState.allBoards = oldState.allBoards;
      //integrate path into this
      // delete holderState.allBoards[this.state.user][title];
    })
  }

  toggleCompletion(path){
    this.setState((prevState) => {
      let oldState = { ...prevState }
      let holderState = {};
      holderState.allBoards = oldState.allBoards;
      //integrate path into this
      //pathVal = holderState.allBoards[this.state.user][title];
      //value = !pathVal
      //return holderState
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
            <Route path={"/" + pathVars.boardlist} render={() => (
              <Wrapper
               user={this.state.user}
               logout={this.logout}
               isLoggedIn={this.state.isLoggedIn}
               addBoard={this.addBoard}
               addTaskList={this.addTaskList}
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
