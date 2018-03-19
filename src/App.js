import React, { Component } from 'react';
import './App.css';
import Control from "./components/Control";
import Table from "./components/Table";

class App extends Component {
    render() {
        return (
            <div>
                <div id="main" className="container">
                    <div className="panel">
                        <div className="panel-heading">
                            <h2 id="heading">Work manager</h2>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <Control />
                            </div>
                            <hr />
                            <div className="row">
                                <Table />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
