import React, { Component } from 'react';
import Addbar from './Control_Addbar';
import Sort from './Control_Sort';


class Control extends Component {
    render() {
        return (
            <div>
                {/* Search bar */}
                <Addbar />
                {/* Sort */}
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <Sort />
                </div>
            </div>
        );
    }
}

export default Control;
