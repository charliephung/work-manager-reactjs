import {combineReducers} from 'redux';
import task from './task';
import modifyTask from './modifyTask';
import filterTable from './filterTable';
import sortTask from './sortTask';

const myReducer = combineReducers(
    {
        storeState: task,
        modifyTask,
        sortTask,
        filterTable
    },
);

export default myReducer;