import React, { Component } from 'react';
import * as firebase from 'firebase';
import TaskList from './Components/TaskList';
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
          <h1>Bloc-it-off</h1>
          <h2>Active Tasks</h2>
          <TaskList firebase={firebase} />
      </div>
    );
  }
}

export default App;
