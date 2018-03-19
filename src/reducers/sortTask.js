import * as types from '../constants/ActionTypes';

let initialState = {
    by: "none",
    value: 0
}

let myReducer = (state = initialState, action) => {    
    switch (action.type) {
        case types.SORT_TASK:
            let newState = {by : action.sort.by, value: action.sort.value};
            return {...newState};
        default:
            return state;
    }
}

export default myReducer;