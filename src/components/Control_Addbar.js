import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';



class Addbar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            status: false
        }
    }

    onChange = (e)=> {
        let target = e.target,
            name = target.name,
            value = target.value;

        this.setState({
            [name] : value
        });
    }   

    onToggleStatus = ()=> {
        this.setState({
            status: !this.state.status
        });
    } 

    onAddNewTodo = ()=> {
        this.props.onSaveTask(this.state);
        this.setState({
            name: "",
            status: false
        });
    }

    render() {
        let { name, status } = this.state;
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group"
                        onChange={ this.onChange } >
                        <input type="text" 
                                placeholder="Add new todo" 
                                className="form-control" 
                                aria-describedby="search-box"
                                value={ name }
                                name="name" />
                        <span className={ status === true ?  "input-group-addon addon-success" : "input-group-addon addon-danger" } 
                            onClick={ this.onToggleStatus } > 
                                <span className={ status === true ? "label label-success" : "label label-danger"}
                                    name="status" >
                                    { status === true ? "start" : "pending"}
                                </span>
                        </span>
                    </div>
                </div>
                {/* Add */}
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <button type="button" 
                            className="btn btn-block btn-success"
                            onClick={ this.onAddNewTodo } >
                            <i className="fa fa-pencil"/>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (data) => {
    return {

    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        onSaveTask : task => {
            dispatch(actions.saveTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addbar);
