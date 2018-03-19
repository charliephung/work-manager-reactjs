import * as types from '../constants/ActionTypes';
import { findIndexByValue, generateId } from '../functions/index';


let localStorageData = JSON.parse(localStorage.getItem("task"));

let initialState = localStorageData ? localStorageData : [];

let myReducer = (state = initialState, action) => {
    let index = "";
    
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        // Save task to store
        case types.SAVE_TASK:
            if (action.task.id) {
                index = findIndexByValue(state, action.task.id);
                state[index] = { ...state[index], name: action.task.name, status: action.task.status };
                localStorage.setItem("task", JSON.stringify(state));
                return [...state];   
            } else {
                let newTask = { id: generateId(), name: action.task.name, status: action.task.status };
                localStorage.setItem("task", JSON.stringify([newTask,...state]));    
                return [newTask,...state];
            }    
        // Delete selected task
        case types.DELETE_TASK:
            index = findIndexByValue(state, action.id);
            state.splice(index, 1);
            localStorage.setItem("task", JSON.stringify(state)); 
            return [...state];
        // Toggle status when click
        case types.TOGGLE_STATUS:
            index = findIndexByValue(state, action.id);
            state[index] = { ...state[index], status: !state[index].status };
            localStorage.setItem("task", JSON.stringify(state)); 
            return [...state];
        default:
            return [...JSON.parse(localStorage.getItem("task"))];
    }
}


export default myReducer;