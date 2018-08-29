import React, { Component } from 'react';


class TaskList extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: [],
      NewTaskDescription: "",
      newTaskPriority: 1,
      sendAt: ""
    };

    this.tasksRef = this.props.firebase.database().ref('tasks');
  }

  componentDidMount(){
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      const tasks = this.state.tasks.concat( task ).sort((a, b) => a.priority > b.priority)
      this.setState({ tasks: tasks })
    });

    this.tasksRef.on('child_removed', snapshot => {
      const delttask = this.state.tasks.filter( (task, i) => task.key !== snapshot.key);
      this.setState({ tasks: delttask })
    });
  }


  componentWillUnmount() {
    this.tasksRef.off('child_added');
  }


  createTask(e){
    e.preventDefault();
    const newTask = this.state.NewTaskDescription;
    const newTaskPriority = this.state.newTaskPriority;
    console.log(newTask);
    this.tasksRef.push({
      name: newTask,
      priority: newTaskPriority,
      sendAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });

  }

  deleteTask(task){
  this.tasksRef.child(task.key).remove();
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
      <div className="myTaskList"> {this.state.tasks.map((task, index) =>
        <ul key={index}>
          <li>{task.name}</li>
          <li><input type="checkbox"  /></li>
          <li><button onClick={(e)=>this.deleteTask(task)}>Remove Task</button></li>
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
    );
  }
}



export default TaskList;
