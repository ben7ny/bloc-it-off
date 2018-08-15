import React, { Component } from 'react';

class TaskList extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: []
    };

    this.tasksRef = this.props.firebase.database().ref('tasks');
  }

  componentDidMount(){
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      this.setState({ tasks: this.state.tasks.concat( task ) })
    });


  }







  render() {
    return(
      <div className="myTaskList"> {this.state.tasks.map((task, index) =>
        <ul key={index}>
          <li>{task.name}</li>
        </ul>
      )}
      </div>
    );
  }
}



export default TaskList;
