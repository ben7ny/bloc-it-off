import React, { Component } from 'react';
import Moment from 'react-moment';


class TaskList extends Component {
  constructor(props){
    super(props);

    this.state = {
      NewTaskDescription: "",
      newTaskPriority: 1,
      sendAt: "",
      visibility: true      ,
      doneTasks: []
    };

  }



  createTask(e){
    e.preventDefault();
    const newTask = this.state.NewTaskDescription;
    const newTaskPriority = this.state.newTaskPriority;
    console.log(newTask);
    this.props.tasksRef.push({
      name: newTask,
      priority: newTaskPriority,
      sendAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      visibility: true
    });

  }




  getNewTaskUpdate(e) {
    this.setState({ NewTaskDescription: e.target.value });
  }

  getNewTaskPriorityUpdate(e) {
    console.log('e', e)
    this.setState({ newTaskPriority: parseInt(e.target.value) })
  }





render() {
    return(
      <div>
         <div> {this.props.tasks.map((task, index) =>
            <ul key={index}  className={!task.expired && task.visibility ? 'shown' : 'hidden' }>
              <li>{task.name}</li>
              <li><input type="checkbox" onChange={ () => this.props.boxChecked(index, task, false) }  /></li>
              <li><button onClick={(e)=>this.props.deleteTask(task)}>Remove Task</button></li>
              <li><Moment format='lll'>{task.sendAt}</Moment></li>
            </ul>
          )}

          <div>
            <form className="NewTaskCreated" onSubmit={ (e) =>this.createTask(e)}>
              <label> Enter New Task:
              <input type="text" placeholder="Type Your Task" value={this.state.NewTaskDescription} onChange={ (e) => this.getNewTaskUpdate(e) }/>
              </label>

              <label>Priority
                <select onChange={ (e) => this.getNewTaskPriorityUpdate(e) }>
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </select>
              </label>
              <input type="submit" value="Create Task" />

            </form>
           </div>
          </div>

      </div>
    );
  }
}



export default TaskList;
