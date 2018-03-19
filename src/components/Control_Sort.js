import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class Sort extends Component {
    onClick(sortBy, sortValue) {
        let sort = {
            by: sortBy,
            value: sortValue
        }

        this.props.onSortTask(sort);
    }
    render() {
        var { sort } = this.props;
        return (
            <div className="dropdown">
                <button type="button"
                    className="btn btn-block btn-primary dropdown-toggle"
                    id="dropdowmMenu1"
                    data-toggle="dropdown" >
                    <i className="fa fa-sort" />
                </button>
                <ul className="dropdown-menu .u-center-text">
                    <li onClick={() => this.onClick("none", 1)}>
                        <a role="button"
                            className={(sort.by === "none") ? "sort_selected" : ""}>
                            Default
                        </a>
                    </li>
                    <li onClick={() => this.onClick("name", 1)}>
                        <a role="button"
                            className={(sort.by === "name" && sort.value === 1) ? "sort_selected" : ""}>
                            A -> Z
                        </a>
                    </li>
                    <li onClick={() => this.onClick("name", -1)}>
                        <a role="button"
                            className={(sort.by === "name" && sort.value === -1) ? "sort_selected" : ""}>
                            Z -> A
                        </a>
                    </li>
                    <li onClick={() => this.onClick("status", 1)}>
                        <a role="button"
                            className={(sort.by === "status" && sort.value === 1) ? "sort_selected" : ""}>
                            Start
                        </a>
                    </li>
                    <li onClick={() => this.onClick("status", -1)}>
                        <a role="button"
                            className={(sort.by === "status" && sort.value === -1) ? "sort_selected" : ""}>
                            Pending
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (data) => {
    return {
        sort: data.sortTask
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSortTask: (sort) => {
            dispatch(actions.sortTask(sort));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
