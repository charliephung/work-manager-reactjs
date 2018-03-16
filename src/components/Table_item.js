import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            onUpdating : false,
            updateTask: {
                id: "",
                name: "",
                status: true
            }
        }
    }
    
    // Update updateTask when ever new updateTask is pass in
    componentWillReceiveProps(nextProps){
        if (nextProps.updateTask) {
            if (nextProps.task.id === nextProps.updateTask.id) {
                this.setState({
                    updateTask:{
                        id: nextProps.updateTask.id,
                        name: nextProps.updateTask.name,
                        status: nextProps.updateTask.status,
                    }
                });
            }
        } else {
            this.setState({ updateTask:{ id: "", name: "", status: true } });
        }
    }

    onToggleStatus = ()=> {
        this.props.onToggleStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
        this.setState({ updateTask:{ id: "", name: "", status: true } });
    }

    // Toggle to modify mode
    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }
    onUpdateContent = () => {
        this.props.onUpdateContent(this.state.updateTask);
    }
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.state.updateTask);
    }
    onEndUpdate = () => {
        this.props.onEndUpdate(this.state.updateTask);
    }

    // When evert value in input or status change update updateTask in App
    onChange = (e)=> {
        let target = e.target,
            value = target.value,
            { updateTask } = this.state;
        updateTask.name = value;
    
        if (target.name === "status") {
            updateTask.status = value
        }
        
        this.setState({
            updateTask
        });
        this.onUpdateContent();
    }

    render() {
        let { task, index, updateTask } = this.props;
        
        let td = (updateTask && updateTask.id === task.id) 
                ? 
                <td id="td-input" className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <input className="table-input" type="text"
                        name="name"
                        value={ this.state.updateTask.name }
                        onChange={ this.onChange } /> 
                </td>
                : <td className="col-xs-4 col-sm-4 col-md-4 col-lg-4"> { task.name }</td>
                
        let button = (updateTask && updateTask.id === task.id) 
                ? <button type="button" className="btn btn-xs btn-success" onClick={ this.onEndUpdate } > <i className="fa fa-check" /></button>
                : <button type="button" className="btn btn-xs btn-warning" onClick={ this.onUpdate } > <i className="fa fa-edit" /></button>
        
        let status = (updateTask && updateTask.id === task.id) 
                ? <span className={ updateTask.status === true ? "label label-success" : "label label-danger" } 
                        onClick={ this.onUpdateStatus } 
                        onChange={ this.onChange }>
                            { updateTask.status === true ? "start" : "pending" }
                </span> 
                : <span className={ task.status === true ? "label label-success" : "label label-danger" } 
                        onClick={ this.onToggleStatus }> 
                            { task.status === true ? "start" : "pending" } 
                </span> 
     

        return (
            <tr>
                <td className="col-xs-2 col-sm-2 col-md-2 col-lg-2"> { index} </td>
                    { td }
                <td className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="u-center">
                        { status }
                    </div>
                </td>
                <td className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="u-center">
                    { button }
                        &nbsp;
                    <button type="button" className="btn btn-xs btn-danger"
                            onClick={ this.onDelete }
                    >
                        <i className="fa fa-trash" /></button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default Item;
