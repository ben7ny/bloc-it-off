import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import TaskList from './Components/TaskList';
import TaskHistory from './Components/TaskHistory';


import './App.css';


var config = {
    apiKey: "AIzaSyAQ_QNLUlTV8XU0Of-lZl5nFgbA6p9YheA",
    authDomain: "bloc-it-off-92a47.firebaseapp.com",
    databaseURL: "https://bloc-it-off-92a47.firebaseio.com",
    projectId: "bloc-it-off-92a47",
    storageBucket: "bloc-it-off-92a47.appspot.com",
    messagingSenderId: "81398523140"
  };

  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
          <nav>
            <h1>Bloc-it-off</h1>
            <Link to='/'>Active Tasks</Link>
            <Link to='/TaskHistory'>Task History</Link>
          </nav>
          <main>
             <Route exact path="/"  render={()=><TaskList firebase={firebase} />} />
            <Route path="/TaskHistory" component={TaskHistory} />
          </main>
      </div>
    );
  }
}

export default App;
