import React, { Component } from 'react';
import Addbar from './Control_Addbar';
import Sort from './Control_Sort';


class Control extends Component {
    render() {
        return (
            <div>
                
                {/* Search bar */}
                   <Addbar onAddNewTodo={ this.props.onAddNewTodo }/>
                {/* Sort */}
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <Sort onSort={ this.props.onSort }
                            sort={ this.props.sort }
                    />
                </div>
            </div>
        );
    }
}

export default Control;
