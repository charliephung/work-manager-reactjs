import React, { Component } from 'react';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: true
        }
    }
    
    // Get current EditingTask when popup is call
    componentWillMount() {
        if (this.props.editingTask) {
            let state = {
                id: this.props.editingTask.id,
                name: this.props.editingTask.name,
                status: this.props.editingTask.status
            }
            this.setState(state);
        }
    }

    componentWillReceiveProps(nextProps) {
        // When switch from adding to modify
        if(nextProps.editingTask && nextProps.editingTask.id) {
            this.setState({
                id: nextProps.editingTask.id,
                name: nextProps.editingTask.name,
                status: nextProps.editingTask.status,
            });
        // When switch from modify to adding
        } else {
                this.setState({
                id: "",
                name: "",
                status: true
            });
        }
    }

    onChange = (e)=> {
        // Update input value when type
        let target = e.target,
            name = target.name,
            value = target.value;

        if (name === "status") {
            value = target.value === "false" ? false : true;
        }
        this.setState({
            [name] : value
        });
    }


    onSubmit = (e)=> {
        // Stop browser refresh
        e.preventDefault();
        // Pass to parent current state
        this.props.onSubmit(this.state);

        this.onClear();
    }

    onClear = ()=> {
        this.setState({
            name: "",
            status: true
        });
    }

    render() {
        let { id } = this.state;
        return (
               <div className="popup__content">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <span>{ id !=="" ? "Update todo" : "Add new todo" }</span>
                            <button type="button" 
                                    className="close" 
                                    data-dismiss="alert" 
                                    aria-label="Close"
                                    onClick= { this.props.onHidePopup }
                            >
                                    <i className="fa fa-times"/>
                            </button>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={ this.onSubmit } > 
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" 
                                            className="form-control"
                                            name="name"
                                            onChange={ this.onChange }
                                            value={ this.state.name }
                                            required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select className="form-control" 
                                            name="status"
                                            onChange={ this.onChange }
                                            value={ this.state.status }
                                    >
                                        <option value={ true }>Start</option>
                                        <option value={ false }>Pending</option>
                                    </select>
                                </div>
                                <button type="submit" 
                                        className="btn btn-warning"
                                >
                                        <i className="fa fa-plus"/>
                                        &nbsp;Save
                                </button>
                                        &nbsp;
                                <button type="button" 
                                        className="btn btn-danger"
                                        onClick={ this.onClear }
                                >
                                        <i className="fa fa-times"/>
                                        &nbsp;Reset
                                </button>
                            </form>
                        </div>
                    </div>
               </div>
        );
    }
}

export default Popup;
