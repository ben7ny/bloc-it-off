import React, { Component } from "react";
import Moment from "react-moment";
import "./TaskHistory.css";
class TaskHistory extends Component {
  render() {
    return (
      <div className="histoyPage">
        {this.props.tasks.map((task, index) => (
          <ul
            key={index}
            className={!task.expired && task.visibility ? "hidden" : "shown"}
          >
            {" "}
            <div className="taskHistoryTimeNboxes">
              <div className="taskHistoryBoxes">
                <li>
                  <Moment format="lll">{task.sendAt}</Moment>
                </li>
                <li className={task.expired ? "hidden" : "shown"}>
                  <input
                    type="radio"
                    checked={task.visibility}
                    onChange={() => this.props.boxChecked(index, task, true)}
                  />
                  <span>Send Back to Active Tasks</span>
                </li>
              </div>
              <li>{task.name}</li>
            </div>
          </ul>
        ))}
      </div>
    );
  }
}

export default TaskHistory;
