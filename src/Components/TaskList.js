import React, { Component } from 'react';

class TaskList extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: [],
      NewTaskDescription: ""
    };

    this.tasksRef = this.props.firebase.database().ref('tasks');
  }

  componentDidMount(){
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      this.setState({ tasks: this.state.tasks.concat( task ) })
    });

    this.tasksRef.on('child_removed', snapshot => {
      const delttask = this.state.tasks.filter( (task, i) => task.key !== snapshot.key);
      this.setState({ tasks: delttask })
    });
  }



  createTask(e){
    e.preventDefault();
    const newTask = this.state.NewTaskDescription;
    console.log(newTask);
    this.tasksRef.push({
      name: newTask
    });

  }

  deleteTask(task){
  this.tasksRef.child(task.key).remove();
 }


 getNewTaskUpdate(e) {
  this.setState({ NewTaskDescription: e.target.value });
 }



  render() {
    return(
      <div className="myTaskList"> {this.state.tasks.map((task, index) =>
        <ul key={index}>
          <li>{task.name}</li>
          <li><button onClick={(e)=>this.deleteTask(task)}>Remove Task</button></li>
        </ul>
      )}

      <div>
        <form className="NewTaskCreated" onSubmit={ (e) =>this.createTask(e)}>
          <label> Enter New Task:
          <input type="text" placeholder="Type Your Task" value={this.state.NewTaskDescription} onChange={ (e) => this.getNewTaskUpdate(e) }/>
          </label>

          <input type="submit" value="Create Task" />

        </form>
       </div>
      </div>
    );
  }
}



export default TaskList;
