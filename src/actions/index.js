import * as types from '../constants/ActionTypes';

export const listAll = () => {
    return {type: types.LIST_ALL}
}
export const saveTask = (task) => {
    return { type: types.SAVE_TASK, task };
}
export const toggleStatus = (id) => {
    return { type: types.TOGGLE_STATUS, id };
}
export const deleteTask = (id) => { 
    return { type: types.DELETE_TASK, id };
}
export const modifyTask = (id) => {
    return { type: types.MODIFY_TASK, id };
}
export const modifyStatus = (status) => {
    return { type: types.MODIFY_STATUS, status };
}
export const clearModifyTask = (task) => {
    return { type: types.CLEAR_MODIFY_TASK, task };
}
export const filterTable = (filter) => {
    return { type: types.FILTER_TABLE , filter };
}
export const sortTask = (sort) => {
    return { type: types.SORT_TASK , sort };
}