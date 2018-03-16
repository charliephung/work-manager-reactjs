import React, { Component } from 'react';
import Item from './Table_item';

class Table extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filterName : "",
            filterStatus: -1
        }
    }
    
    onChange = e => {
        let target = e.target,
            name = target.name,
            value = target.value;
        
        this.props.onFilter(
            name === "filterName" ? value : this.state.filterName,
            name === "filterStatus" ? value : this.state.filterStatus
        )

        this.setState({
            [name] : value
        });
    }


    render() {
        let { task } = this.props,
            { filterName, filterStatus } = this.state;
        let taskElements = task.map((taskElement, index) => {
            return(
                <Item key={ taskElement.id } 
                        task={ taskElement }
                        index={ index }

                        onToggleStatus={ this.props.onToggleStatus }
                        
                        onDelete={ this.props.onDelete }
                        
                        updateTask={ this.props.updateTask }
                        
                        onUpdate={ this.props.onUpdate }
                        onUpdateContent={ this.props.onUpdateContent }
                        onUpdateStatus={ this.props.onUpdateStatus }
                        onEndUpdate={ this.props.onEndUpdate }
                />
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
                                <input type="text"
                                        className="form-control"
                                        name="filterName"
                                        value={ filterName }
                                        placeholder="Search"
                                        onChange={ this.onChange }
                                />
                            </td>
                            <td>
                                <select name="filterStatus"
                                        className="form-control"
                                         value={ filterStatus }
                                        onChange={ this.onChange }
                                >
                                    <option value={-1}>All</option>
                                    <option value={1}>Start</option>
                                    <option value={0}>Pending</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                    { taskElements }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
