import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import FullLogo from "./images/TaskDevil-FullLogo.svg";
import SmallLogo from "./images/TaskDevil-SmallLogo.svg";
import BergerMenu from "./images/BergerMenu.svg";
import * as firebase from "firebase";
import TaskList from "./Components/TaskList";
import TaskHistory from "./Components/TaskHistory";
import moment from "moment";

import "./App.css";

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
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      doneTasks: [],
      NewTaskDescription: ""
    };

    this.tasksRef = firebase.database().ref("tasks");
  }

  componentDidMount() {
    this.tasksRef.on("child_added", snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      let expired = moment().diff(task.sendAt, "days") > 1;
      console.log("expired", expired);
      task.expired = expired;
      console.log("test", task);
      const tasks = this.state.tasks
        .concat(task)
        .sort((a, b) => a.priority > b.priority);
      this.setState({ tasks: tasks });
      //const doneTasks = this.state.doneTasks.concat( task ).sort((a, b) => a.priority > b.priority)
      //this.setState({ doneTasks: doneTasks })
    });

    this.tasksRef.on("child_removed", snapshot => {
      const delttask = this.state.tasks.filter(
        (task, i) => task.key !== snapshot.key
      );
      this.setState({ tasks: delttask });
    });
  }

  componentWillUnmount() {
    this.tasksRef.off("child_added");
  }

  deleteTask(task) {
    this.tasksRef.child(task.key).remove();
  }

  boxChecked(index, task, viz) {
    const doneTasks = this.state.doneTasks.push(task);
    this.setState({ NewTaskDescription: doneTasks });
    task.visibility = viz;

    console.log(index, task);

    this.tasksRef.child(task.key).update(task);

    const currentTime = new Date().getTime();
    const one_week_in_miliseconds = 3 * 1000; /* ms */
    const blocitoffTime = task.sendAt;

    console.log("bloc off", blocitoffTime);
    console.log("time now", currentTime);
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-md">
          <div className="navbar-brand">
            <img
              className="img d-none d-md-block"
              alt="logo"
              src={FullLogo}
              width="160"
            />{" "}
            <img
              className="img d-md-none"
              alt="logo"
              src={SmallLogo}
              width="40"
            />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <img alt="logo" src={BergerMenu} width="35" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {/* <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a> */}
                <Link className="nav-link" to="/">
                  Active Tasks
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">
                  Pricing
                </a> */}
                <Link className="nav-link" to="/TaskHistory">
                  Tasks History
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* <nav>
          <h1 className="text-danger">Task Devil</h1>
          <Link to="/">Active Tasks</Link>
          <Link to="/TaskHistory">Task History</Link>
        </nav> */}
        <main>
          <Route
            exact
            path="/"
            render={() => (
              <TaskList
                firebase={firebase}
                tasksRef={this.tasksRef}
                tasks={this.state.tasks}
                deleteTask={this.deleteTask}
                boxChecked={this.boxChecked.bind(this)}
              />
            )}
          />
          <Route
            path="/TaskHistory"
            render={() => (
              <TaskHistory
                tasks={this.state.tasks}
                deleteTask={this.deleteTask}
                boxChecked={this.boxChecked.bind(this)}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
