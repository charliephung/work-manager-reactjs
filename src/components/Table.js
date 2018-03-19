import React, {Component} from 'react';
import Item from './Table_item';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterName: "",
            filterStatus: -1
        }
    }

    onChange = e => {
        let target = e.target,
            name = target.name,
            value = target.value;

        let filter = {
            name : name === "filterName" ? value : this.state.filterName,
            status: name === "filterStatus" ? value : this.state.filterStatus
        };
        this.setState({[name]: value});

        this.props.onFilterTable(filter);
    }

    render() {
        let {task , filter , sort} = this.props, {filterName, filterStatus} = this.state;
        if (sort.by === "name") { 
            if(sort.value === 1) {
                task.sort((a,b) => {
                    if (a.name.toUpperCase() === b.name.toUpperCase()) return 0;
                    else return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
                });
            }
            if(sort.value === -1) {
                task.sort((a,b) => {
                    if (a.name.toUpperCase() === b.name.toUpperCase()) return 0;
                    else return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
                });
            }
        }
        if (sort.by === "status") {
            if(sort.value === 1) {
                task.sort((a, b) => {
                    if (a.status === b.status) return 0;
                    else return a.status > b.status ? -1 : 1;
                });
            }
            if(sort.value === -1) {
                task.sort((a , b) => {
                    if (a.status === b.status) return 0;
                    else return a.status > b.status ? 1 : -1;
                });
            }
        }
        
        if(filter.name) {
            task = task.filter(task => {
                return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
            });
        }
        if(filter.status !== -1) {
            task = task.filter(task => {
                return task.status === (filter.status === 1 ? true : false);
            });
        }
        
        let taskElements = task.map((taskElement, index) => {
            return (<Item
                    key={taskElement.id}
                    task={taskElement}
                    index={index} />
                );
        });

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">Index</th>
                            <th className="col-xs-4 col-sm-4 col-md-4 col-lg-4">Name</th>
                            <th className="col-xs-3 col-sm-3 col-md-3 col-lg-3">Status</th>
                            <th className="col-xs-3 col-sm-3 col-md-3 col-lg-3">Edit</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="filterName"
                                    value={filterName}
                                    placeholder="Search"
                                    onChange={this.onChange}/>
                            </td>
                            <td>
                                <select
                                    name="filterStatus"
                                    className="form-control"
                                    value={filterStatus}
                                    onChange={this.onChange}>
                                    <option value={-1}>All</option>
                                    <option value={1}>Start</option>
                                    <option value={0}>Pending</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {taskElements}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (data) => {
    return {
        task: data.storeState,
        filter: data.filterTable,
        sort: data.sortTask
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTable(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
