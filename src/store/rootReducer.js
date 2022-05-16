import { combineReducers } from "redux";
import taskListReducer from "./reducers/taskListReducer";

const rootReducer = combineReducers({
    taskList: taskListReducer
})

export default rootReducer;