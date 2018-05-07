import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            status:false,
            id : ''
        }
    }
    componentWillMount(){
        if(this.props.taskEditing){

            this.setState({
                id : this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
            console.log(this.state.id);
        }
    }
    onExit=()=>{
        this.props.onCloseForm();
    }
    onChange=(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        
        if(name === 'status'){
            value = target.value==="true" ? true : false;
        }
        this.setState({
            [name]:value
        });
    }
    onSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    }
    reset=()=>{
        this.setState({
            name : '',
            status : false
        });
    }
  render() {

    return (
     <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 className="panel-title">{this.state.id ==='' ? "Thêm Công Việc":"edit" }&emsp;<span className="fa fa-times-circle text-right"
                onClick={this.onExit}
            ></span></h3>

        </div>
        <div className="panel-body">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Tên :</label>
                    <input type="text" className="form-control" value={this.state.name} name="name" onChange={this.onChange}
                     />
                    
                </div>
                <label>Trạng Thái :</label>
                <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                    <option value={true} >important!</option>
                    <option value={false} >normal</option>
                </select>
                <br/>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning">{this.state.id ==='' ? "Thêm":"save"}</button>&nbsp;
                    <button type="reset" className="btn btn-danger" onClick={this.reset}>Hủy Bỏ</button>
                </div>
            </form>
        </div>
    </div>
    );
  }
}

export default TaskForm;
