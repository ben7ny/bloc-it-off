import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


class TaskList extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: [],
      NewTaskDescription: "",
      newTaskPriority: 1,
      sendAt: "",
      visibility: true,
      doneTasks: []
    };

    this.tasksRef = this.props.firebase.database().ref('tasks');
  }

  componentDidMount(){
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      const tasks = this.state.tasks.concat( task ).sort((a, b) => a.priority > b.priority)
      this.setState({ tasks: tasks })
      const doneTasks = this.state.doneTasks.concat( task ).sort((a, b) => a.priority > b.priority)
      this.setState({ doneTasks: doneTasks })
    });

    this.tasksRef.on('child_removed', snapshot => {
      const delttask = this.state.tasks.filter( (task, i) => task.key !== snapshot.key);
      this.setState({ tasks: delttask })
    });
  }



  createTask(e){
    e.preventDefault();
    const newTask = this.state.NewTaskDescription;
    const newTaskPriority = this.state.newTaskPriority;
    const taskVisibility = this.state.visibility;
    console.log(newTask);
    this.tasksRef.push({
      name: newTask,
      priority: newTaskPriority,
      sendAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      visibility: taskVisibility
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



  BoxChecked(index, task){
    // console.log(index);
    // console.log(task);

    // const pastTasks = this.state.pastTasks.concat( task )
    // this.setState({ pastTasks: pastTasks })



    const makedTask = task.visibility === false;
    const markedTasks = this.state.doneTasks;
    const taskHistory = markedTasks.concat(task);
    // this.setState({visibility: makedTask  })
    this.setState({ doneTasks: taskHistory });
    console.log(taskHistory);


  }


  // getVisibility(index, task){
  //   const oldTask = task.sendAt;
  //   const timenow = new Date();
  //   const toHour = timenow.getSeconds();
  //
  // }

  // oldTasks(index, task){
  //   const oldTask = task.sendAt;
  //   const timeFormat = new Date();
  //   const toSecond = timeFormat.getSeconds();
  //   console.log(toSecond);
  //   if (toSecond === 5){
  //     const makedTask = task.visibility === false;
  //     const taskHistory = this.state.doneTasks.concat(task);
  //     this.setState({visibility: makedTask  })
  //     // this.setState({ doneTasks: taskHistory });
  //   }
  //
  //
  //
  // }




render() {
    return(
     // const myTaskList = this.state.visibility == true ? 'shown' : 'hidden'
      <div> {this.state.tasks.map((task, index) =>
        <ul key={index}  className={this.state.visibility === true? 'shown' : 'hidden' }>
          <li>{task.name}</li>
          <li><input type="checkbox" onChange={ () => this.BoxChecked(index, task) }  /></li>
          <li><button onClick={(e)=>this.deleteTask(task)}>Remove Task</button></li>
          <li><Moment format='lll'>{this.state.sentAt}</Moment></li>
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
