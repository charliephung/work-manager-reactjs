import * as types from '../constants/ActionTypes';
import { findIndexByValue } from '../functions/index';


// let modifytask = JSON.parse(localStorage.getItem("modifytask"));
let modifytask = {
    id: "",
    name: "",
    status: false
}

let myReducer = (state = modifytask, action) => {    
    let index = "";
    switch (action.type) {
        case types.MODIFY_TASK:
            // Get lastest data
            let localStorageData = JSON.parse(localStorage.getItem("task"));
            // Find task index
            index = findIndexByValue(localStorageData, action.id)
            state = {...localStorageData[index]};
            // Return modifytask
            return {...state};
        case types.MODIFY_STATUS:
            state = {
                ...state,
                status: !state.status
            } 
            return {...state};

        case types.CLEAR_MODIFY_TASK:
            // Clear current modify task
            return {};

        default:
            return state;
    }
}


export default myReducer;