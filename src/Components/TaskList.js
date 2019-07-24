import React, { Component } from "react";
import Moment from "react-moment";
import "./TaskList.css";
class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NewTaskDescription: "",
      newTaskPriority: 1,
      sendAt: "",
      visibility: true,
      doneTasks: []
    };
  }

  createTask(e) {
    e.preventDefault();
    const newTask = this.state.NewTaskDescription;
    const newTaskPriority = this.state.newTaskPriority;
    if (newTask === "") {
      return;
    } else {
      console.log(newTask);
      this.props.tasksRef.push({
        name: newTask,
        priority: newTaskPriority,
        sendAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        visibility: true
      });
      this.setState({ NewTaskDescription: "" });
    }
  }

  getNewTaskUpdate(e) {
    this.setState({
      NewTaskDescription: e.target.value
    });
  }

  getNewTaskPriorityUpdate(e) {
    console.log("e", e);
    this.setState({ newTaskPriority: parseInt(e.target.value) });
  }

  render() {
    return (
      <div>
        <form className="NewTaskCreated" onSubmit={e => this.createTask(e)}>
          <div className="addTaskboxNtitle">
            <p>Add New Task</p>
            <label className="addNewTaskBox">
              <input
                type="text"
                placeholder="Type Your Task"
                value={this.state.NewTaskDescription}
                onChange={e => this.getNewTaskUpdate(e)}
              />
            </label>
          </div>
          <div className="addPriorityboxNtitle">
            <p>Priority</p>
            <label>
              <select
                onChange={e => this.getNewTaskPriorityUpdate(e)}
                className="priorityOptions"
              >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </label>
          </div>

          <div className="addButton">
            <input type="submit" value="Add Task" />{" "}
          </div>
        </form>

        <div className="TaskParts">
          {" "}
          {this.props.tasks.map((task, index) => (
            <ul
              key={index}
              className={!task.expired && task.visibility ? "shown" : "hidden"}
            >
              {" "}
              <div className="timeNtaskboxes">
                <div className="taskNboxes">
                  <li>
                    <Moment format="lll" style={{ fontWeight: "600" }}>
                      {task.sendAt}
                    </Moment>
                  </li>
                  <li>
                    <span>Check</span>
                    <input
                      type="radio"
                      onChange={() => this.props.boxChecked(index, task, false)}
                    />
                  </li>

                  <li>
                    <button
                      className="img d-none d-md-block"
                      onClick={e => this.props.deleteTask(task)}
                    >
                      Remove
                    </button>
                    <button
                      className="img d-md-none"
                      onClick={e => this.props.deleteTask(task)}
                      style={{ width: "40px" }}
                    >
                      x
                    </button>
                  </li>
                </div>
                <li>{task.name}</li>
              </div>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

export default TaskList;
