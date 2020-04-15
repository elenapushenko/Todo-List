import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer =  combineReducers({
    todoList: reducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>




const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

