import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onUpdating: false,
            updateTask: {
                id: "",
                name: "",
                status: true
            }
        }
    }
    // Update updateTask when ever new updateTask is pass in
    componentWillReceiveProps(nextProps) {
        if (nextProps.modifyTask) {
            this.setState({
                onUpdating: true,
                updateTask: nextProps.modifyTask
            });
        }
    }

    // Redux
    onToggleStatus = () => {
        this.props.onToggleStatus(this.props.task.id);
    }
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onClearModifyTask();
        this.setState({ updateTask: { id: "", name: "", status: true } });
    }
    onModifyTask = () => {
        this.props.onModifyTask(this.props.task.id);
    }
    onModifyStatus = () => {
        this.props.onModifyStatus(this.state.updateTask.status);
    }
    onSave = () => {
        this.props.onSaveTask(this.state.updateTask);
        this.props.onClearModifyTask();
        this.setState({ onUpdating: false, updateTask: { id: "", name: "", status: true } });
    }

    // When evert value in input or status change update updateTask in App
    onChange = (e) => {
        let target = e.target,
            value = target.value,
            { updateTask } = this.state;
        updateTask.name = value;
        this.setState({ updateTask });
    }

    render() {
        let { task, index } = this.props;
        let { updateTask } = this.state;

        let td = (updateTask && updateTask.id === task.id)
            ? <td id="td-input" className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <input className="table-input" type="text"
                    name="name"
                    value={updateTask.name}
                    onChange={this.onChange} />
            </td>
            : <td className="col-xs-4 col-sm-4 col-md-4 col-lg-4"> {task.name}</td>

        let button = (updateTask && updateTask.id === task.id)
            ? <button type="button" className="btn btn-xs btn-success" onClick={this.onSave} > <i className="fa fa-check" /></button>
            : <button type="button" className="btn btn-xs btn-warning" onClick={this.onModifyTask} > <i className="fa fa-edit" /></button>

        let status = (updateTask && updateTask.id === task.id)
            ? <span className={updateTask.status === true ? "label label-success" : "label label-danger"}
                onClick={this.onModifyStatus}>
                {updateTask.status === true ? "start" : "pending"}
            </span>
            : <span className={task.status === true ? "label label-success" : "label label-danger"}
                onClick={this.onToggleStatus}>
                {task.status === true ? "start" : "pending"}
            </span>


        return (
            <tr>
                <td className="col-xs-2 col-sm-2 col-md-2 col-lg-2"> {index} </td>
                {td}
                <td className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="u-center">
                        {status}
                    </div>
                </td>
                <td className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="u-center">
                        {button}
                        &nbsp;
                    <button type="button" className="btn btn-xs btn-danger"
                            onClick={this.onDeleteTask}
                        >
                            <i className="fa fa-trash" /></button>
                    </div>
                </td>
            </tr>
        );
    }
}


const mapStateToProps = data => {
    return {
        modifyTask: data.modifyTask
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleStatus: (id) => {
            dispatch(actions.toggleStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onModifyTask: (id) => {
            dispatch(actions.modifyTask(id));
        },
        onModifyStatus: (status) => {
            dispatch(actions.modifyStatus(status));
        },
        onClearModifyTask: (task) => {
            dispatch(actions.clearModifyTask());
        },
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Item);
