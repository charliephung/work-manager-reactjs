import React, { Component } from 'react';


class Sort extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            sort : {
                by: "none",
                value: 1
            }
        }
    }
    
    

    onClick(sortBy, sortValue) {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        });
        this.props.onSort(sortBy, sortValue);
    }

    render() {
        var { sort } = this.state;

        return (
            <div className="dropdown">
                <button type="button" 
                        className="btn btn-block btn-primary dropdown-toggle"
                        id="dropdowmMenu1"
                        data-toggle="dropdown"
                >
                    <i className="fa fa-sort"/>
                </button>
                <ul className="dropdown-menu .u-center-text">
                    <li onClick={ ()=> this.onClick("none", 1) }>
                        <a role="button"  
                            className={ (sort.by === "none" && sort.value === 1) ? "sort_selected" : "" }
                        >
                            Default
                        </a>
                    </li>
                    <li onClick={ ()=> this.onClick("name", 1) }>
                        <a role="button"  
                            className={ (sort.by === "name" && sort.value === 1) ? "sort_selected" : "" }
                        >
                            A -> Z
                        </a>
                    </li>
                    <li onClick={ ()=> this.onClick("name", -1) }>
                        <a role="button" 
                            className={ (sort.by === "name" && sort.value === -1) ? "sort_selected" : "" }
                        >
                            Z -> A
                        </a>
                    </li>
                    <li onClick={ ()=> this.onClick("status", 1) }>
                        <a role="button" 
                            className={ (sort.by === "status" && sort.value === 1) ? "sort_selected" : "" }
                        >
                            Start
                        </a>
                    </li>
                    <li onClick={ ()=> this.onClick("status", -1) }>
                        <a role="button" 
                            className={ (sort.by === "status" && sort.value === -1) ? "sort_selected" : "" }
                        >
                            Pending
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sort;
