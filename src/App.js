import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks: [],//id :unique, name, status
            isDisplayForm:false,
            taskEditing: null
        };
    }
    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks =JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks 
            });
        }
    }
    randomId(){
        return Math.floor((Math.random() * 100) + 1).toString();
    }
    onToggleForm=()=>{
        this.setState({
            isDisplayForm : !this.state.isDisplayForm
        });
    }
    onCloseForm=()=>{
        this.setState({
            isDisplayForm : false
        });
    }
    onShowForm=()=>{
        this.setState({
            isDisplayForm : true
        });
    }
    onSubmit=(data)=>{
        var {tasks}=this.state;
        if(data.id ===''){
            data.id = this.randomId();
            tasks.push(data);
        }else{
            var index = this.findIndex(data.id);
            tasks[index]=data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        this.onCloseForm();
        localStorage.setItem('tasks', JSON.stringify(
            tasks));

    }
    onUpdateStatus=(id)=>{
        var {tasks}=this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks:tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    onUpdate=(id)=>{
        var {tasks}=this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        if(index !== -1){
            this.setState({
                taskEditing : taskEditing
            });
       this.onShowForm();
        // localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
     onDelete=(id)=>{
        var {tasks}=this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index, 1);
            this.setState({
                tasks:tasks
            });
            this.onCloseForm();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    findIndex=(id)=>{
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task, index)=> {
            if(task.id === id){
                result = index;
            }
        });
         return result;
    }
  render() {
    var {tasks, isDisplayForm, taskEditing} = this.state;
     var elmTaskForm =  isDisplayForm ? <TaskForm  tasks={tasks}  onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} onUpdate={this.onUpdate} taskEditing={taskEditing}/> : ''; 
    return (
    <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {elmTaskForm}
            </div>
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>&nbsp;
                    <Control />
                
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList  tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate={this.onUpdate}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
