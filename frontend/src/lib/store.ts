import {createStore,combineReducers,applyMiddleware} from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import attendanceReducer from "./reducers/attendenceReducer";
import postReducer from "./reducers/postReducers";
import { courseAllocationReducer } from "./reducers/courseAllocationReducer";
import {courseReducer} from "./reducers/courseReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    attendance: attendanceReducer,
    post:postReducer,
    courseAllocation:courseAllocationReducer,
    courses:courseReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;