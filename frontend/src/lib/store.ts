import {createStore,combineReducers,applyMiddleware} from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import attendanceReducer from "./reducers/attendenceReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    attendance: attendanceReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;