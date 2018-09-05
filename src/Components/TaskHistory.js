import React, { Component } from 'react';
import Moment from 'react-moment';

class TaskHistory extends Component {
  render() {
    return(
      <div>
         {this.props.tasks.map((task, index) =>
            <ul key={index}  className={!task.expired && task.visibility ? 'hidden' : 'shown' }>
              <li>{task.name}</li>
              <li className={task.expired ? 'hidden' : 'shown' }><input type="checkbox" checked={task.visibility} onChange={ () => this.props.boxChecked(index, task, true) }  /></li>
              <li><button onClick={(e)=>this.deleteTask(task)}>Remove Task</button></li>
              <li><Moment format='lll'>{task.sendAt}</Moment></li>
            </ul>
          )}
      </div>
    );
  }
}


export default TaskHistory;
