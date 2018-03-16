import React, { Component } from 'react';
// import _ from 'lodash'; ////(optional)
import './App.css';
import Control from "./components/Control";
import Table from "./components/Table";

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            task: [], // id name status
            updateTask: null,
            filter: {
                name: "",
                status: -1
            },
            sort: {
                by: "none",
                value: 1
            }
        }
    }

    // Add data in localStorage to task
    componentWillMount() {
        if (localStorage && localStorage.getItem("task")) {
            let task = JSON.parse(localStorage.getItem("task"));
            this.setState({ task });
        }
    }

    // Generate defaul value (Optional)
    // onGenerate = () => {
    //     let task = [
    //         {
    //             id: this.generateId(),
    //             name: "Study React",
    //             status: true
    //         },
    //         {
    //             id: this.generateId(),
    //             name: "LoL",
    //             status: false
    //         },
    //         {
    //             id: this.generateId(),
    //             name: "Sleeping",
    //             status: true
    //         },
    //     ]
    //     this.setState({
    //         task: task
    //     });

    //     localStorage.setItem("task", JSON.stringify(task));
    // }

    // Random Id Generate
    seedId() {
        return Math.floor((Math.random()) * 0x1000000).toString(16);
    }
    generateId() {
        return this.seedId() + "-" + this.seedId() + "-" +this.seedId() + "-" +this.seedId() + "-" +this.seedId() + "-" +this.seedId();
    }

    // Open add
    onAddNewTodo = (name, status) => {
        let { task } = this.state;
        task.unshift({id: this.generateId() ,name, status});
        this.setState({ task });
        localStorage.setItem("task", JSON.stringify(task));
    }

    // Handle Update status
    onToggleStatus = (taskId) => {
        let { task } = this.state,
            index = this.findIndexByValue(task, taskId);
            // Reverse current status
            task[index].status = !task[index].status;

            this.setState({ task });
            localStorage.setItem("task", JSON.stringify(task));
    }


    // Update content
    onUpdate = (taskId) => {
        let { task } = this.state,
            index = this.findIndexByValue(task, taskId);
        
        this.setState({ updateTask: task[index] });
    }
    onUpdateContent = (updateTask) => {
        let { task } = this.state,
            index = this.findIndexByValue(task, updateTask.id);
        
            task[index].name = updateTask.name
        
        this.setState({ updateTask: task[index] });
        
    }
    onUpdateStatus = (updateTask) => {
        let { task } = this.state,
            index = this.findIndexByValue(task, updateTask.id);
        task[index].status = !updateTask.status;
        
        this.setState({ updateTask: task[index] });
    }
    // OnCheck
    onEndUpdate = (updateTask) => {
        let { task } = this.state,
            index = this.findIndexByValue(task, updateTask.id);
        
        task[index] = updateTask;
        this.setState({ task, updateTask: null });
        localStorage.setItem("task", JSON.stringify(task));
    }


    // Handle Delete button
    onDelete = (taskId) => {
         let { task } = this.state,
            index = this.findIndexByValue(task, taskId);
        // Remove the index'th of task
        task.splice(index, 1);
        // Update new task
        this.setState({ task, updateTask: null });
        // Store in localStorage
        localStorage.setItem("task", JSON.stringify(task));

    }

    // Handle filter
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName,
                status: filterStatus
            }
        });
    }

    // Onosort {
    onSort = (by, value) => {
        // console.log(sortBy, sortValue);
        this.setState({
            sort: { by, value }
        });
    }

    findIndexByValue = (arrObj, val) => {
        var i = null;
        arrObj.forEach((obj, index) => {
            if (Object.values(obj).find(foundId => obj.id === val)) { 
                i = index; 
            } 
        });
        return i;
    }

    render() {
        // let task = this.state.task
        let { task, filter, sort } = this.state;
        if (filter){
            if (filter.name) {
                task = task.filter(ele => {
                    // parse ele.name to lowerCase then 
                    // indexOf(filter.name) will return -1 if filter.name is not a substring in element.name
                    // console.log(ele.name.toLowerCase().indexOf(filter.name));

                    // So we return the value that is !== -1
                    return ele.name.toLowerCase().indexOf(filter.name.toLocaleLowerCase()) !== -1;
                });
            }

            task = task.filter(ele => {
                // Display all
                if (filter.status === -1) {
                    return task;
                } else {
                    // return ele that the status in filter bar match its status
                    return filter.status === (ele.status === true ? 1 : 0); 
                }
                
            });
        }

        if(sort.by === "name") {
            task.sort((a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
                else if(a.name.toLowerCase() < b.name.toLowerCase()) return -sort.value;
                else return 0;
            });
        }
        if (sort.by === "status") {
            task.sort((a,b) => {
                if(a.status > b.status) return -sort.value;
                else if(a.status < b.status) return sort.value;
                else return 0;
            });
        }
        

        return (
            <div>
                 <div id="main" className="container">
                    <div className="panel">
                        <div className="panel-heading">
                                <h2 id="heading">Work manager</h2>
                        </div>
                        <div className="panel-body">
                            
                                {/* Searchbar Add Sort */}
                                <div className="row">
                                    <Control onAddNewTodo={ this.onAddNewTodo }
                                            onSort={ this.onSort }
                                            sort={ sort }
                                    />
                                </div>
                                <hr/>
                                <div className="row">
                                {/* Table */}
                                    {/* Toggle status on click when not in modify mode */}
                                    {/* Delete button */}
                                    {/* Filter */}
                                    {/* Pass current update Task to table item */}
                                    {/* Handle event when in modify mode */}
                                    <Table task = { task }  
                                            onToggleStatus={ this.onToggleStatus } 

                                            onDelete={ this.onDelete } 

                                            onFilter={ this.onFilter }

                                            updateTask={ this.state.updateTask }

                                            onUpdate={ this.onUpdate } 
                                            onUpdateContent={ this.onUpdateContent }
                                            onUpdateStatus={ this.onUpdateStatus }
                                            onEndUpdate={ this.onEndUpdate }
                                            
                                    />
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
